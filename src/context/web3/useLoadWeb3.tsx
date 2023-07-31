import { useEffect, useState, useCallback } from 'react';
import Web3 from 'web3';
import { ILoadProvider } from './useLoadProvider';

export interface ILoadWeb3 {
  /*** The `Web3` provider. */
  web3: Web3 | null;
  /*** Error initialize `Web3`.*/
  error: string | null;
  /*** State of loading to the `Web3`.*/
  isLoading: boolean;
  /*** Reload the `Web3` provider.*/
  loadWeb3: () => void;
}

export const baseWeb3Context: Readonly<ILoadWeb3> = {
  web3: null,
  error: null,
  isLoading: true,
  loadWeb3: function (): void {
    console.error('loadWeb3: Function not implemented.');
  },
};

/*** Get web3 provider from window.*/
export const useLoadWeb3 = ({ provider }: ILoadProvider): ILoadWeb3 => {
  const [web3, setWeb3] = useState<Web3 | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadWeb3 = useCallback((): void => {
    setIsLoading(true);
    if (provider) {
      try {
        const initWeb3 = new Web3(provider as any);
        setWeb3(initWeb3);
        setError(null);
        setIsLoading(false);
      } catch (e) {
        if (e instanceof Error) setError(e.message);
        setError('Something went wrong');
        setWeb3(null);
        setIsLoading(true);
      }
    } else {
      setError('Web3 is not init.');
      setWeb3(null);
      setIsLoading(true);
    }
  }, [provider]);

  useEffect((): void => {
    if (provider && !web3) loadWeb3();
  }, [loadWeb3, provider, web3]);

  return { web3, loadWeb3, error, isLoading };
};
