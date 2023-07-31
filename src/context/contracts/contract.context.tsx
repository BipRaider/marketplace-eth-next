import { createContext, useContext } from 'react';

import { baseContractContext } from './useLoadContract';
import { IContractsContext } from './contracts.interface';

export const ContractsContext = createContext<IContractsContext>({
  isLoading: true,
  contract: baseContractContext,
  contracts: new Map(),
});

export const useContractsContext = (): IContractsContext => useContext(ContractsContext);
