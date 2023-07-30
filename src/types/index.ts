import { Contract } from 'web3';

export interface ICourses {
  id: string;
  type: string;
  title: string;
  description: string;
  coverImage: string;
  author: string;
  link: string;
  slug: string;
  wsl: string[];
  createdAt: string;
}

export type ContractNameList = 'CourseMarketplace';

export type ContractBuilder = InstanceType<typeof Contract>;
