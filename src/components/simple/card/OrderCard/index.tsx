import React from 'react';
import cn from 'classnames';

import { OrderCardProps } from './props';

export const OrderCard: React.FC<OrderCardProps> = ({ className, children }): React.JSX.Element => {
  return <div className={cn('flex flex-1 items-stretch text-center', className)}>{children}</div>;
};
