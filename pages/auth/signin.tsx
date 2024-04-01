// pages/auth/signin.tsx
import { getCsrfToken, useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface SignInProps {
    csrfToken: string | undefined;
}

export default function SignIn({ csrfToken }: SignInProps) {
    const { data: session } = useSession();
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (session) {
            router.replace('/'); // Redirect to the home page or dashboard if already logged in
        }

        // Check for error query parameters and set error message accordingly
        if (router.query.error) {
            const error = router.query.error;
            switch(error) {
                case 'CredentialsSignin':
                    setErrorMessage('Invalid credentials. Please try again.');
                    break;
                // Handle other cases as needed
                default:
                    setErrorMessage('An error occurred. Please try again.');
            }
        }
    }, [session, router]);

    return (
        <div>
            {errorMessage && <p>{errorMessage}</p>}
            <form method="post" action="/api/auth/callback/credentials">
                <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
                <label>
                    Email:
                    <input name="email" type="email" />
                </label>
                <label>
                    Password:
                    <input name="password" type="password" />
                </label>
                <button type="submit">Sign in</button>
            </form>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    return {
        props: {
            csrfToken: await getCsrfToken(context),
        },
    };
};
