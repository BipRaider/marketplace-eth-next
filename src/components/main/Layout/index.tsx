import React from 'react';
import cn from 'classnames';

import { Main } from '@components/main';

import { LayoutProps } from './props';

export const Layout: React.FC<LayoutProps> = ({ className, children, ...props }: LayoutProps): React.JSX.Element => {
  return (
    <div className={cn('relative bg-white overflow-hidden', className)} {...props}>
      <div className="relative max-w-7xl mx-auto px-4">
        <Main>{children}</Main>
      </div>
    </div>
  );
};
