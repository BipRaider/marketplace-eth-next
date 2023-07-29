import { GetStaticProps } from 'next/types';

import { getAllCourses } from '@content/courses/fetcher';

import { withLayout } from '@components/main';
import { BreadCrumbs, CoursesPage } from '@components/higher';
import { ICourses } from '@src/types';

interface Props extends Record<string, unknown> {
  courses: ICourses[];
}

function Courses({ courses }: Props) {
  return (
    <>
      <BreadCrumbs />
      <CoursesPage courses={courses} />
    </>
  );
}

export default withLayout(Courses, { eth: false });

export const getStaticProps: GetStaticProps<Props> = () => {
  const { data } = getAllCourses();
  return {
    props: {
      courses: data,
    },
  };
};
