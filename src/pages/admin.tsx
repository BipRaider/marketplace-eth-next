import { Button } from '@src/components/common';
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
              {appContext.isLoading ? (
                <span className="text-red-600">Loading...</span>
              ) : (
                <span className="text-lime-600">ok</span>
              )}
            </li>
          </ul>
        </div>

        <div className="px-8 bg-gray-100 md:col-span-2 h-full border-b border-cyan-900">
          <h1>Web3</h1>
          <div className="px-2 border-b border-cyan-500">
            <div className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
              Loading Web3:
              {web3Context.isLoading ? (
                <span className="text-red-600">Loading...</span>
              ) : (
                <span className="text-lime-600">ok</span>
              )}
            </div>
          </div>
          <div className="px-2 border-b border-cyan-500">
            <Button variant={'white'} size={'sm'} onClick={web3Context.provider.loadProvider}>
              Reload Provider
            </Button>
            <ul>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                <span className="">Loading:</span>
                {web3Context.provider.isLoading ? (
                  <span className="text-red-600">Loading...</span>
                ) : (
                  <span className="text-lime-600">ok</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.provider.error ? (
                  <span className="text-red-600">{web3Context.provider.error}</span>
                ) : (
                  <span className="text-lime-600">{`${web3Context.provider.error}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Provider:
                {web3Context.provider.provider ? (
                  <span className="text-lime-600">Found</span>
                ) : (
                  <span className="text-red-600">{'Not found'}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Name:
                {web3Context.provider.provider && web3Context.provider.provider.isMetaMask ? (
                  <span className="text-lime-600">{'MetaMask'}</span>
                ) : (
                  <span className="text-red-600">{'unknown'}</span>
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
                {web3Context.web3.isLoading ? (
                  <span className="text-red-600">Loading...</span>
                ) : (
                  <span className="text-lime-600">ok</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.web3.error ? (
                  <span className="text-red-600">{web3Context.web3.error}</span>
                ) : (
                  <span className="text-lime-600">{`${web3Context.web3.error}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Provider:
                {web3Context.web3.web3 ? (
                  <span className="text-lime-600">Found</span>
                ) : (
                  <span className="text-red-600">{'Not found'}</span>
                )}
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
                {web3Context.contract.isLoading ? (
                  <span className="text-red-600">Loading...</span>
                ) : (
                  <span className="text-lime-600">ok</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.contract.error ? (
                  <span className="text-red-600">{web3Context.contract.error}</span>
                ) : (
                  <span className="text-lime-600">{`${web3Context.contract.error}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Provider:
                {web3Context.contract.contract ? (
                  <span className="text-lime-600">Found</span>
                ) : (
                  <span className="text-red-600">{'Not found'}</span>
                )}
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
                {web3Context.account.isLoading ? (
                  <span className="text-red-600">Loading...</span>
                ) : (
                  <span className="text-lime-600">ok</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Error:
                {web3Context.provider.error ? (
                  <span className="text-red-600">{web3Context.account.error}</span>
                ) : (
                  <span className="text-lime-600">{`${web3Context.account.error}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Admin:
                {web3Context.account.isAdmin ? (
                  <span className="text-lime-600">{`${web3Context.account.isAdmin}`}</span>
                ) : (
                  <span className="text-red-600">{`${web3Context.account.isAdmin}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Network:
                {web3Context.account.chainId ? (
                  <span className="text-lime-600">{`${web3Context.account.chainId}`}</span>
                ) : (
                  <span className="text-red-600">{`${web3Context.account.chainId}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Address use:
                {web3Context.account.address ? (
                  <span className="text-lime-600">{`${web3Context.account.address}`}</span>
                ) : (
                  <span className="text-red-600">{`${web3Context.account.address}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }}>
                Address list:
                <ul>
                  {web3Context.account.addresses &&
                    web3Context.account.addresses.map(address => {
                      return (
                        <li className="grid gap-4" style={{ gridTemplateColumns: '100px 1fr' }} key={address}>
                          <span className="text-lime-600">{`${address}`}</span>
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
                {web3Context.network.isLoading ? (
                  <span className="text-red-600">Loading...</span>
                ) : (
                  <span className="text-lime-600">ok</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Error:
                {web3Context.network.error ? (
                  <span className="text-red-600">{web3Context.network.error}</span>
                ) : (
                  <span className="text-lime-600">{`${web3Context.network.error}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Is support:
                {web3Context.network.isSupported ? (
                  <span className="text-lime-600">{`${web3Context.network.isSupported}`}</span>
                ) : (
                  <span className="text-red-600">{`${web3Context.network.isSupported}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Network now:
                {web3Context.network.network ? (
                  <span className="text-lime-600">{`${web3Context.network.network}`}</span>
                ) : (
                  <span className="text-red-600">{`${web3Context.network.network}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Network target:
                {web3Context.network.target ? (
                  <span className="text-lime-600">{`${web3Context.network.target}`}</span>
                ) : (
                  <span className="text-red-600">{`${web3Context.network.target}`}</span>
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
                {web3Context.balance.isLoading ? (
                  <span className="text-red-600">Loading...</span>
                ) : (
                  <span className="text-lime-600">ok</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Error:
                {web3Context.balance.error ? (
                  <span className="text-red-600">{web3Context.balance.error}</span>
                ) : (
                  <span className="text-lime-600">{`${web3Context.balance.error}`}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Address:
                {!web3Context.balance.account ? (
                  <span className="text-red-600">not found</span>
                ) : (
                  <span className="text-lime-600">{web3Context.balance.account}</span>
                )}
              </li>
              <li className="grid gap-4" style={{ gridTemplateColumns: '120px 1fr' }}>
                Balance:
                {web3Context.balance.balance ? (
                  <span className="text-lime-600">{`${web3Context.balance.balance}`}</span>
                ) : (
                  <span className="text-red-600">{`${web3Context.balance.balance}`}</span>
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
                <span className="text-lime-600">{`${ethContext.ethPriceUSD}`}</span>
              ) : (
                <span className="text-red-600">{`not found`}</span>
              )}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default withLayout(Admin);
