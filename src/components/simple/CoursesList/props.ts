import { ICourses } from '@src/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CoursesListProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  courses: ICourses[];
  purchase?: boolean;
}
