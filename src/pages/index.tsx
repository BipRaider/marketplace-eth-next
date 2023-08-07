import React from 'react';
import { GetStaticProps } from 'next/types';

import { withLayout } from '@components/main';
import { WalletBar, CurrentPrice, Hero } from '@components/higher';

interface Props extends Record<string, unknown> {}

function Home(): React.JSX.Element {
  return (
    <>
      <div>
        <Hero />
        <WalletBar />
        <CurrentPrice />
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
