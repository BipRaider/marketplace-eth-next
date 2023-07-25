// https://docs.metamask.io/wallet/reference/provider-api/
import { useEffect, useState, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import { MetaMaskEthereumProvider } from './web3.interface';

export interface ILoadProvider {
  /*** It's the metamask provider from window.*/
  provider: MetaMaskEthereumProvider | null;
  /*** Error message. If provider nod found.*/
  error: string | null;
  /*** State of loading to the provider.*/
  isLoading: boolean;
  /*** Reload provider.*/
  loadProvider: () => Promise<void>;
}

export const baseProviderContext: Readonly<ILoadProvider> = {
  provider: null,
  error: null,
  isLoading: true,
  loadProvider: function (): Promise<void> {
    throw new Error('loadProvider: Function not implemented.');
  },
};

/*** Get ethereum provider from window.*/
export const useLoadProvider = (): ILoadProvider => {
  const [provider, setProvider] = useState<MetaMaskEthereumProvider | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadProvider = useCallback(async (): Promise<void> => {
    try {
      setIsLoading(true);
      const prov = await detectEthereumProvider();
      if (prov) {
        setProvider(prov);
        setIsLoading(false);
        setError(null);
      } else {
        setError('Please, install the Metamask.');
        setIsLoading(true);
        setProvider(null);
      }
    } catch {
      setError('Something went wrong.');
      setIsLoading(true);
      setProvider(null);
    }
  }, []);

  useEffect((): void => {
    if (!provider) {
      loadProvider();
    }
  }, [loadProvider, provider]);

  return { provider, error, loadProvider, isLoading };
};
