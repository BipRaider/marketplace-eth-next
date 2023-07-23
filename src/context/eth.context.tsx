import React, { createContext, PropsWithChildren, useState, useEffect, useContext } from 'react';
import { useEthPrice, IUseEthPrice } from '@hooks/index';

export interface IEthContext {
  ethPriceUSD: IUseEthPrice['eth']['price'];
}

export const EthContext = createContext<IEthContext>({
  ethPriceUSD: 0,
});
export const useEthContext = (): IEthContext => useContext(EthContext);

export const EthContextProvider = ({ children }: PropsWithChildren<IEthContext>): React.JSX.Element => {
  const {
    eth: { price },
  } = useEthPrice();
  const [ethPriceUSD, setEthPriceUSD] = useState<number>(0);

  useEffect(() => {
    if (price) setEthPriceUSD(() => price);
  }, [price]);

  return (
    <EthContext.Provider
      value={{
        ethPriceUSD,
      }}
    >
      {children}
    </EthContext.Provider>
  );
};

export const EthProvider = ({
  children,
  useProvider = true,
  ...props
}: PropsWithChildren<IEthContext & { useProvider?: boolean }>): React.JSX.Element => {
  if (!useProvider) return <>{children}</>;
  return <EthContextProvider {...props}>{children}</EthContextProvider>;
};
