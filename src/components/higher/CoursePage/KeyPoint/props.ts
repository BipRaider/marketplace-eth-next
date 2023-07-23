import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICourses } from '@src/types';

export interface KeyPointProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  points: ICourses['wsl'];
}
