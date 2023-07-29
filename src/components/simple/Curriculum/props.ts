import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CurriculumProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  locked: boolean;
  courseState: 'purchased' | 'activated' | 'deactivated';
  isLoading: boolean;
}
