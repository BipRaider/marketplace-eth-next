import React from 'react';
import cn from 'classnames';

import { CoursesListProps } from './props';

import { CourseCard } from '../card/CourseCard';
import { useCoursesContext, useWeb3Context } from '@src/context';
import { ICourses, INormalizeOwnedCourse } from '@src/types';
import { useOwnedCourses } from '@src/hooks';

export const CoursesList: React.FC<CoursesListProps> = ({ courses, purchase, className }): React.JSX.Element => {
  const { setBusyCourseId, setSelectedCourse } = useCoursesContext();
  const {
    web3: { web3 },
    contract: { contract },
    account,
  } = useWeb3Context();

  const onClickHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, course: ICourses): void => {
    e.stopPropagation();
    setBusyCourseId(course.id);
    setSelectedCourse(course);
  };

  const ownedCourses = useOwnedCourses(web3, contract)(courses, account.address);

  return (
    <ul className={cn('grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5', className)}>
      {courses &&
        courses.map(course => {
          let courseOwner: INormalizeOwnedCourse | undefined = undefined;

          if (ownedCourses.data) {
            courseOwner = ownedCourses.data.find(owned => owned.id === course.id);
          }

          return (
            <li key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
              <CourseCard
                course={course}
                purchase={purchase}
                onClickHandler={onClickHandler}
                courseOwner={courseOwner}
              />
            </li>
          );
        })}
    </ul>
  );
};
