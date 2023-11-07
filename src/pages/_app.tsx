// import "@fontsource/roboto/400.css";
// import "@fontsource/roboto/500.css";
// import "@fontsource/roboto/700.css";

import { ThemeProvider } from "@mui/material/styles";
import { AppProps } from "next/app";
import Head from "next/head";
import { RecoilRoot } from "recoil";

import Snackbar from "@/components/parts/Snackbar";
import Layout from "@/components/templates/Layout";
import { swrConfig } from "@/lib/swr";
import theme from "@/lib/theme";
import { store } from "@/store/store";
import CssBaseline from "@mui/material/CssBaseline";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Provider } from "react-redux";
import { SWRConfig } from "swr";

import "@uploadthing/react/styles.css";

function App({
  Component,
  pageProps,
  session,
}: AppProps & { session: Session }) {
  return (
    <Provider store={store}>
      <Head>
        <title>BBCS Data Systems</title>
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
        <Snackbar />
      </ThemeProvider>
    </Provider>
  );
}

export default App;

// This is a little hacky solution to prevent `const { page } = router.query` is undefined on first rendering.
// https://nextjs.org/docs/messages/empty-object-getInitialProps
// https://github.com/vercel/next.js/discussions/11484
App.getInitialProps = async () => ({});
