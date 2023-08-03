import { ReactNode } from 'react';
import Web3, { SupportedProviders, EthExecutionAPI } from 'web3';

// import {
//   AccessListResult,
//   TransactionReceipt,
//   NonPayableCallOptions,
//   PayableCallOptions,
//   DataFormat,
//   DEFAULT_RETURN_FORMAT,
//   FormatType,
//   AbiFragment,

// } from 'web3-types';

type payloadJRpcCEon = 'metamask_unlockStateChanged' | 'metamask_chainChanged' | 'metamask_accountsChanged';
type MMEPon = 'accountsChanged' | 'chainChanged' | 'message';
// https://ethereum.org/ru/developers/docs/apis/json-rpc/
type REQ_METHODS = 'eth_sendTransaction' | 'eth_requestAccounts';

export interface MetaMaskEthereumProvider {
  isMetaMask?: boolean;
  once(_eventName: string | symbol, _listener: (..._args: any[]) => void): this;
  on(_eventName: MMEPon, _listener: (..._args: any[]) => void): this;
  off(_eventName: string | symbol, _listener: (..._args: any[]) => void): this;
  addListener(_eventName: string | symbol, _listener: (..._args: any[]) => void): this;
  removeListener(_eventName: string | symbol, _listener: (..._args: any[]) => void): this;
  removeAllListeners(_event?: string | symbol): this;
  request?: (_data: { method: REQ_METHODS; params?: Record<string, unknown> }) => any;
  _metamask?: any;
  _jsonRpcConnection?: {
    events: {
      removeListener(_eventName: string | symbol, _listener: (..._args: any[]) => void): any;
      removeAllListeners(_event?: string | symbol): any;
      on: (
        _eve: 'notification',
        _fn: (_payload: {
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

export interface Web3ProviderProps {
  children: ReactNode;
}
