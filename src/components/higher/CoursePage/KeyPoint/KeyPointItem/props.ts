import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface KeyPointItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  point: string;
  step: number;
}
