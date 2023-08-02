import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { LectureProps } from './props';
import { Loader } from '@src/components/common';

export const Lecture: React.FC<LectureProps> = ({
  className,
  locked,
  lecture,
  isLoading,
  courseState,
}): React.JSX.Element => {
  return (
    <tr className={cn(className)}>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="flex items-center">
          <div className="ml-4">
            <div className="text-sm font-medium text-gray-900">{lecture}</div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span
          className={cn('px-2 inline-flex text-xs leading-5 font-semibold rounded-full ', {
            ['text-green-800 bg-green-100']: !locked,
            ['text-red-800 bg-red-100']: locked,
          })}
        >
          {locked ? 'Locked' : 'Unlocked'}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
        {isLoading ? (
          <Loader />
        ) : locked ? (
          <>
            {courseState === 'deactivated' && (
              <Link href="/marketplace" className="text-indigo-600 hover:text-indigo-900">
                Get Access
              </Link>
            )}
            {courseState === 'purchased' && (
              <Link href="/faq" className="text-yellow-500 hover:text-yellow-900">
                Waiting for activation...
              </Link>
            )}
          </>
        ) : (
          <Link href="/watch" className="text-indigo-600 hover:text-indigo-900">
            Watch
          </Link>
        )}
      </td>
    </tr>
  );
};
