import React from 'react';
import cn from 'classnames';

import { pricePerItem } from '@hooks/index';

import { PricePerItemProps } from './props';

const text = {
  eth: 'ETH',
};

export const PricePerItem: React.FC<PricePerItemProps> = ({ price, priceItem, className, children }) => {
  const pricePerCourse = pricePerItem(price, priceItem);
  return (
    <div className={cn('flex flex-1 items-stretch text-center', className)}>
      <div className="p-10 border drop-shadow rounded-md">
        <div>
          <span className="text-2xl font-bold">
            {pricePerCourse} {text.eth}
          </span>
        </div>
        <div>
          <span className="text-2xl font-bold">{priceItem}$</span>
        </div>
        <p className="text-xl text-gray-500">{children}</p>
      </div>
    </div>
  );
};
