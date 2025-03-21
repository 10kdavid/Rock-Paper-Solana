import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { WalletProvider } from '@/contexts/WalletContext';
import Layout from '@/components/Layout';
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Rock Paper Solana - Blockchain Gaming</title>
        <meta name="description" content="Play Rock Paper Scissors on the Solana blockchain" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <WalletProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </WalletProvider>
    </>
  );
} 