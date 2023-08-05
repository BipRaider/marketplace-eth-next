import { toast } from 'react-toastify';
import { Indicator } from '../Indicator';

export const Toast = {
  error(message: string) {
    toast.error(<Indicator color="red">{message}</Indicator>, {
      icon: <Indicator redIcon />,
      position: 'top-right',
      hideProgressBar: true,
      closeButton: false,
    });
  },

  success(message: string) {
    toast.success(<Indicator color="green">{message}</Indicator>, {
      icon: <Indicator greenIcon />,
      position: 'top-right',
      hideProgressBar: true,
      closeButton: false,
    });
  },
};

export const withToast = (promise: any) => {
  toast.promise(
    promise,
    {
      pending: {
        render() {
          return (
            <div className="p-6 py-2">
              <p className="mb-2">Your transaction is being processed.</p>
              <p>Hang tight... Just few more moments.</p>
            </div>
          );
        },
        icon: false,
      },
      success: {
        render({ data }: any) {
          return (
            <div>
              <p className="font-bold">Tx: {data?.transactionHash?.slice(0, 20)}...</p>
              <p>Has been succesfuly processed.</p>
              <a href={`https://ropsten.etherscan.io/tx/${data?.transactionHash}`} target="_blank">
                <i className="text-indigo-600 underline">See Tx Details</i>
              </a>
            </div>
          );
        },
        // other options
        icon: '🟢',
      },
      error: {
        render({ data }: any) {
          // When the promise reject, data will contains the error
          return <div>{data.message ?? 'Transaction has failed'}</div>;
        },
      },
    },
    {
      closeButton: true,
    },
  );
};
