import React from 'react';

import cn from 'classnames';

import { OrderInfoProps } from './props';

export const OrderInfo: React.FC<OrderInfoProps> = ({ className, children, ...props }): React.JSX.Element => {
  return (
    <section className={cn('bg-white shadow overflow-hidden sm:rounded-lg mb-3', className)} {...props}>
      {children}
    </section>
  );
};
