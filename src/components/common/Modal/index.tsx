import React from 'react';
import cn from 'classnames';

import { ModalProps } from './props';

export const Modal: React.FC<ModalProps> = ({ className, isOpen, children, ...props }): React.JSX.Element => {
  return (
    <section
      className={cn(
        'flex flex-1 justify-center items-center  bg-opacity-50 bg-gray-500 fixed z-10 inset-0 overflow-y-auto',
        className,
        {
          ['hidden']: !isOpen,
        },
      )}
      {...props}
    >
      {children}
    </section>
  );
};
