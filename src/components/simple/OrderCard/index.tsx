import React from 'react';
import cn from 'classnames';

import { OrderCardProps } from './props';

export const OrderCard: React.FC<OrderCardProps> = ({ className }) => {
  return <div className={cn('flex flex-1 items-stretch text-center', className)}></div>;
};
