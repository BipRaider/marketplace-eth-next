import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { BreadCrumbsProps } from './props';

const LINKS = [
  {
    href: '/marketplace',
    value: 'Buy',
  },
  {
    href: '/marketplace/courses/owned',
    value: 'My Courses',
  },
  {
    href: '/marketplace/courses/managed',
    value: 'Manage Courses',
    requireAdmin: true,
  },
];

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ className, ...props }): React.JSX.Element => {
  return (
    <nav aria-label="breadcrumb" className={cn('pb-4 border-b border-slate-400', className)} {...props}>
      <ol className="flex justify-end leading-none text-indigo-600 divide-x divide-indigo-400">
        <li className="pr-4 font-medium text-gray-500 hover:text-gray-900">
          <Link href={LINKS[0].href}>{LINKS[0].value}</Link>
        </li>
        <li className="px-4 font-medium text-gray-500 hover:text-gray-900">
          <Link href={LINKS[1].href}>{LINKS[1].value}</Link>
        </li>
        <li className="px-4 font-medium text-gray-500 hover:text-gray-900">
          <Link href={LINKS[2].href}>{LINKS[2].value}</Link>
        </li>
      </ol>
    </nav>
  );
};
