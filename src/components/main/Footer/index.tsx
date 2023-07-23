import React from 'react';
import cn from 'classnames';
import { format } from 'date-fns';

import { FooterProps } from './props';

const text = {
  p: 'Eincode',
};

export const Footer: React.FC<FooterProps> = ({ className, ...props }): React.JSX.Element => {
  return (
    <footer className={cn(className, 'bg-gray-900 pt-1')} {...props}>
      <div className="container mx-auto px-6">
        <div className="mt-5 flex flex-col items-center">
          <div className="py-6">
            <p className="mb-6 text-white text-sm text-primary-2 font-bold">
              © {format(new Date(), 'yyyy')} {text.p}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
