import { ICourses } from '@src/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CourseCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  course: ICourses;
}
