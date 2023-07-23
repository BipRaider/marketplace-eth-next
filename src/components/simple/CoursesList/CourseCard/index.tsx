import React from 'react';
import Img from 'next/image';
import Link from 'next/link';

import { CourseCardProps } from './props';

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  return (
    <div className="md:flex">
      <div className="md:flex-shrink-0">
        <Img
          className="h-full w-full object-cover"
          src={course.coverImage}
          alt={course.title}
          width={200}
          height={230}
          loading="lazy"
        />
      </div>
      <div className="p-8">
        <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{course.type}</div>
        <Link
          href={`/courses/${course.slug}`}
          className="block mt-1 text-lg leading-tight font-medium text-black hover:underline"
        >
          {course.title}
        </Link>
        <p className="mt-2 text-gray-500">{course.description}</p>
      </div>
    </div>
  );
};
