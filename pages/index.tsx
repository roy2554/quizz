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
            <Image src="/quizz.svg" alt="quizz" width={200} height={200} />
            <p
                onClick={() => {
                    signIn('google');
                }}
            >
                AUTH
            </p>
            {session ? (
                <div>
                    <p>{session.user.name}</p>
                    <p
                        onClick={() => {
                            signOut();
                        }}
                    >
                        sign out
                    </p>
                </div>
            ) : (
                <div>
                    <p>not authorized</p>
                </div>
            )}
        </div>
    );
};

export default Home;
