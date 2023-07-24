import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { NavBarProps } from './props';
import { ActiveLink, Button } from '@components/common';
import { useWeb3Context } from '@src/context';

const text = {
  home: 'Home',
  courses: 'Courses',
  marketplace: 'Marketplace',
  product: 'Product',
  seo: 'Seo',
  company: 'Company',
  blogs: 'Blogs',
  wishlist: 'Wishlist',
  loading: 'Loading',
  hi: 'Hi there',
  install: 'Install Metamask',
  connect: 'Connect',
  admin: 'Admin',
  log_in: 'Log In',
};

export const Navbar: React.FC<NavBarProps> = ({ className, ...props }): React.JSX.Element => {
  const { provider, web3, account, isLoading, balance } = useWeb3Context();
  const { asPath } = useRouter();

  return (
    <section className={cn(className)} {...props}>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex justify-between items-center">
            <div>
              <ActiveLink href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {text.home}
              </ActiveLink>
              <ActiveLink href="/courses" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {text.courses}
              </ActiveLink>
              <ActiveLink href="/marketplace" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {text.marketplace}
              </ActiveLink>
              <ActiveLink href="/admin" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {'Admin'}
              </ActiveLink>
            </div>
            <div>
              <ActiveLink href="#" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {text.company}
              </ActiveLink>

              {isLoading && (
                <Button disabled onClick={account.connectMetaMask}>
                  {text.loading}
                </Button>
              )}

              {account.isLoading && !account.address && !provider.isLoading && (
                <Button onClick={account.connectMetaMask}>{text.connect}</Button>
              )}
              {provider.isLoading && web3.isLoading && (
                <Button onClick={() => window.open('https://metamask.io/download.html', '_blank')}>
                  {text.install}
                </Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {!account.isLoading && account.address && !asPath.includes('/marketplace') && (
        <div className="flex justify-end sm:px-6 lg:px-8 pt-1 gap-1">
          <div className="text-white bg-indigo-600 rounded-md p-2">
            {'Address: '}
            {account.isLoading ? (
              'Loading...'
            ) : (
              <>
                {account.address.substring(0, 5)}...{account.address.substring(account.address.length - 4)}
              </>
            )}
          </div>
          {!account.isLoading && (
            <div className="text-white bg-indigo-600 rounded-md p-2">
              {'ETH: '}
              {balance.balance}
            </div>
          )}
        </div>
      )}
    </section>
  );
};

export default Navbar;
