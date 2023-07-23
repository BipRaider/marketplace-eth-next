import { ISocial } from './ISocial';
import { IMusicCategory } from './IMusicCategory';
import { IImage } from './IImage';

export interface IArtist {
  objectId: string;
  name: string;
  imgSrc?: string;
  description: string;
  musicCategory: IMusicCategory;
  avatarImage?: IImage;
  socials?: ISocial[];
  featuredVideoTitle?: string;
  featuredVideoUrl?: string;
}
