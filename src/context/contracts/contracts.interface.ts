import { Contract } from 'web3';
import { PayableMethodObject, NonPayableMethodObject } from 'web3-eth-contract';
export type ContractNameList = 'CourseMarketplace';

export type ContractBuilder = InstanceType<typeof Contract>;

export interface ICourseMarketplaceContract {
  methods: {
    purchaseCourse: (_hexCourseId: string, _proof: string) => PayableMethodObject;
    repurchaseCourse: (_courseHash: string) => PayableMethodObject;
    activateCourse: (_courseHash: string) => NonPayableMethodObject;
    deactivateCourse: (_courseHash: string) => NonPayableMethodObject;
    withdraw: () => NonPayableMethodObject;
    emergencyWithdraw: () => NonPayableMethodObject;
    stopContract: () => NonPayableMethodObject;
    resumeContract: () => NonPayableMethodObject;
    transferOwnership: () => NonPayableMethodObject;
    getCourseCount: () => NonPayableMethodObject;
    getCourseHashAtIndex: (_index: string) => NonPayableMethodObject;
    getCourseByHash: (_courseHash: string) => NonPayableMethodObject;
  };
}

export type ContractBuilderMarketplace = ContractBuilder & ICourseMarketplaceContract;

export interface ILoadContract {
  /*** The contract */
  contract: ContractBuilderMarketplace | null;
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
  contracts: Map<ContractNameList, ContractBuilderMarketplace>;
}
