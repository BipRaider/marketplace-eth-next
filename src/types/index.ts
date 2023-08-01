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
  hash?: string;
}

export interface IOwnerCurse {
  id: string;
  ownedCourseId?: string;
  proof: string;
  owner: string;
  price: string | number;
  state: 'purchased' | 'activated' | 'deactivated';
}

export type INormalizeOwnedCourse = IOwnerCurse & Partial<ICourses>;

export type ContractNameList = 'CourseMarketplace';

export type ContractBuilder = InstanceType<typeof Contract>;
