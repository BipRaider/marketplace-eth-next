import { ReactNode } from 'react';
import Web3, { SupportedProviders, EthExecutionAPI } from 'web3';

import { setupHooks } from '@src/hooks/providers/web3/hooks/setupHooks';

type payloadJRpcCEon = 'metamask_unlockStateChanged' | 'metamask_chainChanged' | 'metamask_accountsChanged';
type MMEPon = 'accountsChanged' | 'chainChanged';
// https://ethereum.org/ru/developers/docs/apis/json-rpc/
type REQ_METHODS = 'eth_sendTransaction' | 'eth_requestAccounts';

export interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(eventName: string | symbol, listener: (...args: any[]) => void): this;
  on(eventName: MMEPon, listener: (...args: any[]) => void): this;
  off(eventName: string | symbol, listener: (...args: any[]) => void): this;
  addListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this;
  removeAllListeners(event?: string | symbol): this;
  request?: (data: { method: REQ_METHODS; params?: Record<string, unknown> }) => any;
  _metamask?: any;
  _jsonRpcConnection?: {
    events: {
      on: (
        eve: 'notification',
        fn: (payload: {
          method: payloadJRpcCEon;
          params: {
            chainId: string;
            networkVersion: any;
            isUnlocked: boolean;
            accounts: string[];
          };
        }) => void,
      ) => void;
    };
  };
}

export interface IContractFaucet {
  address: string;
}

export interface OptionsContract {
  from: string;
  to: string;
  value: string;
  data: string;
}
export type IProvider = MetaMaskEthereumProvider & SupportedProviders<EthExecutionAPI>;

export interface IWeb3Api {
  provider: IProvider | null;
  isLoading: boolean;
  web3: Web3 | null;
  contract: IContractFaucet | null;
}

export interface IWeb3Context_1 extends IWeb3Api {
  hooks?: ReturnType<typeof setupHooks>;
  connect: () => any;
  isLoading: boolean;
  requireInstall: boolean;
}

export interface Web3ProviderProps {
  children: ReactNode;
}

export type CD = (data: ReturnType<typeof setupHooks>) => any;
