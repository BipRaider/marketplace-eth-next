import { BaseDBPrismaService } from '../db';

export class NFT extends BaseDBPrismaService {
  public getAll = () => {};
  public getAllRequest = () => {};

  public get = () => {};
  public getRequest = () => {};

  public update = () => {};
  public updateRequest = () => {};

  public delete = () => {};
  public deleteRequest = () => {};

  public default = () => {};
  public defaultRequest = () => {};
}

export const NFTService = new NFT();
