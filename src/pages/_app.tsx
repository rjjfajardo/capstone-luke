import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import { SWRConfig } from "swr";
import Layout from "@/components/templates/Layout";
import theme from "@/lib/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { swrConfig } from "@/lib/swr";

function App({
  Component,
  pageProps,
  session,
}: AppProps & { session: Session }) {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <CssBaseline />
          <SWRConfig value={swrConfig}>
            <SessionProvider session={session}>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </SessionProvider>
          </SWRConfig>
        </RecoilRoot>
      </ThemeProvider>
    </>
  );
}

export default App;

// This is a little hacky solution to prevent `const { page } = router.query` is undefined on first rendering.
// https://nextjs.org/docs/messages/empty-object-getInitialProps
// https://github.com/vercel/next.js/discussions/11484
App.getInitialProps = async () => ({});
