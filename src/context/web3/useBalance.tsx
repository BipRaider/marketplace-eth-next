import { useEffect, useState, useCallback } from 'react';
import { ILoadWeb3 } from './useLoadWeb3';

export interface IBalance {
  getBalance: () => void;
  /*** Balance at the wallet that now use.*/
  balance: string;
  error: string | null;
  account: string | null;
  isLoading: boolean;
}

export const baseBalanceContext: Readonly<IBalance> = {
  balance: '0',
  error: null,
  account: null,
  isLoading: true,
  getBalance: function (): void {
    throw new Error('Function not implemented.');
  },
};

export const useBallance = ({ web3 }: ILoadWeb3, address: string | null): IBalance => {
  const [balance, setBallance] = useState<string>('0');
  const [account, setAccount] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getBalance = useCallback(async (): Promise<void> => {
    if (!web3) return;
    if (!account) return;
    setIsLoading(true);
    try {
      const bal = await web3.eth.getBalance(account);
      setBallance(web3.utils.fromWei(bal, 'ether'));
      setError(null);
      setIsLoading(false);
    } catch {
      setError('Cannot get the balance of the address.');
      setBallance('0');
      setIsLoading(true);
    }
  }, [account, web3]);

  useEffect(() => {
    if (account) getBalance();
  }, [account, getBalance, web3]);

  useEffect(() => {
    if (address) setAccount(address);
  }, [address]);

  return {
    getBalance,
    account,
    balance,
    isLoading,
    error,
  };
};
