import App from 'next/app';
import Head from 'next/head';
import ErrorPage from 'next/error';
// import { useRouter } from "next/router";
import { DefaultSeo } from 'next-seo';
import { getStrapiMedia } from '../utils/media';
import { getGlobalData } from '../utils/api';
import '../styles/global.css';
// import { AppContextType } from '../next/dist/next-server/lib/utils';
import { AppContextType } from '../../node_modules/next/dist/next-server/lib/utils';
import { Router } from 'next/router';

const MyApp = ({ Component, pageProps }: any) => {
  // Extract the data we need
  const { global } = pageProps;
  if (global == null) {
    return <ErrorPage statusCode={404} />;
  }

  // console.log(pageProps, "page props");

  const { metadata } = global;

  return (
    <>
      {/* Favicon */}
      <Head>
        <link rel="shortcut icon" ref={getStrapiMedia(global.favicon.url)} />
      </Head>
      {/* Global site metadata */}
      <DefaultSeo
        titleTemplate={`%s | ${global.metaTitleSuffix}`}
        title="Page"
        description={metadata.metaDescription}
        openGraph={{
          //@ts-ignore
          images: Object.values(metadata.shareImage.formats).map((image) => {
            return {
              //@ts-ignore
              url: getStrapiMedia(image.url),
              //@ts-ignore
              width: image.width,
              //@ts-ignore
              height: image.height,
            };
          }),
        }}
        twitter={{
          cardType: metadata.twitterCardType,
          handle: metadata.twitterUsername,
        }}
      />
      {/* Display the content */}
      <Component {...pageProps} />
    </>
  );
};

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So [[...slug]] pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (appContext: AppContextType<Router>) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  // const globalLocale = await getGlobalData(appContext.router.locale);
  const globalLocale = await getGlobalData('en');

  // console.log(appProps, "appprops");
  // console.log(appContext, "appContext");

  return {
    ...appProps,
    pageProps: {
      global: globalLocale,
    },
  };
};

export default MyApp;
