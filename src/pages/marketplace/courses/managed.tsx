import React, { useState } from 'react';
import { GetStaticProps } from 'next/types';
import { useRouter } from 'next/router';

// import { normalizeOwnedCourse } from '@utils/normalize';
// import { withToast } from '@utils/toast';
import { useWeb3Context } from '@src/context';
import { MarketHeader } from '@src/components/higher';
import { withLayout } from '@src/components/main';
import { Button, Message } from '@src/components/common';
import { CourseFilter, OwnedCourseCard } from '@src/components/simple';
import { getAllCourses } from '@src/content/courses/fetcher';
import { ICourses } from '@src/types';

interface Props extends Record<string, unknown> {
  courses: ICourses[];
}

const VerificationInput = ({ onVerify }: { onVerify: (_data: string) => void }): React.JSX.Element => {
  const [email, setEmail] = useState<string>('');

  return (
    <div className="flex mr-2 relative rounded-md">
      <input
        value={email}
        onChange={({ target: { value } }): void => setEmail(value)}
        type="text"
        name="account"
        id="account"
        className="w-96 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
        placeholder="0x2341ab..."
      />
      <Button
        onClick={(): void => {
          onVerify(email);
        }}
      >
        Verify
      </Button>
    </div>
  );
};

const ManagedCourses: React.FC<Props> = ({ courses }): React.JSX.Element => {
  const router = useRouter();
  const [proofedOwnership, setProofedOwnership] = useState({});
  const [searchedCourse, setSearchedCourse] = useState(null);
  const [filters, setFilters] = useState({ state: 'all' });
  const {
    web3: { web3 },
    contract,
    isLoading,
    account,
  } = useWeb3Context();
  // const { account } = useAdmin({ redirectTo: '/marketplace' });
  // const { managedCourses } = useManagedCourses(account);

  // const verifyCourse = (email, { hash, proof }) => {
  //   if (!email) return;

  //   const emailHash = web3.utils.sha3(email);
  //   const proofToCheck = web3.utils.soliditySha3(
  //     { type: 'bytes32', value: emailHash },
  //     { type: 'bytes32', value: hash },
  //   );

  //   proofToCheck === proof
  //     ? setProofedOwnership({
  //         ...proofedOwnership,
  //         [hash]: true,
  //       })
  //     : setProofedOwnership({
  //         ...proofedOwnership,
  //         [hash]: false,
  //       });
  // };

  // const changeCourseState = async (courseHash, method) => {
  //   try {
  //     const result = await contract.methods[method](courseHash).send({from: account.data});
  //     return result;
  //   } catch (e) {
  //     throw new Error(e.message);
  //   }
  // };

  // const activateCourse = async courseHash => {
  //   withToast(changeCourseState(courseHash, 'activateCourse'));
  // };

  // const deactivateCourse = async courseHash => {
  //   withToast(changeCourseState(courseHash, 'deactivateCourse'));
  // };

  // const searchCourse = async hash => {
  //   const re = /[0-9A-Fa-f]{6}/g;

  //   if (hash && hash.length === 66 && re.test(hash)) {
  //     const course = await contract.methods.getCourseByHash(hash).call();

  //     if (course.owner !== '0x0000000000000000000000000000000000000000') {
  //       const normalized = normalizeOwnedCourse(web3)({ hash }, course);
  //       setSearchedCourse(normalized);
  //       return;
  //     }
  //   }

  //   setSearchedCourse(null);
  // };

  // const renderCard = (course, isSearched) => {
  //   return (
  //     <ManagedCourseCard key={course.ownedCourseId} isSearched={isSearched} course={course}>
  //       <VerificationInput
  //         onVerify={email => {
  //           verifyCourse(email, {
  //             hash: course.hash,
  //             proof: course.proof,
  //           });
  //         }}
  //       />
  //       {proofedOwnership[course.hash] && (
  //         <div className="mt-2">
  //           <Message>Verified!</Message>
  //         </div>
  //       )}
  //       {proofedOwnership[course.hash] === false && (
  //         <div className="mt-2">
  //           <Message type="danger">Wrong Proof!</Message>
  //         </div>
  //       )}
  //       {course.state === 'purchased' && (
  //         <div className="mt-2">
  //           <Button onClick={() => activateCourse(course.hash)} variant="green">
  //             Activate
  //           </Button>
  //           <Button onClick={() => deactivateCourse(course.hash)} variant="red">
  //             Deactivate
  //           </Button>
  //         </div>
  //       )}
  //     </ManagedCourseCard>
  //   );
  // };

  // if (!account.isAdmin)  return null;

  // const filteredCourses = managedCourses.data
  //   ?.filter(course => {
  //     if (filters.state === 'all') {
  //       return true;
  //     }

  //     return course.state === filters.state;
  //   })
  //   .map(course => renderCard(course));

  return (
    <>
      <div className="py-4">
        <MarketHeader />
        <CourseFilter
          onSearchSubmit={function (_searchText: string): void {
            console.error('Function not implemented _searchText.');
          }}
          onFilterSelect={value => setFilters({ state: value })}
        ></CourseFilter>
      </div>

      {/* <CourseFilter onFilterSelect={value => setFilters({ state: value })} onSearchSubmit={searchCourse} /> */}

      <section className="grid grid-cols-1">
        {account.isLoading && (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please connect to Metamask</div>
            </Message>
          </div>
        )}

        {isLoading && (
          <div className="w-1/2">
            <Message type="warning">
              <div>Please install Metamask</div>
            </Message>
          </div>
        )}

        {courses.map(course => {
          return (
            <OwnedCourseCard
              key={course.id}
              course={{
                state: 'purchased',
                price: '0.1',
                ownedCourseId: 'some_id',
                proof: 'some_id',
                ...course,
              }}
            >
              <Button onClick={() => router.push(`/courses/${course.slug}`)}>Verify</Button>
            </OwnedCourseCard>
          );
        })}
        {/* {searchedCourse && (
          <div>
            <h1 className="text-2xl font-bold p-5">Search</h1>
            {renderCard(searchedCourse, true)}
          </div>
        )}
        <h1 className="text-2xl font-bold p-5">All Courses</h1>
        {filteredCourses}
        {filteredCourses?.length === 0 && <Message type="warning">No courses to display</Message>} */}
      </section>
    </>
  );
};

export const getStaticProps: GetStaticProps<Props> = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};

export default withLayout(ManagedCourses);
