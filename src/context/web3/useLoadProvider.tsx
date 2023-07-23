import { useEffect, useState, useCallback } from 'react';
import detectEthereumProvider from '@metamask/detect-provider';

import { MetaMaskEthereumProvider } from './web3.interface';

export interface ILoadProvider {
  /*** It's the metamask provider from window.*/
  provider: MetaMaskEthereumProvider | null;
  /*** Error message. If provider nod found.*/
  errorProvider: string | null;
  /*** State of loading to the provider.*/
  isLoading: boolean;
  /*** Reload provider.*/
  loadProvider: () => Promise<void>;
}

export const baseProviderContext: Readonly<ILoadProvider> = {
  provider: null,
  errorProvider: null,
  isLoading: true,
  loadProvider: function (): Promise<void> {
    throw new Error('loadProvider: Function not implemented.');
  },
};

/*** Get ethereum provider from window.*/
export const useLoadProvider = (): ILoadProvider => {
  const [provider, setProvider] = useState<MetaMaskEthereumProvider | null>(null);
  const [errorProvider, setErrorProvider] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadProvider = useCallback(async (): Promise<void> => {
    try {
      const prov = await detectEthereumProvider();

      if (prov) {
        setProvider(prov);
        setIsLoading(false);
        setErrorProvider(null);
      } else {
        setErrorProvider('Please, install the Metamask.');
        setIsLoading(true);
        setProvider(null);
      }
    } catch {
      setErrorProvider('Something went wrong.');
      setIsLoading(true);
      setProvider(null);
    }
  }, []);

  useEffect((): void => {
    if (!provider) loadProvider();
  }, [loadProvider, provider]);

  return { provider, errorProvider, loadProvider, isLoading };
};
