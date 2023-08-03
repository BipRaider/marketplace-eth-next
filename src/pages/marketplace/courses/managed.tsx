import React, { useState } from 'react';
import { GetStaticProps } from 'next/types';

import { useWeb3Context } from '@src/context';
import { MarketHeader } from '@src/components/higher';
import { withLayout } from '@src/components/main';
import { Button, Message } from '@src/components/common';
import { CourseFilter, ManagedCard } from '@src/components/simple';
import { getAllCourses } from '@src/content/courses/fetcher';
import { ICourses, INormalizeOwnedCourse, IOwnerCurse } from '@src/types';
import { useManagedCourses } from '@src/hooks';
import { normalizeOwnedCourse } from '@src/utils';

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

const ManagedCourses: React.FC<Props> = (): React.JSX.Element => {
  const [proofedOwnership, setProofedOwnership] = useState({});
  const [searchedCourse, setSearchedCourse] = useState<INormalizeOwnedCourse | null>(null);
  const [filters, setFilters] = useState({ state: 'all' });

  const {
    web3: { web3 },
    contract: { contract },
    isLoading,
    account,
  } = useWeb3Context();

  const managedCourses = useManagedCourses(web3, contract)(account);

  const verifyCourse = (email: string, { hash, proof }: { hash?: string; proof: string }) => {
    if (!email) return;
    if (!web3) return;
    if (!hash) return;

    const emailHash = web3.utils.sha3(email);
    const proofToCheck = web3.utils.soliditySha3(
      { type: 'bytes32', value: emailHash },
      { type: 'bytes32', value: hash },
    );

    proofToCheck === proof
      ? setProofedOwnership({ ...proofedOwnership, [hash]: true })
      : setProofedOwnership({ ...proofedOwnership, [hash]: false });
  };

  const changeCourseState = async (courseHash: string, method: 'activateCourse' | 'deactivateCourse') => {
    try {
      if (!contract) return;
      if (!account.address) return;

      const result = await contract.methods[method](courseHash).send({ from: account.address });
      return result;
    } catch (e) {
      if (e instanceof Error) throw new Error(e.message);
    }
  };

  const activateCourse = async (courseHash: string) => {
    changeCourseState(courseHash, 'activateCourse');
  };

  const deactivateCourse = async (courseHash: string) => {
    changeCourseState(courseHash, 'deactivateCourse');
  };

  const renderCard = (course: INormalizeOwnedCourse, isSearched: boolean) => {
    return (
      <ManagedCard key={course.ownedCourseId} isSearched={isSearched} course={course}>
        <VerificationInput
          onVerify={email => {
            verifyCourse(email, {
              hash: course.hash,
              proof: course.proof,
            });
          }}
        />

        {course.hash && proofedOwnership[course.hash] && (
          <div className="mt-2">
            <Message>Verified!</Message>
          </div>
        )}

        {course.hash && proofedOwnership[course.hash] === false && (
          <div className="mt-2">
            <Message type="danger">Wrong Proof!</Message>
          </div>
        )}

        {course.state === 'purchased' && (
          <div className="mt-2">
            <Button
              onClick={() => {
                if (course.hash) activateCourse(course.hash);
              }}
              variant="green"
            >
              Activate
            </Button>
            <Button
              onClick={() => {
                if (course.hash) deactivateCourse(course.hash);
              }}
              variant="red"
            >
              Deactivate
            </Button>
          </div>
        )}
      </ManagedCard>
    );
  };

  const filteredCourses = managedCourses.data
    ?.filter(course => {
      if (filters.state === 'all') return true;
      return course.state === filters.state;
    })
    .map(course => renderCard(course, !!searchedCourse));

  const searchCourse = async (hash: string) => {
    const re = /[0-9A-Fa-f]{6}/g;
    if (!contract) return;

    if (hash && hash.length === 66 && re.test(hash)) {
      const course: IOwnerCurse = await contract.methods.getCourseByHash(hash).call();

      if (course && course.owner !== '0x0000000000000000000000000000000000000000') {
        const normalized = normalizeOwnedCourse(web3)({ hash }, course);
        if (normalized) setSearchedCourse(normalized);
        return;
      }
    }

    setSearchedCourse(null);
  };
  return (
    <>
      <div className="py-4">
        <MarketHeader />

        {account.isAdmin && (
          <CourseFilter onFilterSelect={value => setFilters({ state: value })} onSearchSubmit={searchCourse} />
        )}
      </div>

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

        {searchedCourse && account.isAdmin && (
          <div>
            <h1 className="text-2xl font-bold p-5">Search</h1>
            {renderCard(searchedCourse, true)}
          </div>
        )}
        <h1 className="text-2xl font-bold p-5">All Courses</h1>
        {filteredCourses}
        {filteredCourses?.length === 0 && <Message type="warning">No courses to display</Message>}
        {!account.isAdmin && <Message type="warning">No courses to display</Message>}
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
