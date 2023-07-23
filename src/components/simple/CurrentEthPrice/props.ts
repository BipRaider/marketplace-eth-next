import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface CurrentEthPriceProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  data: number;
}
