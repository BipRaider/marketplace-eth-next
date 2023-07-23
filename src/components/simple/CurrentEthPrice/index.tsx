import React from 'react';
import cn from 'classnames';

import { CurrentEthPriceProps } from './props';

const text = {
  eth: 'ETH',
  current_eth_price: 'Current eth Price',
};

export const CurrentEthPrice: React.FC<CurrentEthPriceProps> = ({ data, className }) => {
  return (
    <div className={cn('flex flex-1 items-stretch text-center', className)}>
      <div className="p-10 border drop-shadow rounded-md">
        <div>
          <span className="text-2xl font-bold">
            {text.eth} = {data}$
          </span>
        </div>
        <p className="text-xl text-gray-500">{text.current_eth_price}</p>
      </div>
    </div>
  );
};
