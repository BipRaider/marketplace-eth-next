import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { BreadCrumbsProps } from './props';

export const BreadCrumbs: React.FC<BreadCrumbsProps> = ({ className, ...props }): React.JSX.Element => {
  return (
    <nav aria-label="breadcrumb" className={cn('mb-4', className)} {...props}>
      <ol className="flex leading-none text-indigo-600 divide-x divide-indigo-400">
        <li className="pr-4">
          <Link href="#">Buy</Link>
        </li>
        <li className="px-4">
          <Link href="#">My Orders</Link>
        </li>
        <li className="px-4">
          <Link href="#">All Orders</Link>
        </li>
      </ol>
    </nav>
  );
};
