import React from 'react';
import { GetStaticProps } from 'next/types';
import { useRouter } from 'next/router';
import Link from 'next/link';

import { useWeb3Context } from '@src/context';
import { withLayout } from '@src/components/main';
import { getAllCourses } from '@src/content/courses/fetcher';
import { ICourses } from '@src/types';
import { MarketHeader } from '@src/components/higher';
import { Button, Message } from '@src/components/common';

interface Props extends Record<string, unknown> {
  courses: ICourses[];
}

const OwnedCourses: React.FC<Props> = ({ courses }): React.JSX.Element => {
  const router = useRouter();
  const {
    //  requireInstall,
    account,
  } = useWeb3Context();

  // const { ownedCourses } = useOwnedCourses(courses, account.address);

  return (
    <>
      <MarketHeader />

      <section className="grid grid-cols-1">
        owned page
        {/*  {ownedCourses.isEmpty && (
        //   <div className="w-1/2">
        //     <Message type="warning">
        //       <div>You don&apos;t own any courses</div>
        //       <Link href="/marketplace">
        //         <a className="font-normal hover:underline">
        //           <i>Purchase Course</i>
        //         </a>
        //       </Link>
        //     </Message>
        //   </div>
        // )}
        // {account.isEmpty && (
        //   <div className="w-1/2">
        //     <Message type="warning">
        //       <div>Please connect to Metamask</div>
        //     </Message>
        //   </div>
        // )}
        // {requireInstall && (
        //   <div className="w-1/2">
        //     <Message type="warning">
        //       <div>Please install Metamask</div>
        //     </Message>
        //   </div>
        // )}
        // {ownedCourses.data?.map(course => (
        //   <OwnedCourseCard key={course.id} course={course}>
        //     <Button onClick={() => router.push(`/courses/${course.slug}`)}>Watch the course</Button>
        //   </OwnedCourseCard>
        ))}
        */}
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
