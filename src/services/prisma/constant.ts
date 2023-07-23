export enum CONST {
  API = 'api',
  NFT = 'nft',
  AUTH = 'auth',
  USER = 'user',
  USERS = 'users',
  CONTRACT = 'contract',
  CONTRACTS = 'contracts',
  // base
  CREATE = 'create',
  GET = 'get',
  UPDATE = 'update',
  DELETE = 'delete',
  ALL = 'getAll',
}

export enum AUTH {
  /*** Base router auth */
  DEFAULT = `/${CONST.API}/${CONST.AUTH}`,
  /*** Page for login the user to the website.*/
  LOGIN = `/${CONST.API}/${CONST.AUTH}/login`,
  /*** Page for logout the user from the website.*/
  LOGOUT = `/${CONST.API}/${CONST.AUTH}/logout`,
  /*** Page for register a user into the database.*/
  REGISTER = `/${CONST.API}/${CONST.AUTH}/register`,
}

export enum USERS {
  /*** Base router `users` */
  DEFAULT = `/${CONST.API}/${CONST.USERS}`,
  /*** Page for `get` the `user` from the database.*/
  GET = `/${CONST.API}/${CONST.USERS}/${CONST.GET}`,
  /*** Page for `update` the `user` to the database.*/
  UPDATE = `/${CONST.API}/${CONST.USERS}/${CONST.UPDATE}`,
  /*** Page for `delete` the `user` from the database.*/
  DELETE = `/${CONST.API}/${CONST.USERS}/${CONST.DELETE}`,
  /*** Page for `get all` the `users` from the database.*/
  ALL = `/${CONST.API}/${CONST.USERS}/${CONST.ALL}`,
}

export enum NFT {
  /*** Base router `nft` */
  DEFAULT = `/${CONST.API}/${CONST.NFT}`,
  /*** Page for `get` the `nft` from the database.*/
  GET = `/${CONST.API}/${CONST.NFT}/${CONST.GET}`,
  /*** Page for `update` the `nft` to the database.*/
  UPDATE = `/${CONST.API}/${CONST.NFT}/${CONST.UPDATE}`,
  /*** Page for `delete` the `nft` from the database.*/
  DELETE = `/${CONST.API}/${CONST.NFT}/${CONST.DELETE}`,
  /*** Page for `get all` the `nfts` from the database.*/
  ALL = `/${CONST.API}/${CONST.NFT}/${CONST.ALL}`,
}

export enum CONTRACTS {
  /*** Base router `contracts` */
  DEFAULT = `/${CONST.API}/${CONST.CONTRACTS}`,
  /*** Page for `get` the `contract` from the database.*/
  GET = `/${CONST.API}/${CONST.CONTRACTS}/${CONST.GET}`,
  /*** Page for `update` the `contract` to the database.*/
  UPDATE = `/${CONST.API}/${CONST.CONTRACTS}/${CONST.UPDATE}`,
  /*** Page for `delete` the `contract` from the database.*/
  DELETE = `/${CONST.API}/${CONST.CONTRACTS}/${CONST.DELETE}`,
  /*** Page for `get all` the `contracts` from the database.*/
  ALL = `/${CONST.API}/${CONST.CONTRACTS}/${CONST.ALL}`,
}

/*** All url */
export type URL_API = CONTRACTS | NFT | USERS | AUTH;
