import React from 'react';

import cn from 'classnames';

import { ManagedCardProps, ItemProps } from './props';

const Item: React.FC<ItemProps> = ({ title, value, className }): React.JSX.Element => {
  return (
    <div className={`${className} px-4 py-2 sm:px-6 sm:grid sm:grid-cols-12`}>
      <div className="text-sm font-medium text-gray-500 sm:col-span-2">{title}:</div>
      <div className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-10">{value}</div>
    </div>
  );
};

export const ManagedCard: React.FC<ManagedCardProps> = ({
  children,
  course,
  isSearched = false,
}): React.JSX.Element => {
  return (
    <div
      className={cn('bg-white border shadow overflow-hidden sm:rounded-lg mb-3', {
        ['border-indigo-600']: isSearched,
        ['bg-gray-200']: !isSearched,
      })}
    >
      {Object.keys(course).map((key: string, i): React.JSX.Element => {
        return (
          <Item
            key={key}
            className={`${i % 2 ? 'bg-gray-50' : 'bg-white'}`}
            title={key[0].toUpperCase() + key.slice(1)}
            value={course[key]}
          />
        );
      })}
      <div className="bg-white px-4 py-5 sm:px-6">{children}</div>
    </div>
  );
};
