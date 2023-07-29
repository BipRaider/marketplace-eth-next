// import { useAccount, useOwnedCourse } from '@components/hooks/web3';
// import { useWeb3 } from '@components/providers';
import { ParsedUrlQuery } from 'querystring';
import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next/types';

import { getAllCourses } from '@content/courses/fetcher';
import { IAppContext, ICoursesContext, IEthContext, IWeb3Context } from '@src/context';
import { withLayout } from '@components/main';
import { KeyPoint, Lectures, HeroCourse } from '@components/higher';
import { Modal } from '@src/components/common';
import { ICourses } from '@src/types';

interface Props extends Record<string, unknown> {
  course: ICourses;
  ethPriceUSD: number;
}

function Course({ course }: Props) {
  try {
    // const { isLoading } = useWeb3();

    // const { account } = useAccount();
    // const { ownedCourse } = useOwnedCourse(course, account.data);
    // const courseState = ownedCourse.data?.state;

    // const isLocked = !courseState || courseState === 'purchased' || courseState === 'deactivated';

    return (
      <>
        <div className="py-4">
          <HeroCourse
            // hasOwner={!!ownedCourse.data}
            title={course.title}
            description={course.description}
            image={course.coverImage}
          />
        </div>
        <KeyPoint points={course.wsl} />
        <Lectures />
        {/* {courseState && (
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
        )} */}
        {/* <Curriculum isLoading={isLoading} locked={isLocked} courseState={courseState} /> */}
        <Modal isOpen={false} />
      </>
    );
  } catch (error) {
    return <></>;
  }

  // const courseState = "deactivated"
}
export default withLayout<Props & ICoursesContext & IAppContext & IWeb3Context & IEthContext>(Course, { eth: false });

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
