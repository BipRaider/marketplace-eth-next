import { toast } from 'react-toastify';
import NextImage from 'next/image';

import InfoIcon from '@/public/images/icon-info.svg';
import CheckIcon from '@/public/images/icon-check.svg';

interface Props {
  type: string;
  title?: string;
  message?: string;
}

const ToastWrapper = ({ type, title, message }: Props) => {
  return (
    <div>
      <NextImage layout="fixed" src={type === 'success' ? CheckIcon : InfoIcon} width="24" height="24" alt={''} />
      <div>
        <p className="text-white">{title}</p>
        <p className="mt-1 text-white">{message}</p>
      </div>
    </div>
  );
};

export const Toast = {
  error(title: string, message: string) {
    toast.error(<ToastWrapper type={'error'} title={title} message={message} />, {
      icon: false,
      position: 'top-right',
      hideProgressBar: true,
      closeButton: false,
    });
  },

  success(title: string, message: string) {
    toast.success(<ToastWrapper type={'success'} title={title} message={message} />, {
      icon: false,
      position: 'top-right',
      hideProgressBar: true,
      closeButton: false,
    });
  },
};
