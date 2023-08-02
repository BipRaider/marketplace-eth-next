import React from 'react';
import { GetStaticProps } from 'next/types';

import { CoursesPage, MarketHeader, OrderModal } from '@src/components/higher';
import { withLayout } from '@src/components/main';
import { getAllCourses } from '@src/content/courses/fetcher';
import { ICourses } from '@src/types';
import { useCoursesContext, useWeb3Context } from '@src/context';
import { bytes16 } from '@src/utils';

interface Props extends Record<string, unknown> {
  courses: ICourses[];
}

const Marketplace = ({ courses }: Props): React.JSX.Element => {
  const {
    web3: { web3 },
    contract: { contract },
    account,
    isLoading,
  } = useWeb3Context();

  const { selectedCourse, isNewPurchase, busyCourseId, setBusyCourseId, setSelectedCourse, setIsNewPurchase } =
    useCoursesContext();

  // const { hasConnectedWallet, isConnecting } = useWalletInfo();
  // const { ownedCourses } = useOwnedCourses(courses, account.data);

  const purchaseCourse = async (order: { price: number | string; email: string }, course: ICourses) => {
    if (!web3) return console.error('Web3 is not connected.');
    if (!course.id) return console.error('Course id undefined!');
    if (!account.address) return console.error('Account address undefined!');
    if (!order.price) return console.error('Order price undefined!');
    if (!order.email) return console.error('Order email undefined!');

    const hexCourseId: string = web3.utils.utf8ToHex(course.id);
    const priceEther: string = web3.utils.toWei(Number(order.price), 'ether');
    const emailHash = web3.utils.sha3(order.email);

    setBusyCourseId(course.id);

    const orderHash: string | undefined = web3.utils.soliditySha3(
      { type: 'bytes16', value: hexCourseId },
      { type: 'address', value: account.address },
    );

    // if (isNewPurchase) {
    if (!emailHash) return;
    if (!orderHash) return;

    const proof = web3.utils.soliditySha3(
      { type: 'bytes32', value: emailHash.substring(2, emailHash.length) },
      { type: 'bytes32', value: orderHash.substring(2, orderHash.length) },
    );

    _purchaseCourse({ hexCourseId, proof, priceEther }, course);
    // }
    //  else {
    //   _repurchaseCourse({ courseHash: orderHash, priceEther }, course);
    // }
  };

  const _purchaseCourse = async (
    { hexCourseId, proof, priceEther }: { hexCourseId: string; proof: string | undefined; priceEther: string },
    course: ICourses,
  ) => {
    try {
      if (!contract) return;
      if (!proof) return;
      if (!account.address) return;

      const result = await contract.methods
        .purchaseCourse(bytes16(hexCourseId), proof)
        .send({ from: account.address, value: priceEther });

      // ownedCourses.mutate([
      //   ...ownedCourses.data,
      //   {
      //     ...course,
      //     proof,
      //     state: 'purchased',
      //     owner: account.data,
      //     price: value,
      //   },
      // ]);
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
      if (!contract) return;
      if (!courseHash) return;
      if (!account.address) return;

      const result = await contract.methods
        .repurchaseCourse(courseHash)
        .send({ from: account.address, value: priceEther });

      // const index = ownedCourses.data.findIndex(c => c.id === course.id);

      // if (index >= 0) {
      //   ownedCourses.data[index].state = 'purchased';
      //   ownedCourses.mutate(ownedCourses.data);
      // } else {
      //   ownedCourses.mutate();
      // }
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
      {/* <CourseList courses={courses}>
        {course => {
          const owned = ownedCourses.lookup[course.id];
          return (
            <CourseCard
              key={course.id}
              course={course}
              state={owned?.state}
              disabled={!hasConnectedWallet}
              Footer={() => {
                if (isLoading) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      Install
                    </Button>
                  );
                }

                if (isConnecting) {
                  return (
                    <Button size="sm" disabled={true} variant="lightPurple">
                      <Loader size="sm" />
                    </Button>
                  );
                }

                if (!ownedCourses.hasInitialResponse) {
                  return (
                    // <div style={{height: "42px"}}></div>
                    <Button variant="white" disabled={true} size="sm">
                      {hasConnectedWallet ? 'Loading State...' : 'Connect'}
                    </Button>
                  );
                }

                const isBusy = busyCourseId === course.id;
                if (owned) {
                  return (
                    <>
                      <div className="flex">
                        <Button
                          onClick={() => alert('You are owner of this course.')}
                          disabled={false}
                          size="sm"
                          variant="white"
                        >
                          Yours &#10004;
                        </Button>
                        {owned.state === 'deactivated' && (
                          <div className="ml-1">
                            <Button
                              size="sm"
                              disabled={isBusy}
                              onClick={() => {
                                setIsNewPurchase(false);
                                setSelectedCourse(course);
                              }}
                              variant="purple"
                            >
                              {isBusy ? (
                                <div className="flex">
                                  <Loader size="sm" />
                                  <div className="ml-2">In Progress</div>
                                </div>
                              ) : (
                                <div>Fund to Activate</div>
                              )}
                            </Button>
                          </div>
                        )}
                      </div>
                    </>
                  );
                }

                return (
                  <Button
                    onClick={() => setSelectedCourse(course)}
                    size="sm"
                    disabled={!hasConnectedWallet || isBusy}
                    variant="lightPurple"
                  >
                    {isBusy ? (
                      <div className="flex">
                        <Loader size="sm" />
                        <div className="ml-2">In Progress</div>
                      </div>
                    ) : (
                      <div>Purchase</div>
                    )}
                  </Button>
                );
              }}
            />
          );
        }}
      </CourseList> */}
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
function withToast(arg0: any) {
  throw new Error('Function not implemented.');
}
