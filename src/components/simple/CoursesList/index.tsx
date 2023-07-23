import React from 'react';
import cn from 'classnames';

import { CoursesListProps } from './props';

import { CourseCard } from './CourseCard';

export const CoursesList: React.FC<CoursesListProps> = ({ courses, className }) => {
  return (
    <ul className={cn('grid md:grid-cols-1 lg:grid-cols-2 gap-4 mb-5', className)}>
      {courses.length > 0 &&
        courses.map(course => (
          <li key={course.id} className="bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
            <CourseCard course={course} />
          </li>
        ))}
    </ul>
  );
};
