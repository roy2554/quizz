import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
    return (
        <Html className="dark">
            <link href="http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.3.0/css/font-awesome.css" rel="stylesheet" type="text/css"></link>
            <Head />
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    );
}
