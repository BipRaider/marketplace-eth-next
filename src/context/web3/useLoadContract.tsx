import { useEffect, useState, useCallback } from 'react';
import { ILoadProvider } from './useLoadProvider';

export interface ILoadContract {
  /*** The contract */
  contract: null;
  /*** Error contract.*/
  error: string | null;
  /*** State of loading to the contract.*/
  isLoading: boolean;
  /*** Reload the contract.*/
  loadContract: () => void;
}

export const baseContractContext: Readonly<ILoadContract> = {
  contract: null,
  error: null,
  isLoading: true,
  loadContract: function (): void {
    throw new Error('Function not implemented.');
  },
};

/*** Get contract.*/
export const useLoadContract = (_: ILoadProvider): ILoadContract => {
  const [contract, setContract] = useState<null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadContract = useCallback((): void => {
    setContract(null);
    setError('Contract not found.');
    setIsLoading(true);
  }, []);

  useEffect((): void => {
    if (!contract && !isLoading) loadContract();
  }, [loadContract, contract, isLoading]);

  return { contract, loadContract, error, isLoading };
};
