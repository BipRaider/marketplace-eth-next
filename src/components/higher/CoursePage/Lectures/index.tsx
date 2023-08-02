import React from 'react';
import cn from 'classnames';

import { LecturesProps } from './props';
import { Lecture } from './Lecture';
import { Loader } from '@src/components/common';

// Curriculum
export const Lectures: React.FC<LecturesProps> = ({
  className,
  course,
  isLoading,
  courseState,
  ...props
}): React.JSX.Element => {
  const isLocked = !courseState || courseState === 'purchased' || courseState === 'deactivated';

  if (!courseState) return <Loader />;

  return (
    <section className={cn('max-w-5xl mx-auto', className)} {...props}>
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Section 1
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {course?.wsl.map(lec => (
                    <Lecture
                      key={lec}
                      lecture={lec}
                      isLoading={isLoading}
                      locked={isLocked}
                      courseState={courseState}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
