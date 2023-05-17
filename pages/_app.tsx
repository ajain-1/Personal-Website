import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "../styles/images.css";
import { NextSeo } from "next-seo";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      {/* <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head> */}
      {/* <NextSeo title="Aryan Jain - Calabasas High School" titleTemplate="Aryan Jain" defaultTitle="Aryan Jain - Calabasas High School" description="Passionate about AI, Robotics, and Entrepreneurship. Experienced in Cloud and Web Development. Always building something new." canonical="https://www.aryanj.tech/" /> */}
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

// write a function to determine if a number is prime

export default MyApp;
