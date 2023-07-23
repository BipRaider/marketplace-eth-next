import React from 'react';
import cn from 'classnames';

import { HeaderProps } from './props';
import { Navbar } from '@components/higher';

export const Header: React.FC<HeaderProps> = ({ className, children, ...props }): React.JSX.Element => {
  return (
    <header className={cn('max-w-7xl mx-auto px-4', className)} {...props}>
      <div className="container mx-auto px-6 mb-6">
        <Navbar />
        {children}
      </div>
    </header>
  );
};

export default Header;
