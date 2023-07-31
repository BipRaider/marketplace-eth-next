import { Contract } from 'web3';

export type ContractNameList = 'CourseMarketplace';
export type ContractBuilder<ContractMethods extends Record<string, unknown> = {}> = InstanceType<
  typeof Contract & ContractMethods
>;

export interface ICourseMarketplaceContract {}

export interface ILoadContract {
  /*** The contract */
  contract: ContractBuilder | null;
  /*** The contract name */
  contractName: ContractNameList | null;
  /*** Error contract.*/
  error: string | null;
  /*** State of loading to the contract.*/
  isLoading: boolean;
  /*** Reload the contract.*/
  loadContract: () => void;
}

export interface IContractsContext {
  /*** State of loading if all dependence is loaded.*/
  isLoading: boolean;
  contract: ILoadContract;
  contracts: Map<ContractNameList, ContractBuilder>;
}
