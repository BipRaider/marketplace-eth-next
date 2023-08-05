declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';

    readonly MNEMONIC: string;
    readonly INFURA_PROJECT_ID: string;

    /*** It's the id of network that is support. */
    readonly NEXT_PUBLIC_TARGET_CHAIN_ID: string;
    /*** It's the network id of the contracts. */
    readonly NEXT_PUBLIC_NETWORK_ID: string;
    readonly NEXT_PUBLIC_NETWORK_ID_MAINNET: string;
    readonly NEXT_PUBLIC_TARGET_CHAIN_ID_MAINNET: string;
    readonly NEXT_PUBLIC_NETWORK_ID_GEORLI: string;
    readonly NEXT_PUBLIC_TARGET_CHAIN_ID_GEORLI: string;
    readonly NEXT_PUBLIC_NETWORK_ID_SEPOLIA: string;
    readonly NEXT_PUBLIC_TARGET_CHAIN_ID_SEPOLIA: string;

    readonly NEXT_PUBLIC_PARSE_SERVER_URL: string;
    readonly NEXT_PUBLIC_PARSE_ID: string;
    readonly NEXT_PUBLIC_PARSE_JAVASCRIPT_KEY: string;
    /*** The url of the database data.*/
    readonly NEXT_PUBLIC_DATABASE_URL: string;
    /*** The secret of the session cookie.*/
    readonly NEXT_PUBLIC_COOKIE_SECRET: string;
  }
}
