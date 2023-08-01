import React, { useEffect, useState, useMemo, PropsWithChildren } from 'react';

import { ContractsContext } from './contract.context';
import { ContractNameList, IContractsContext, ContractBuilderMarketplace } from './contracts.interface';

import { useLoadContract } from './useLoadContract';
import { useLoadWeb3 } from '../web3/useLoadWeb3';
import { useLoadProvider } from '../web3/useLoadProvider';

export const ContractsContextProvider = ({ children }: PropsWithChildren<IContractsContext>): React.JSX.Element => {
  const provider = useLoadProvider();
  const web3 = useLoadWeb3(provider);
  const contract = useLoadContract(web3, provider);

  const [contracts, setContracts] = useState<Map<ContractNameList, ContractBuilderMarketplace>>(new Map());
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    setContracts(map => {
      if (contract.contract && contract.contractName) map.set(contract.contractName, contract.contract);
      return map;
    });
  }, [contract.contract]);

  useEffect((): void => {
    if (provider.isLoading || web3.isLoading || contract.isLoading) setIsLoading(true);
    if (!provider.isLoading && !web3.isLoading && !contract.isLoading) setIsLoading(false);
  }, [provider.isLoading, web3.isLoading, contract.isLoading]);

  const memoValue = useMemo((): IContractsContext => {
    return { isLoading, contract, contracts };
  }, [isLoading, contract, contracts]);

  return <ContractsContext.Provider value={memoValue}>{children}</ContractsContext.Provider>;
};

export const ContractsProvider = ({
  children,
  useProvider = true,
  ...props
}: PropsWithChildren<IContractsContext & { useProvider?: boolean }>): React.JSX.Element => {
  if (!useProvider) return <>{children}</>;
  return <ContractsContextProvider {...props}>{children}</ContractsContextProvider>;
};
