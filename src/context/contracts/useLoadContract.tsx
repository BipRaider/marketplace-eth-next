import Web3 from 'web3';
import { useEffect, useState, useCallback } from 'react';

import { ILoadProvider } from '../web3/useLoadProvider';
import { ILoadWeb3 } from '../web3/useLoadWeb3';
import { ContractBuilder, ContractNameList, ILoadContract } from './contracts.interface';

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const baseContractContext: Readonly<ILoadContract> = {
  contract: null,
  error: null,
  isLoading: true,
  loadContract: function (): void {
    console.error('loadContract: Function not implemented.');
  },
  contractName: null,
};

const getContract = async (name: ContractNameList, web3: Web3): Promise<ILoadContract['contract'] | Error> => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  if (!Artifact) return new Error(`Artifact not found.`);
  if (!NETWORK_ID) return new Error(`Network id not found.`);
  try {
    const address = Artifact.networks[NETWORK_ID]?.address;
    if (!address) return new Error(`Address not found in the network.`);
    return new web3.eth.Contract(Artifact.abi, address) as ILoadContract['contract'];
  } catch {
    return new Error(`Contract ${name} cannot be loaded`);
  }
};

/*** Get contract.*/
export const useLoadContract = ({ web3, ...web3Params }: ILoadWeb3, _provider: ILoadProvider): ILoadContract => {
  const [contract, setContract] = useState<ILoadContract['contract']>(null);
  const [error, setError] = useState<string | null>(null);
  const [contractName, setContractName] = useState<ContractNameList | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadContract = useCallback(
    async (_: Record<string, unknown> = {}, name: ContractNameList = 'CourseMarketplace'): Promise<void> => {
      setIsLoading(true);
      if (!web3) return;
      const cont = await getContract(name, web3);
      if (cont instanceof Error) {
        setContract(null);
        setError(cont.message);
      } else {
        setContractName(name);
        setContract(cont);
        setError(null);
        setIsLoading(false);
      }
    },
    [web3],
  );

  useEffect((): void => {
    if (!web3Params.isLoading) loadContract();
  }, [web3Params.isLoading]);

  useEffect((): void => {
    if (!contract && !isLoading) loadContract();
  }, [loadContract, contract, isLoading]);

  return { contract, loadContract, error, isLoading, contractName };
};
