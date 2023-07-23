import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface PricePerItemProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  price: number;
  priceItem: number;
}
