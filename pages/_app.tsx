import type { AppProps } from 'next/app';
import {SessionProvider} from "next-auth/react";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { SWRConfig } from 'swr';
import { lightTheme } from '@/themes';
import { UiProvider } from '@/context/ui';
import { AuthProvider, CartProvider } from '@/context';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <PayPalScriptProvider options={{clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT || ''}}>
          <SWRConfig 
            value={{
              fetcher: (resource, init) => fetch(resource, init).then(res => res.json())
            }}
        >
          <AuthProvider>
            <CartProvider>
              <UiProvider>
                <ThemeProvider theme={lightTheme}>
                  <CssBaseline/>
                  <Component {...pageProps} />
                </ThemeProvider>
              </UiProvider>
            </CartProvider>
          </AuthProvider>
        </SWRConfig>
      </PayPalScriptProvider>
    </SessionProvider>
  )
  
  
}
