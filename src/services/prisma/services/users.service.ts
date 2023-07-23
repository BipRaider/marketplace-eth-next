import { USERS } from '../constant';
import { BaseDBPrismaService } from '../db';

export class Users extends BaseDBPrismaService {
  public getAll = () => {};
  public getAllRequest = async () => {
    const res = await this.fetcher(USERS.ALL, 'POST', {});
    return res;
  };

  public get = () => {};
  public getRequest = async () => {
    const res = await this.fetcher(USERS.GET, 'POST', {});
    return res;
  };

  public update = () => {};
  public updateRequest = async () => {
    const res = await this.fetcher(USERS.UPDATE, 'POST', {});
    return res;
  };

  public delete = () => {};
  public deleteRequest = async () => {
    const res = await this.fetcher(USERS.DELETE, 'POST', {});
    return res;
  };

  public default = () => {};
  public defaultRequest = async () => {
    const res = await this.fetcher(USERS.DEFAULT, 'POST', {});
    return res;
  };
}

export const UsersService = new Users();
