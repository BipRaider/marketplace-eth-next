import React from 'react';
import { ICourses, INormalizeOwnedCourse } from '@src/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CourseCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  course: ICourses;
  courseOwner?: INormalizeOwnedCourse;
  purchase?: boolean;
  onClickHandler: (_e: React.MouseEvent<HTMLButtonElement, MouseEvent>, _course: ICourses) => void;
}
