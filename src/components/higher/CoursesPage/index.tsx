import React, { useCallback, useEffect } from 'react';
import cn from 'classnames';

import { CoursesPageProps } from './props';
import { CoursesList } from '@src/components/simple';
import { useCoursesContext } from '@src/context';

export const CoursesPage: React.FC<CoursesPageProps> = ({
  className,
  courses,
  purchase,
  ...props
}): React.JSX.Element => {
  const { setCourses, courses: coursesList } = useCoursesContext();

  const cb = useCallback(() => {
    setCourses(() => courses);
  }, [courses, setCourses]);

  useEffect(() => {
    cb();
  }, [cb, courses]);

  return (
    <section className={cn('grid grid-cols-1 mb-5', className)} {...props}>
      <CoursesList courses={coursesList} purchase={purchase} />
    </section>
  );
};
