import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { ActiveLinkProps } from './link.props';

const ActiveLink: React.FC<ActiveLinkProps> = ({ children, className, href, activeLinkClass }): React.JSX.Element => {
  const { pathname } = useRouter();

  return (
    <Link
      className={cn(className, {
        ['text-indigo-600']: pathname === href && !activeLinkClass,
        ['active']: activeLinkClass,
      })}
      href={href}
    >
      {children}
    </Link>
  );
};

export default ActiveLink;
