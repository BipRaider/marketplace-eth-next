import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider';

import { loadContract } from '@utils/loadContract';
import { setupHooks } from './hooks/setupHooks';
import { Web3ProviderProps, CD, IProvider, IWeb3Api, IWeb3Context } from './web3.interface';

export const MyWeb3Context = createContext<IWeb3Context>({
  isLoading: false,
  provider: null,
  web3: null,
  contract: null,
  connect: () => {},
  requireInstall: false,
});

const createWeb3State = ({ web3, provider, contract, isLoading }: IWeb3Api) => {
  return {
    web3,
    provider,
    contract,
    isLoading,
    hooks: setupHooks({ web3, provider, contract }),
  };
};

const setListeners = (provider: IProvider) => {
  provider.on('chainChanged', () => window.location.reload());
};

export const Web3Provider: React.FC<Web3ProviderProps> = ({ children }) => {
  const [web3Api, setWeb3Api] = useState(
    createWeb3State({
      web3: null,
      provider: null,
      contract: null,
      isLoading: true,
    }),
  );

  useEffect(() => {
    const loadProvider = async () => {
      const provider = await detectEthereumProvider<IProvider | null>();

      if (provider) {
        const web3 = new Web3(provider);
        const contract = await loadContract('CourseMarketplace', web3);

        setListeners(provider);
        setWeb3Api(
          createWeb3State({
            web3,
            provider,
            contract,
            isLoading: false,
          }),
        );
      } else {
        setWeb3Api(api => ({ ...api, isLoading: false }));
        console.error('Please, install Metamask.');
      }
    };

    loadProvider();
  }, []);

  const _web3Api = useMemo(() => {
    const { web3, provider, isLoading } = web3Api;
    return {
      ...web3Api,
      requireInstall: !isLoading && !web3,
      connect: provider
        ? async () => {
            try {
              await provider.request({ method: 'eth_requestAccounts' });
            } catch {
              location.reload();
            }
          }
        : () => console.error('Cannot connect to Metamask, try to reload your browser please.'),
    };
  }, [web3Api]);

  return <MyWeb3Context.Provider value={_web3Api}>{children}</MyWeb3Context.Provider>;
};

export const useWeb3 = (): IWeb3Context => useContext<IWeb3Context>(MyWeb3Context);

export function useHooks(cb: CD) {
  const { hooks } = useWeb3();
  return cb(hooks);
}
