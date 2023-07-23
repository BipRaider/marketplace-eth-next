import { BaseDBPrismaService } from '../db';

export class Contracts extends BaseDBPrismaService {
  public getAll = async () => {};
  public getAllRequest = async () => {};

  public get = async () => {};
  public getRequest = async () => {};

  public update = async () => {};
  public updateRequest = async () => {};

  public delete = async () => {};
  public deleteRequest = async () => {};

  public default = async () => {};
  public defaultRequest = async () => {};
}

export const ContractsService = new Contracts();
