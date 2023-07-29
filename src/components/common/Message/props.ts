import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MessageProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
  type?: 'success' | 'warning' | 'danger';
}
