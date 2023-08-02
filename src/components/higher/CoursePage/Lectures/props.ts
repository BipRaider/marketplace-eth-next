import { ICourses } from '@src/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LecturesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  course: ICourses;
  courseState: 'purchased' | 'activated' | 'deactivated' | undefined;
  isLoading: boolean;
}
