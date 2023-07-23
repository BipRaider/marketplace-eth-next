import React from 'react';
import { GetStaticProps } from 'next/types';

import { withLayout } from '@components/main';
import { WalletBar, BreadCrumbs, CurrentPrice, Hero, OrderInfo } from '@components/higher';

interface Props extends Record<string, unknown> {}

function Home(): React.JSX.Element {
  return (
    <>
      <div>
        <Hero />
        <BreadCrumbs />
        <WalletBar />
        <CurrentPrice />
        <OrderInfo />
      </div>
    </>
  );
}

export default withLayout(Home, { courses: false });

export const getStaticProps: GetStaticProps<Props> = () => {
  return {
    props: {},
  };
};
