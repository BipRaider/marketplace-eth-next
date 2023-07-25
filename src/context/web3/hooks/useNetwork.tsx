import { useCallback, useEffect, useState } from 'react';
import { ILoadWeb3 } from '../useLoadWeb3';

const NETWORKS = new Map<string, string>();
NETWORKS.set('1', 'Ethereum Main Network');
NETWORKS.set('3', 'Ropsten Test Network');
NETWORKS.set('4', 'Rinkeby Test Network');
NETWORKS.set('5', 'Goerli Test Network');
NETWORKS.set('42', 'Kovan Test Network');
NETWORKS.set('56', 'Binance Smart Chain');
NETWORKS.set('1337', 'Ganache');

let targetNetwork: string | undefined = '';
const error_message = 'Cannot retrieve network. Please refresh the browser.';

export interface INetwork {
  /*** Get a network from `MetaMask`.*/
  getNetwork: () => void;
  /*** State of loading to the network.*/
  isLoading: boolean;
  /*** Error if network not found. */
  error: string | null;
  /*** Target network with should be work app.*/
  target: string | undefined;
  /*** Supported the network the app. */
  isSupported: boolean;
  /*** the network name */
  network: string;
}

export const baseNetworkContext: Readonly<INetwork> = {
  getNetwork: function (): void {
    throw new Error('getNetwork: Function not implemented.');
  },
  isLoading: false,
  error: null,
  target: undefined,
  isSupported: false,
  network: '',
};

export const useNetwork = ({ web3 }: ILoadWeb3): INetwork => {
  const [network, setNetwork] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getNetwork = useCallback(async (): Promise<void> => {
    setIsLoading(true);
    if (web3) {
      const chainId = await web3.eth.getChainId();
      if (!chainId) setError(error_message);

      const net = NETWORKS.get(chainId.toString());
      setNetwork(net);
      setIsLoading(false);
    }
  }, [web3]);

  useEffect((): void => {
    if (web3) getNetwork();
  }, [getNetwork, web3]);

  if (process.env.NEXT_PUBLIC_TARGET_CHAIN_ID) {
    targetNetwork = NETWORKS.get(process.env.NEXT_PUBLIC_TARGET_CHAIN_ID);
  }

  return {
    network,
    error,
    isLoading,
    target: targetNetwork,
    isSupported: network === targetNetwork,
    getNetwork,
  };
};
