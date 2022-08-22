import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import '../styles/images.css'
import { NextSeo } from 'next-seo';

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <ChakraProvider>
    <NextSeo title='Aryan Jain' titleTemplate="Aryan Jain"
        defaultTitle="Aryan Jain"
        description="Passionate about AI, Robotics, and Entrepreneurship. Experienced in Cloud and Web Development. Always building something new."
        canonical="https://www.aryanj.tech/"/>
    <Component {...pageProps} />
  </ChakraProvider>
  )
}

export default MyApp
