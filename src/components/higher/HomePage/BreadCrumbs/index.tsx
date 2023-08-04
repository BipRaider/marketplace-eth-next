import React from 'react';
import cn from 'classnames';

import { BreadCrumbsProps } from './props';

import { ActiveLink } from '@components/common';
import { useWeb3Context } from '@src/context';

const LINKS = [
  {
    href: '/marketplace',
    value: 'Buy',
    requireAdmin: false,
  },
  {
    href: '/marketplace/courses/owned',
    value: 'My Courses',
    requireAdmin: false,
  },
  {
    href: '/marketplace/courses/managed',
    value: 'Manage Courses',
    requireAdmin: true,
  },
];

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ className, ...props }): React.JSX.Element => {
  const {
    account: { isAdmin },
  } = useWeb3Context();

  return (
    <nav aria-label="breadcrumb" className={cn('pb-4 border-b border-slate-400', className)} {...props}>
      <ol className="flex justify-end leading-none text-indigo-600 divide-x divide-indigo-400">
        {LINKS.map(link => {
          if (!isAdmin && link.requireAdmin) return;
          return (
            <li key={link.href} className="px-4 font-medium text-gray-500 hover:text-gray-900">
              <ActiveLink href={link.href} className="font-medium text-gray-500 hover:text-gray-900">
                {link.value}
              </ActiveLink>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
