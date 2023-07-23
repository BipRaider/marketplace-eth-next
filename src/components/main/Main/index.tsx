import React from 'react';
import cn from 'classnames';

import { MainProps } from './props';

export const Main: React.FC<MainProps> = ({ className, children, ...props }): React.JSX.Element => {
  return (
    <main className={cn(className, 'fit')} {...props}>
      <div className="container mx-auto">{children}</div>
    </main>
  );
};

export default Main;
