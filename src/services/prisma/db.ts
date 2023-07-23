import { PrismaClient, Prisma } from '@prisma/client';
import { DefaultArgs, PrismaClientOptions } from '@prisma/client/runtime/library';
import { HTTP_METHOD } from 'next/dist/server/web/http';
import { URL_API } from './constant';

export abstract class BaseDBPrismaService {
  private _db: PrismaClient<PrismaClientOptions, never, DefaultArgs>;

  constructor() {
    this.init();
  }

  private init(): void {
    try {
      this._db = new PrismaClient<PrismaClientOptions, never, DefaultArgs>();
    } catch {
      console.error('Database is not connected!');
    }
  }

  /*** `Prisma` client. Can use only children classes.*/
  protected get db(): PrismaClient {
    return this._db;
  }
  /*** `prisma.user`: Exposes CRUD operations for the `User model`.*/
  protected get user(): Prisma.UserDelegate<DefaultArgs> {
    return this.db.user;
  }

  protected fetcher = async <REQ extends Record<string, unknown>, RES extends Record<string, unknown>>(
    url: URL_API,
    method: HTTP_METHOD,
    body: REQ,
    hds: HeadersInit = {},
  ): Promise<RES> => {
    const res: Response = await fetch(url, {
      method,
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json; charset=utf8',
        ...hds,
      },
    });

    return await res.json();
  };
}
