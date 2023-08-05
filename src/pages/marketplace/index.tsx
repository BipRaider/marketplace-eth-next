import React from 'react';
import { GetStaticProps } from 'next/types';

import { getAllCourses } from '@src/content/courses/fetcher';
import { useCoursesContext, useWeb3Context } from '@src/context';
import { ICourses } from '@src/types';
import { bytes16 } from '@src/utils';
import { useOwnedCourses } from '@src/hooks';
import { CoursesPage, MarketHeader, OrderModal } from '@src/components/higher';
import { withLayout } from '@src/components/main';
import { withToast, Toast } from '@src/components/common';

interface Props extends Record<string, unknown> {
  courses: ICourses[];
}

const Marketplace = ({ courses }: Props): React.JSX.Element => {
  const {
    web3: { web3 },
    contract: { contract },
    account,
  } = useWeb3Context();

  const { selectedCourse, isNewPurchase, setBusyCourseId, setSelectedCourse, setIsNewPurchase } = useCoursesContext();

  const ownedCourses = useOwnedCourses(web3, contract)(courses, account.address);

  const purchaseCourse = async (order: { price: number | string; email: string }, course: ICourses) => {
    if (!web3) return Toast.error('Web3 is not connected.');
    if (!course.id) return Toast.error('Course id undefined!');
    if (!account.address) return Toast.error('Account address undefined!');
    if (!order.price) return Toast.error('Order price undefined!');
    if (!order.email) return Toast.error('Order email undefined!');

    const hexCourseId: string = web3.utils.utf8ToHex(course.id);
    const priceEther: string = web3.utils.toWei(Number(order.price), 'ether');
    const emailHash = web3.utils.sha3(order.email);

    setBusyCourseId(course.id);

    const orderHash: string | undefined = web3.utils.soliditySha3(
      { type: 'bytes16', value: hexCourseId },
      { type: 'address', value: account.address },
    );

    if (isNewPurchase) {
      if (!emailHash) return;
      if (!orderHash) return;

      const proof = web3.utils.soliditySha3(
        { type: 'bytes32', value: emailHash.substring(2, emailHash.length) },
        { type: 'bytes32', value: orderHash.substring(2, orderHash.length) },
      );

      withToast(_purchaseCourse({ hexCourseId, proof, priceEther }, course));
    } else {
      withToast(_repurchaseCourse({ courseHash: orderHash, priceEther }, course));
    }
  };

  const _purchaseCourse = async (
    { hexCourseId, proof, priceEther }: { hexCourseId: string; proof: string | undefined; priceEther: string },
    course: ICourses,
  ) => {
    try {
      if (!contract) throw new Error('Contract not found.');
      if (!proof) throw new Error('Proof is wrong.');
      if (!account.address) throw new Error('Address not found.');
      if (!ownedCourses.data) throw new Error('The data about the course not found.');

      const result = await contract.methods
        .purchaseCourse(bytes16(hexCourseId), proof)
        .send({ from: account.address, value: priceEther });

      ownedCourses.mutate([
        ...ownedCourses.data,
        {
          ...course,
          proof,
          state: 'purchased',
          owner: account.address,
          price: priceEther,
        },
      ]);
      return result;
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const _repurchaseCourse = async (
    { courseHash, priceEther }: { priceEther: string; courseHash: string | undefined },
    course: ICourses,
  ) => {
    try {
      if (!contract) throw new Error('Contract not found.');
      if (!courseHash) throw new Error('Corse hash not found.');
      if (!account.address) throw new Error('Address not found.');

      const result = await contract.methods
        .repurchaseCourse(courseHash)
        .send({ from: account.address, value: priceEther });

      const index = ownedCourses.data?.findIndex(c => c.id === course.id);

      if (index && index >= 0 && ownedCourses.data) {
        ownedCourses.data[index].state = 'purchased';
        ownedCourses.mutate(ownedCourses.data);
      } else {
        ownedCourses.mutate();
      }
      return result;
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    } finally {
      setBusyCourseId(null);
    }
  };

  const cleanupModal = () => {
    setSelectedCourse(null);
    setIsNewPurchase(true);
  };

  return (
    <>
      <MarketHeader />

      <CoursesPage courses={courses} purchase={true} />

      {selectedCourse && (
        <OrderModal
          course={selectedCourse}
          isNewPurchase={isNewPurchase}
          onSubmit={(formData, course) => {
            purchaseCourse(formData, course);
            cleanupModal();
          }}
          onClose={cleanupModal}
        />
      )}
    </>
  );
};

export default withLayout(Marketplace);

export const getStaticProps: GetStaticProps<Props> = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};
