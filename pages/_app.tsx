import '../styles/globals.css';

import type { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from 'next-themes';

import NavBar from '../components/NavBar';

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <SessionProvider session={pageProps.session}>
                <ThemeProvider>
                    <div className="app">
                        <NavBar />
                        <Component {...pageProps} />
                    </div>
                </ThemeProvider>
            </SessionProvider>
        </>
    );
}

export default MyApp;
