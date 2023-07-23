import { ICourses } from '@src/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CoursesPageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  courses: ICourses[];
}
