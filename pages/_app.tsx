import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { SessionProvider } from 'next-auth/react';

import { ThemeProvider } from 'next-themes';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <ThemeProvider>
                    <Component {...pageProps} />
                </ThemeProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
