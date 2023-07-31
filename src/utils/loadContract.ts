// import Web3, { Contract } from 'web3';
// //@ts-ignore
// // import contract from '@truffle/contract';

// const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

// type ContractNameList = 'CourseMarketplace';

// type ContractBuilder = InstanceType<typeof Contract>;

// export const getContract = async (name: ContractNameList, web3: Web3): Promise<ContractBuilder | Error | null> => {
//   const res = await fetch(`/contracts/${name}.json`);
//   const Artifact = await res.json();
//   let contract: ContractBuilder | null = null;

//   try {
//     if (!Artifact) return new Error(`Artifact not found.`);
//     if (!NETWORK_ID) return new Error(`Network id not found.`);

//     const address = Artifact.networks[NETWORK_ID]?.address;
//     if (!address) return new Error(`Address not found in the network.`);

//     contract = new web3.eth.Contract(Artifact.abi, address);
//   } catch {
//     return new Error(`Contract ${name} cannot be loaded`);
//   }

//   return contract;
// };

// export const getContract_2 = async (name: ContractNameList, provider: any) => {
//   const Artifact = require(`../../public/contracts/${name}.json`);

//   const _contract = contract(Artifact);
//   _contract.setProvider(provider);

//   let deployedContract = null;
//   try {
//     deployedContract = await _contract.deployed();
//   } catch {
//     console.error('You are connected to the wrong network');
//   }

//   return deployedContract;
// };

// export const loadContract_3 = async (name, provider) => {
//   const res = await fetch(`/contracts/${name}.json`)
//   const Artifact = await res.json()

//   const _contract = window.TruffleContract(Artifact)
//   _contract.setProvider(provider)

//   let deployedContract = null
//   try {
//     deployedContract = await _contract.deployed()
//   } catch {
//     console.log(`Contract ${name} cannot be loaded`)
//   }

//   return deployedContract
// }
