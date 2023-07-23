import { IProject } from './IProject';
import { IArtist } from './IArtist';
import { IImage } from './IImage';

type NftRankType = 'basic' | 'gold' | 'platinium' | 'diamond';

export interface IMembershipCardModel {
  objectId: string;
  type: NftRankType;
  projectRef: IProject;
  artistRef: IArtist;
  perks: string[];
  currentSupply: number;
  maxSupply: number;
  media: IImage;
  price: number;
  currency: string;
}

export interface IMembershipCardModelJson {
  type: NftRankType;
  projectRef: IProject;
  perks: string[];
  currentSupply: number;
  maxSupply: number;
  media: IImage;
  price?: string;
  currency: string;
  year?: string;
}
