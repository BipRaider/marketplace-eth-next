import { type User, Address } from '@prisma/client';

import { AUTH } from '../constant';
import { BaseDBPrismaService } from '../db';

// https://www.prisma.io/docs/concepts/components/prisma-client/crud
export class Auth extends BaseDBPrismaService {
  public login = async (data: User) => {
    const user = await this.user.findFirst({
      where: { OR: [{ id: data.id }, { name: data.name }] },
      // include: { addresses: true },
      select: { name: true, id: true, addresses: { select: { id: true, address: true } } },
    });
    return user;
  };
  public loginRequest = async (user: User) => {
    const res = await this.fetcher(AUTH.LOGIN, 'POST', user);
    return res;
  };

  public logout = async () => {};
  public logoutRequest = async (user: User) => {
    const res = await this.fetcher(AUTH.LOGOUT, 'POST', user);
    return res;
  };

  public register = async (data: Pick<User, 'name'> & Pick<Address, 'address'>) => {
    const user = await this.user.create({
      data: { name: data.name, addresses: { create: [{ address: data.address }] } },
      select: { name: true, id: true, addresses: { select: { id: true } } },
    });
    return user;
  };
  public registerRequest = async (user: User) => {
    const res = await this.fetcher(AUTH.REGISTER, 'POST', user);
    return res;
  };

  public default = async () => {};
  public defaultRequest = async () => {
    const res = await this.fetcher(AUTH.DEFAULT, 'POST', {});
    return res;
  };
}

export const AuthService = new Auth();
