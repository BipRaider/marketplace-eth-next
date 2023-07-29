import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { ICourses } from '../../../../types/index';

export interface OrderModalProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  course: ICourses | null;
  onClose: (_data?: any) => void;
  onSubmit: (..._data: any) => void;
  isNewPurchase: boolean;
}

export interface IOrder {
  price: string | number;
  email: string;
  confirmationEmail: string;
}

export interface ICreateFormStateOrder {
  isDisabled: boolean;
  message: string;
}
