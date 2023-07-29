import React from 'react';

import { MarketHeaderProps } from './props';

import { BreadCrumbs, CurrentPrice, WalletBar } from '@src/components/higher';

export const MarketHeader: React.FC<MarketHeaderProps> = ({ children }): React.JSX.Element => {
  return (
    <>
      <WalletBar />
      <CurrentPrice />
      <BreadCrumbs />
      {children}
    </>
  );
};
