import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

import { Layout } from "../components/common/layout";

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp;
