import React from 'react';
import cn from 'classnames';

import { KeyPointItemProps } from './props';

export const KeyPointItem: React.FC<KeyPointItemProps> = ({ className, point, step, ...props }) => {
  return (
    <div className={cn('relative', className)} {...props}>
      <dt>
        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        </div>
        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">Keypoint {step + 1}</p>
      </dt>
      <dd className="mt-2 ml-16 text-base text-gray-500">{point}</dd>
    </div>
  );
};
