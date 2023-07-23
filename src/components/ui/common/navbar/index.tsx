import React from 'react';
import { useRouter } from 'next/router';
import cn from 'classnames';

import { useWeb3 } from '@components/providers';
import { ActiveLink, Button } from '@components/ui/common';
// import { useAccount } from '@components/hooks/web3';
import { NavBarProps } from './navbar.props';

const text = {
  home: 'Home',
  marketplace: 'Marketplace',
  blogs: 'Blogs',
  wishlist: 'Wishlist',
  loading: 'Loading',
  hi: 'Hi there',
  install: 'Install Metamask',
  connect: 'Connect',
  admin: 'Admin',
};

const Navbar: React.FC<NavBarProps> = ({ className, ...props }): React.JSX.Element => {
  const { pathname } = useRouter();
  const { connect, isLoading, requireInstall } = useWeb3();
  // const { account } = useAccount();

  return (
    <section className={cn(className)} {...props}>
      <div className="relative pt-6 px-4 sm:px-6 lg:px-8">
        <nav className="relative" aria-label="Global">
          <div className="flex flex-col xs:flex-row justify-between items-center">
            <div>
              <ActiveLink href="/" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {text.home}
              </ActiveLink>
              <ActiveLink href="/marketplace" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {text.marketplace}
              </ActiveLink>
              <ActiveLink href="/blogs" className="font-medium mr-8 text-gray-500 hover:text-gray-900">
                {text.blogs}
              </ActiveLink>
            </div>
            <div className="text-center">
              <ActiveLink href="/wishlist" className="font-medium sm:mr-8 mr-1 text-gray-500 hover:text-gray-900">
                {text.wishlist}
              </ActiveLink>
              {isLoading ? (
                <Button disabled={true} onClick={connect}>
                  {text.loading}...
                </Button>
              ) : // ) : account.data ? (
              //   <Button hoverable={false} className="cursor-default">
              //     {text.hi} {account.isAdmin && text.admin}
              //   </Button>
              requireInstall ? (
                <Button onClick={() => window.open('https://metamask.io/download.html', '_blank')}>
                  {text.install}
                </Button>
              ) : (
                <Button onClick={connect}>{text.connect}</Button>
              )}
            </div>
          </div>
        </nav>
      </div>
      {/* {account.data && !pathname.includes('/marketplace') && (
        <div className="flex justify-end pt-1 sm:px-6 lg:px-8">
          <div className="text-white bg-indigo-600 rounded-md p-2">{account.data}</div>
        </div>
      )} */}
    </section>
  );
};

export default Navbar;
