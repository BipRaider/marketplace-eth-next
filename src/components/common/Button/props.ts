import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';

export interface ButtonProps
  extends Omit<
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 'ref'
  > {
  children: ReactNode;
  size?: 'md' | 'sm' | 'lg';
  variant?: 'purple' | 'white' | 'green' | 'red' | 'lightPurple';
  hoverable?: boolean;
}
