import { INormalizeOwnedCourse } from '@src/types';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface ManagedCardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  course: INormalizeOwnedCourse;
  isSearched: boolean;
}

export interface ItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  value: string | number | any;
  title: string;
}
