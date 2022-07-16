import type { NextPage } from 'next';
import Image from 'next/image';

import { signIn, signOut, useSession } from 'next-auth/react';

const NavBar: NextPage = () => {
    const { data: session } = useSession();
    return (
        <div className="flex flex-row">
            <p className="font-bold">QUIZZ</p>
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

export default NavBar;
