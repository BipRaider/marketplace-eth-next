import React, { FunctionComponent } from 'react';

import { Footer, Layout, Header } from '@components/main';

import { AppContextProvider, IAppContext } from '@context/app.context';
import { Web3Provider, IWeb3Context } from '@src/context/web3/web3.context';
import { EthProvider, IEthContext } from '@src/context/eth.context';
import { AuthProvider, CoursesProvider, ICoursesContext, GlobalAuth } from '@src/context';

/*** Wrapper for all components.*/
export const withAppLayout = <T extends Record<string, unknown> & IAppContext & IWeb3Context & GlobalAuth>(
  Component: FunctionComponent<T>,
) => {
  return function LayoutComponent(props: T): React.JSX.Element {
    return (
      <AppContextProvider {...props}>
        <AuthProvider {...props}>
          <Web3Provider {...props}>
            <Header className="relative" />
            <Component {...props} />
            <Footer className="relative" />
          </Web3Provider>
        </AuthProvider>
      </AppContextProvider>
    );
  };
};

type TUseProviders = {
  web3?: boolean;
  eth?: boolean;
  courses?: boolean;
};

/*** Wrapper for page components.*/
export const withLayout = <
  T extends Record<string, unknown> & IAppContext & IWeb3Context & IEthContext & ICoursesContext,
>(
  Component: FunctionComponent<T>,
  useProviders?: TUseProviders,
) => {
  return function LayoutComponent(props: T): React.JSX.Element {
    return (
      <Web3Provider useProvider={useProviders?.web3} {...props}>
        <EthProvider useProvider={useProviders?.eth} ethPriceUSD={props.ethPriceUSD}>
          <CoursesProvider useProvider={useProviders?.courses} {...props}>
            <Layout>
              <Component {...props} />
            </Layout>
          </CoursesProvider>
        </EthProvider>
      </Web3Provider>
    );
  };
};
