import React, { createContext, useContext, useEffect, useState, useMemo, PropsWithChildren } from 'react';

import { ILoadProvider, baseProviderContext, useLoadProvider } from './useLoadProvider';
import { useLoadWeb3, ILoadWeb3, baseWeb3Context } from './useLoadWeb3';
import { ILoadContract, baseContractContext, useLoadContract } from './useLoadContract';
import { IAccount, baseAccountContext, useAccount } from './useAccount';
import { useBallance, baseBalanceContext, IBalance } from './useBalance';
import { INetwork, baseNetworkContext, useNetwork } from './hooks';

export interface IWeb3Context {
  /*** State of loading to the provider and the web3 */
  isLoading: boolean;
  account: IAccount;
  contract: ILoadContract;
  provider: ILoadProvider;
  web3: ILoadWeb3;
  balance: IBalance;
  /*** About support network*/
  network: INetwork;
}

export const Web3Context = createContext<IWeb3Context>({
  isLoading: true,
  web3: baseWeb3Context,
  provider: baseProviderContext,
  contract: baseContractContext,
  account: baseAccountContext,
  balance: baseBalanceContext,
  network: baseNetworkContext,
});

export const Web3ContextProvider = ({ children }: PropsWithChildren<IWeb3Context>): React.JSX.Element => {
  const provider = useLoadProvider();
  const web3 = useLoadWeb3(provider);
  const contract = useLoadContract(provider);
  const account = useAccount(web3, provider);
  const balance = useBallance(web3, account.address);
  const network = useNetwork(web3);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect((): void => {
    if (!provider.isLoading && !web3.isLoading) setIsLoading(false);
    else setIsLoading(true);
  }, [provider.isLoading, web3.isLoading]);

  const memoValue = useMemo((): IWeb3Context => {
    return { isLoading, web3, provider, contract, account, balance, network };
  }, [isLoading, provider, contract, web3, account, balance, network]);

  return <Web3Context.Provider value={memoValue}>{children}</Web3Context.Provider>;
};

export const useWeb3Context = (): IWeb3Context => useContext(Web3Context);
export const Web3Provider = ({
  children,
  useProvider = true,
  ...props
}: PropsWithChildren<IWeb3Context & { useProvider?: boolean }>): React.JSX.Element => {
  if (!useProvider) return <>{children}</>;
  return <Web3ContextProvider {...props}>{children}</Web3ContextProvider>;
};
