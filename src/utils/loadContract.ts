import Web3 from 'web3';
import contract from '@truffle/contract';

const NETWORK_ID = process.env.NEXT_PUBLIC_NETWORK_ID;

export const loadContract = async (name: string, web3: Web3) => {
  const res = await fetch(`/contracts/${name}.json`);
  const Artifact = await res.json();
  let contract = null;

  try {
    if (NETWORK_ID) contract = new web3.eth.Contract(Artifact.abi, Artifact.networks[NETWORK_ID].address);
  } catch {
    console.log(`Contract ${name} cannot be loaded`);
  }

  return contract;
};

type ContractNameList = 'CourseMarketplace';

export const loadContract_2 = async (name: ContractNameList, provider: any) => {
  const Artifact = require(`../../build/contracts/${name}.json`);

  const _contract = contract(Artifact);
  _contract.setProvider(provider);

  let deployedContract = null;
  try {
    deployedContract = await _contract.deployed();
  } catch {
    console.error('You are connected to the wrong network');
  }

  return deployedContract;
};
// export const loadContract = async (name, provider) => {
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
