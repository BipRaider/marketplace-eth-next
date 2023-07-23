import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface LectureProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  locked: boolean;
  lecture: string;
}
