import Image from 'next/image';
import React from 'react';
import cn from 'classnames';

import { CurrentEthPriceProps } from './props';

const text = {
  eth: 'ETH',
  current_eth_price: 'Current eth Price',
};

export const CurrentEthPrice: React.FC<CurrentEthPriceProps> = ({ price, className }) => {
  return (
    <div className={cn('flex flex-1 items-stretch text-center', className)}>
      <div className="p-10 border drop-shadow rounded-md">
        <div className="flex flex-row items-center">
          <Image className="object-cover" src={'/small-eth.webp'} alt={'ether icon'} width={35} height={35} priority />
          <span className="text-2xl font-bold">
            {text.eth} = {price}$
          </span>
        </div>
        <p className="text-xl text-gray-500">{text.current_eth_price}</p>
      </div>
    </div>
  );
};
