import React from 'react';

import { useEthContext } from '@src/context';
import { CurrentEthPrice, PricePerItem } from '@components/simple';

export const CurrentPrice = (): React.JSX.Element => {
  const { ethPriceUSD } = useEthContext();

  return (
    <section className="grid grid-cols-4 my-5">
      <CurrentEthPrice data={ethPriceUSD} />
      <PricePerItem price={ethPriceUSD} priceItem={15}>
        Price per course
      </PricePerItem>
    </section>
  );
};
