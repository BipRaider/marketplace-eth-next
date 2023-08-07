// https://docs.metamask.io/wallet/reference/provider-api/
import { useEffect, useState, useCallback } from 'react';

import { ILoadWeb3 } from './useLoadWeb3';
import { ILoadProvider } from './useLoadProvider';
import { MetaMaskEthereumProvider } from './web3.interface';

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
  /*** The network use now.
   ** `TODO:` need delete it from here and move to the `useNetwork` hook.
   */
  chainId: null | string;
  /*** If connection to `MetaMask` failed.*/
  error: string | null;
}

export const baseAccountContext: Readonly<IAccount> = {
  isLoading: true,
  isAdmin: false,
  addresses: null,
  address: null,
  chainId: null,
  error: null,
  getAccounts: function (): void {
    console.error('getAccounts: Function not implemented.');
  },
  connectMetaMask: function (): void {
    console.error('connectMetaMask: Function not implemented.');
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
      setIsLoading(false);
      setIsAdmin(false);
      if (address !== accs[0]) {
        setAddress(accs[0]);
        const acc = web3?.utils.keccak256(accs[0]);
        const owner = process?.env?.NEXT_PUBLIC_OWNER || '';
        if (acc === owner) setIsAdmin(() => true);
      }
    }
  };

  const checkAdmin = useCallback(
    (addr: string): void => {
      if (addr) {
        const owner = process?.env?.NEXT_PUBLIC_OWNER || '';
        if (addr === owner) setIsAdmin(() => true);
      }
    },
    [address, isAdmin],
  );

  /*** Get all account from `MetaMask` */
  const getAccounts = useCallback(async (): Promise<void> => {
    if (web3) {
      const accs = await web3.eth.getAccounts();
      setAcc(accs);
      const network = await web3.eth.getChainId();
      setChainId(network.toString());
    }
  }, [web3]);

  const accountsChangedEvent = async _addresses => {
    if (web3) {
      const accs = await web3.eth.getAccounts();
      setAcc(accs);
    }
  };

  const chainChangedEvent = async (_chid: '0x539' | '5777' | '0x5' | '0x1' | '0xe708' | '0x89') => {
    if (chainId !== parseInt(_chid, 16).toString()) {
      setChainId(parseInt(_chid, 16).toString());
    }
  };

  const notificationEvent = payload => {
    const { method, params } = payload;
    if (method === 'metamask_unlockStateChanged') {
      if (!params.isUnlocked) {
        setAddresses([]);
        setAddress(null);
        setIsLoading(true);
        setIsAdmin(false);
        setChainId(null);
      } else setAcc(params.accounts);
    }
  };

  const setAccountListener = useCallback(
    (prov: MetaMaskEthereumProvider): void => {
      if (!prov) return;
      prov.on('accountsChanged', accountsChangedEvent);
      prov.on('chainChanged', chainChangedEvent);
      prov._jsonRpcConnection?.events.on('notification', notificationEvent);
    },
    [chainId, web3],
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
    if (address && !isAdmin) checkAdmin(address);
  }, [address, isAdmin]);

  useEffect(() => {
    if (web3) getAccounts();
  }, [getAccounts, web3]);

  useEffect(() => {
    if (web3 && provider && isLoading) setAccountListener(provider);
    return () => {
      provider?.removeAllListeners('message');
      provider?.removeAllListeners('accountsChanged');
      provider?.removeAllListeners('chainChanged');
      // That's the way it should be. no removeAllListeners("notification").
      provider?._jsonRpcConnection?.events?.removeListener('notification', notificationEvent);
    };
  }, [web3 && provider]);

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
