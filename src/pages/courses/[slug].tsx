import React from 'react';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next/types';

import { getAllCourses } from '@content/courses/fetcher';
import { IAppContext, ICoursesContext, IEthContext, IWeb3Context, useWeb3Context } from '@src/context';
import { withLayout } from '@components/main';
import { KeyPoint, Lectures, HeroCourse } from '@components/higher';
import { Loader, Message, Modal } from '@src/components/common';
import { ICourses } from '@src/types';
import { useOwnedCourse } from '@src/hooks';

interface Props extends Record<string, unknown> {
  course: ICourses;
  ethPriceUSD: number;
}

const Course = ({ course }: Props): React.JSX.Element => {
  try {
    const {
      web3: { web3 },
      contract: { contract },
      account,
    } = useWeb3Context();

    const ownedCourse = useOwnedCourse(web3, contract)(course, account.address);
    const courseState = ownedCourse.data?.state;

    if (!course) return <Loader />;

    return (
      <>
        <div className="py-4">
          <HeroCourse title={course.title} description={course.description} image={course.coverImage} />
        </div>
        <KeyPoint points={course.wsl} />

        {courseState && (
          <div className="max-w-5xl mx-auto">
            {courseState === 'purchased' && (
              <Message type="warning">
                Course is purchased and waiting for the activation. Process can take up to 24 hours.
                <i className="block font-normal">In case of any questions, please contact info@eincode.com</i>
              </Message>
            )}
            {courseState === 'activated' && (
              <Message type="success">Eincode wishes you happy watching of the course.</Message>
            )}
            {courseState === 'deactivated' && (
              <Message type="danger">
                Course has been deactivated, due the incorrect purchase data. The functionality to watch the course has
                been temporaly disabled.
                <i className="block font-normal">Please contact info@eincode.com</i>
              </Message>
            )}
          </div>
        )}

        <Lectures course={course} courseState={courseState} isLoading={ownedCourse.isLoading} />

        <Modal isOpen={false} />
      </>
    );
  } catch (error) {
    return <></>;
  }

  // const courseState = "deactivated"
};
export default withLayout<Props & ICoursesContext & IAppContext & IWeb3Context & IEthContext>(Course);

export const getStaticPaths: GetStaticPaths = () => {
  const { data } = getAllCourses();

  const pages = {
    paths: data.map(c => ({
      params: {
        slug: c.slug,
      },
    })),
    fallback: true,
  };

  return pages;
};

export const getStaticProps: GetStaticProps<Props> = ({ params }: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) return { notFound: true };

  const { data } = getAllCourses();

  const course = data.filter(c => c.slug === params.slug)[0];

  if (!course) {
    return {
      redirect: {
        destination: '/courses',
        permanent: false,
      },
    };
  }
  return {
    props: {
      course: course || null,
      ethPriceUSD: 0,
    },
  };
};
