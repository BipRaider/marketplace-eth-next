import React from 'react';
import Link from 'next/link';
import cn from 'classnames';

import { WalletBarProps } from './props';
import { useWeb3Context } from '@src/context';

const text = {
  hello: 'Hello, ',
  hope: 'I hope you are having a great day!',
  learn: 'Learn how to purchase',
  currently: 'Currently on',
};

export const WalletBar: React.FC<WalletBarProps> = ({ className, ...props }): React.JSX.Element => {
  const { account, network } = useWeb3Context();
  return (
    <section className={cn('text-white bg-indigo-600', className)} {...props}>
      <div className="p-8">
        <h1 className="text-2xl">
          {text.hello}
          {account.address}
        </h1>
        <h2 className="subtitle mb-5 text-xl">{text.hope}</h2>
        <div className="flex justify-between items-center">
          <div className="sm:flex sm:justify-center lg:justify-start">
            <div className="rounded-md shadow">
              <Link
                href="#"
                className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100 md:py-4 md:text-lg md:px-10"
              >
                {text.learn}
              </Link>
            </div>
          </div>
          <div>
            {!network.isSupported && (
              <div className=" p-4 bg-red-400 rounded-lg">
                <div>Connected wrong Network</div>
                <div>
                  Connect to:<strong className="text-2xl pl-1">{network.target}</strong>
                </div>
              </div>
            )}
            <div>
              <span>{text.currently}:</span>
              <strong className="text-2xl pl-1">{network.network}</strong>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
