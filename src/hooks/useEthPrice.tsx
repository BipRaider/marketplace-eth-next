import useSWR, { SWRResponse } from 'swr';

const URL =
  'https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false';

const fetcherEthUsd = async (url: string): Promise<number | null> => {
  const res = await fetch(url);
  const json = await res.json();
  return json.market_data.current_price.usd ?? null;
};

export type IEthPrice = Omit<SWRResponse, 'data'>;

export interface IUseEthPrice {
  eth: {
    price: number;
  } & IEthPrice;
}

export const useEthPrice = (): IUseEthPrice => {
  const { data, ...rest } = useSWR(URL, fetcherEthUsd, { refreshInterval: 100_000 });
  return { eth: { price: data ?? 0, ...rest } };
};

export const pricePerItem = (price: number = 0, pricePerItem: number = 0): string | null => {
  if (!price) return null;
  const priceItem = pricePerItem / Number(price);
  return priceItem.toFixed(6);
};
