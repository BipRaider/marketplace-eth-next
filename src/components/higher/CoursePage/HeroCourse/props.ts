import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICourses } from '@src/types';

export interface HeroCourseProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  title: ICourses['title'];
  description: ICourses['description'];
  image: ICourses['coverImage'];
}
