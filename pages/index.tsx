import type { NextPage } from 'next';
import Image from 'next/image';

import { signIn, signOut, useSession } from 'next-auth/react';

const Home: NextPage = () => {
    const { data: session } = useSession();
    return (
        <div className="">
            <div className="head">
                <meta charSet="utf-8" />
                <meta name="og:title" content="Home" />
                <meta name="og:description" content="quizz home page" />
                <meta name="og:type" content="website" />

                <title>QUIZZ</title>
            </div>
            <p>QUIZZ</p>
            <p>application for</p>
        </div>
    );
};

export default Home;
