import React from 'react';

import { Button, Indicator } from '@src/components/common';
import { withLayout } from '@src/components/main';
import { useWeb3Context, useAppContext, useEthContext } from '@src/context';

export const getServerSideProps = async () => {
  return {
    props: {},
  };
};

const Admin = () => {
  const appContext = useAppContext();
  const web3Context = useWeb3Context();
  const ethContext = useEthContext();

  return (
    <div>
      <div className="grid md:grid-cols-1 min-h-screen">
        <div className="px-8 bg-gray-100 md:col-span-2 h-full border-b border-cyan-900">
          <h1>App</h1>
          <ul>
            <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
              Loading:
              {appContext.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
            </li>
          </ul>
        </div>

        <div className="px-8 bg-gray-100 md:col-span-2 h-full border-b border-cyan-900">
          <h1>Web3</h1>
          <div className="px-2 border-b border-cyan-500">
            <div className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
              Loading Web3:
              {web3Context.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
            </div>
          </div>
          <div className="px-2 border-b border-cyan-500">
            <Button variant={'white'} size={'sm'} onClick={web3Context.provider.loadProvider}>
              Reload Provider
            </Button>
            <ul>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                <span className="">Loading:</span>
                {web3Context.provider.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.provider.error ? (
                  <Indicator text color={'red'}>
                    {web3Context.provider.error}
                  </Indicator>
                ) : (
                  <Indicator greenIcon />
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Provider:
                {web3Context.provider.provider ? <Indicator greenIcon /> : <Indicator redIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Name:
                {web3Context.provider.provider && web3Context.provider.provider.isMetaMask ? (
                  <Indicator text color={'green'}>
                    MetaMask
                  </Indicator>
                ) : (
                  <Indicator text color={'red'}>
                    unknown
                  </Indicator>
                )}
              </li>
            </ul>
          </div>
          <div className="px-2 border-b border-cyan-500">
            <Button variant={'white'} size={'sm'} onClick={web3Context.web3.loadWeb3}>
              Reload Web3
            </Button>
            <ul>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Loading:
                {web3Context.web3.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.web3.error ? (
                  <Indicator text color={'red'}>
                    {web3Context.web3.error}
                  </Indicator>
                ) : (
                  <Indicator greenIcon />
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Provider:
                {web3Context.web3.web3 ? <Indicator greenIcon /> : <Indicator redIcon />}
              </li>
            </ul>
          </div>
          <div className="px-2 border-b border-cyan-500">
            <Button variant={'white'} size={'sm'} onClick={web3Context.contract.loadContract}>
              Reload Contract
            </Button>
            <ul>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Loading:
                {web3Context.contract.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.contract.error ? (
                  <Indicator text color={'red'}>
                    {web3Context.contract.error}
                  </Indicator>
                ) : (
                  <Indicator greenIcon />
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Provider:
                {web3Context.contract.contract ? <Indicator greenIcon /> : <Indicator redIcon />}
              </li>
            </ul>
          </div>
          <div className="px-2 border-b border-cyan-500">
            <Button variant={'white'} size={'sm'} className="mr-1" onClick={web3Context.account.getAccounts}>
              Get account
            </Button>
            <Button variant={'white'} size={'sm'} className="mr-1" onClick={web3Context.account.connectMetaMask}>
              Connect to MetaMask
            </Button>
            <ul>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Loading:
                {web3Context.account.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.provider.error ? (
                  <Indicator text color={'red'}>
                    {web3Context.account.error}
                  </Indicator>
                ) : (
                  <Indicator greenIcon />
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Admin:
                {web3Context.account.isAdmin ? <Indicator greenIcon /> : <Indicator redIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Network:
                {web3Context.account.chainId ? (
                  <Indicator text color={'green'}>{`${web3Context.account.chainId}`}</Indicator>
                ) : (
                  <Indicator text color={'red'}>{`${web3Context.account.chainId}`}</Indicator>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Address use:
                {web3Context.account.address ? (
                  <Indicator text color={'green'}>{`${web3Context.account.address}`}</Indicator>
                ) : (
                  <Indicator text color={'red'}>{`${web3Context.account.address}`}</Indicator>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Address list:
                <ul>
                  {web3Context.account.addresses &&
                    web3Context.account.addresses.map(address => {
                      return (
                        <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }} key={address}>
                          <Indicator text className="text-emerald-700">{`${address}`}</Indicator>
                        </li>
                      );
                    })}
                </ul>
              </li>
            </ul>
          </div>
          <div className="px-2 border-b border-cyan-500">
            <Button variant={'white'} size={'sm'} className="mr-1" onClick={web3Context.network.getNetwork}>
              Get network
            </Button>

            <ul>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Loading:
                {web3Context.network.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Error:
                {web3Context.network.error ? (
                  <Indicator text color={'red'}>
                    {web3Context.network.error}
                  </Indicator>
                ) : (
                  <Indicator greenIcon />
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Is support:
                {web3Context.network.isSupported ? <Indicator greenIcon /> : <Indicator redIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Network now:
                {web3Context.network.network ? (
                  <Indicator text color={'green'}>{`${web3Context.network.network}`}</Indicator>
                ) : (
                  <Indicator text color={'red'}>{`${web3Context.network.network}`}</Indicator>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Network target:
                {web3Context.network.target ? (
                  <Indicator text color={'green'}>{`${web3Context.network.target}`}</Indicator>
                ) : (
                  <Indicator text color={'red'}>{`${web3Context.network.target}`}</Indicator>
                )}
              </li>
            </ul>
          </div>
          <div className="px-2 border-b border-cyan-500">
            <Button variant={'white'} size={'sm'} className="mr-1" onClick={web3Context.balance.getBalance}>
              Get balance
            </Button>

            <ul>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Loading:
                {web3Context.balance.isLoading ? <Indicator loading /> : <Indicator greenIcon />}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Error:
                {web3Context.balance.error ? (
                  <Indicator text color={'red'}>
                    {web3Context.balance.error}
                  </Indicator>
                ) : (
                  <Indicator greenIcon />
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Address:
                {!web3Context.balance.account ? (
                  <Indicator redIcon />
                ) : (
                  <Indicator text color={'green'}>
                    {web3Context.balance.account}
                  </Indicator>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Balance:
                {web3Context.balance.balance ? (
                  <Indicator text color={'green'}>{`${web3Context.balance.balance}`}</Indicator>
                ) : (
                  <Indicator text color={'red'}>{`${web3Context.balance.balance}`}</Indicator>
                )}
              </li>
            </ul>
          </div>
        </div>

        <div className="px-8 bg-gray-100 md:col-span-2 h-full border-b border-cyan-900">
          <h1>Eth</h1>
          <ul>
            <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
              USD:
              {ethContext.ethPriceUSD ? (
                <Indicator text color={'green'}>{`${ethContext.ethPriceUSD}`}</Indicator>
              ) : (
                <Indicator redIcon />
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default withLayout(Admin);
