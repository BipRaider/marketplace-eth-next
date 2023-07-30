import { useEffect, useState, useCallback } from 'react';
import { ILoadProvider } from './useLoadProvider';
import { getContract, ContractBuilder } from '../../utils/loadContract';
import { ILoadWeb3 } from './useLoadWeb3';

export interface ILoadContract {
  /*** The contract */
  contract: ContractBuilder | null;
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
    console.error('loadContract: Function not implemented.');
  },
};

/*** Get contract.*/
export const useLoadContract = ({ web3, ...web3Params }: ILoadWeb3, _provider: ILoadProvider): ILoadContract => {
  const [contract, setContract] = useState<ContractBuilder | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadContract = useCallback(async (): Promise<void> => {
    if (!web3) return;

    const cont = await getContract('CourseMarketplace', web3);

    if (!cont) {
      setContract(null);
      setError('Contract not found.');
      setIsLoading(true);
    }

    if (cont instanceof Error) {
      setContract(null);
      setError(cont.message);
      setIsLoading(true);
    } else {
      setContract(cont);
      setError(null);
      setIsLoading(false);
    }
  }, [web3]);

  useEffect((): void => {
    if (!web3Params.isLoading) loadContract();
  }, [web3Params.isLoading]);

  useEffect((): void => {
    if (!contract && !isLoading) loadContract();
  }, [loadContract, contract, isLoading]);

  return { contract, loadContract, error, isLoading };
};
