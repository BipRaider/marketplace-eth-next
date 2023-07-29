import React from 'react';
import Image from 'next/image';
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
        <div className="flex flex-row items-center">
          <Image
            className="object-cover"
            src={'/small-eth.webp'}
            alt={'ether icon'}
            width={35}
            height={35}
            layout="fixed"
          />
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
