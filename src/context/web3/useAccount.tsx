import { useEffect, useState, useCallback } from 'react';

import { MetaMaskEthereumProvider } from '@src/context/web3';
import { ILoadWeb3 } from './useLoadWeb3';
import { ILoadProvider } from './useLoadProvider';

const adminAddresses = ['0x2cE8e88f515F4ECd98E490d10081963FD03A5665', '0x6DA4827AD94a60712b7AAe113092DFaD008ADd34'];

export interface IAccount {
  /*** Get all account from `MetaMask`.*/
  getAccounts: () => void;
  /*** Connect to `MetaMask`.*/
  connectMetaMask: () => void;
  /*** State of loading to the address.*/
  isLoading: boolean;
  /*** If the wallet address of the owner of the contract.*/
  isAdmin: boolean;
  /*** All addresses that `MetaMask` has.*/
  addresses: null | string[];
  /*** Address that use now.*/
  address: null | string;
  /*** The network use now.*/
  chainId: null | string;
  /*** If connection to `MetaMask` failed.*/
  error: string | null;
}

export const baseAccountContext: Readonly<IAccount> = {
  isLoading: false,
  isAdmin: false,
  addresses: null,
  address: null,
  chainId: null,
  error: null,
  getAccounts: function (): void {
    throw new Error('getAccounts: Function not implemented.');
  },
  connectMetaMask: function (): void {
    throw new Error('connectMetaMask: Function not implemented.');
  },
};

export const useAccount = ({ web3 }: ILoadWeb3, { provider }: ILoadProvider): IAccount => {
  const [addresses, setAddresses] = useState<string[] | null>(null);
  const [address, setAddress] = useState<string | null>(null);
  const [chainId, setChainId] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const setAcc = (accs: string[]) => {
    setIsLoading(true);
    if (accs && accs.length > 0) {
      setAddresses(accs);
      setAddress(accs[0]);
      setIsLoading(false);
      setIsAdmin(false);
      if (accs[0] === adminAddresses[0]) setIsAdmin(true);
      if (accs[0] === adminAddresses[1]) setIsAdmin(true);
    }
  };

  /*** Get all account from `MetaMask` */
  const getAccounts = useCallback(async (): Promise<void> => {
    setIsLoading(false);
    if (web3) {
      const accs = await web3.eth.getAccounts();
      setAcc(accs);
      const network = await web3.eth.getChainId();
      setChainId(network.toString());
    }
  }, [web3]);

  const setAccountListener = useCallback(
    (prov: MetaMaskEthereumProvider): void => {
      if (!prov) return;
      prov.on('accountsChanged', accs => {
        if (accs && accs.length > 0 && address !== accs[0]) {
          setIsAdmin(false);
          setAddress(accs[0]);
          if (accs[0] === adminAddresses[0]) setIsAdmin(true);
          if (accs[0] === adminAddresses[1]) setIsAdmin(true);
        }
      });
      // prov.on('chainChanged', (chain_id: '0x539' | '5777' | '0x5' | '0x1' | '0xe708' | '0x89') => {
      //   if (chainId !== chain_id) setChainId(chain_id);
      // });
      prov._jsonRpcConnection?.events.on('notification', payload => {
        const { method, params } = payload;
        if (method === 'metamask_unlockStateChanged') {
          if (!params.isUnlocked) {
            setAddresses([]);
            setAddress(null);
            setIsLoading(true);
            setIsAdmin(false);
          } else setAcc(params.accounts);
        }
      });
    },
    [address],
  );

  const connectMetaMask = useCallback(async (): Promise<void> => {
    if (!provider) return;
    try {
      if (provider.request) await provider.request({ method: 'eth_requestAccounts' });
      else setError('Cannot connect to Metamask, try to reload your browser please.');
    } catch (error) {
      setError('Cannot retrieve account!');
    }
  }, [provider]);

  useEffect(() => {
    if (web3) getAccounts();
  }, [getAccounts, web3]);

  useEffect(() => {
    if (web3 && provider) setAccountListener(provider);
  }, [web3, provider, setAccountListener]);

  return {
    error,
    isLoading,
    isAdmin,
    addresses,
    address,
    chainId,
    getAccounts,
    connectMetaMask,
  };
};
