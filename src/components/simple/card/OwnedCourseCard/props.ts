import { ICourses } from '@src/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface OwnedCourseCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  course: {
    state: 'purchased' | 'activated' | 'deactivated';
    price: string | number;
    ownedCourseId: string;
    proof: string;
  } & ICourses;
}
