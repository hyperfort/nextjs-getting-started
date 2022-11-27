import "../styles/globals.css";

import { SessionProvider } from "next-auth/react";

import { Layout } from "../components/common/layout";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      {router.pathname === "/login" ? (
        <Component {...pageProps} />
      ) : (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      )}
    </SessionProvider>
  );
}

export default MyApp;
