import React from 'react';
import { GetStaticProps } from 'next/types';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useWeb3Context } from '@src/context';
import { withLayout } from '@src/components/main';
import { getAllCourses } from '@src/content/courses/fetcher';
import { ICourses, IOwnerCurse } from '@src/types';
import { MarketHeader } from '@src/components/higher';
import { Button, Message } from '@src/components/common';
import { CourseFilter, OwnedCourseCard } from '@src/components/simple';
import { useOwnedCourses } from '@src/hooks';
import { isEmpty } from '@src/utils';

interface Props extends Record<string, unknown> {
  courses: ICourses[];
}

const OwnedCourses: React.FC<Props> = ({ courses }): React.JSX.Element => {
  const router = useRouter();
  const {
    web3: { web3 },
    contract: { contract },
    isLoading,
    account,
  } = useWeb3Context();

  const ownedCourses = useOwnedCourses(web3, contract)(courses, account.address);

  return (
    <>
      <div className="py-4">
        <MarketHeader />
        <CourseFilter
          onSearchSubmit={function (_searchText: string): void {
            console.error('Function not implemented _searchText.');
          }}
          onFilterSelect={function (_value: string): void {
            console.error('Function not implemented _value.');
          }}
        ></CourseFilter>
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

        {isEmpty(ownedCourses.data) && (
          <div className="w-1/2">
            <Message type="warning">
              <div>You don&apos;t own any courses</div>
              <Link href="/marketplace">
                <i>Purchase Course</i>
              </Link>
            </Message>
          </div>
        )}

        {courses.map(course => {
          let owner: Omit<Required<IOwnerCurse>, 'id'> = {
            state: 'deactivated',
            ownedCourseId: '',
            proof: '',
            owner: '',
            price: '',
          };
          if (ownedCourses.data) {
            for (const owned of ownedCourses.data) {
              if (course.id === owned.id) {
                if (owned.ownedCourseId) owner.ownedCourseId = owned.ownedCourseId;
                owner.price = owned.price;
                owner.proof = owned.proof;
                owner.owner = owned.owner;
                owner.state = owned.state;
              }
            }
          }
          return (
            <OwnedCourseCard key={course.id} course={{ ...course, ...owner }}>
              <Button onClick={() => router.push(`/courses/${course.slug}`)}>Watch the course</Button>
            </OwnedCourseCard>
          );
        })}
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

export default withLayout(OwnedCourses);
