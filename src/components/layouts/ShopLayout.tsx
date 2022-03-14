import Head from 'next/head';
import { FC } from 'react';
import { Navbar } from '../ui';

type ShopLayoutProps = {
  title: string;
  description: string;
  imageFullUrl: string;
};

export const ShopLayout: FC<ShopLayoutProps> = ({ description, imageFullUrl, title, children }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta httpEquiv='Content-Type' content='text/html;charset=UTF-8' />
        <meta name='description' content={description} />
        <meta name='keywords' content='' />
        <meta property='og:title' content={title} />
        <meta property='og:description' content={description} />
        <meta property='og:image' content={imageFullUrl} />
      </Head>
      <nav>
        <Navbar />
      </nav>
      <main style={{ margin: '80px auto', maxWidth: '1440px', padding: '0px 30px' }}>{children}</main>
      <footer></footer>
    </>
  );
};
