import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import Layout from '../components/Layout';
import AuthProvider from '../context/authContext';
import RouterGuard from '../components/RouterGuard';

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <AuthProvider>
      <Layout>
        <RouterGuard>
          <Component {...pageProps} />
        </RouterGuard>
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
