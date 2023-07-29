import React from 'react';
import cn from 'classnames';
import { LoaderProps } from './props';

const SIZES = {
  sm: 'w-6 h-6',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Loader: React.FC<LoaderProps> = ({ size = 'md' }): React.JSX.Element => {
  return (
    <div className={cn(`sk-fading-circle`, SIZES[size])}>
      {Array.from({ length: 12 }).map(
        (_, i): React.JSX.Element => (
          <div key={`dot-${i}`} className={`sk-circle${i + 1} sk-circle`} />
        ),
      )}
    </div>
  );
};
