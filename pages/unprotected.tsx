// pages/unprotected.tsx
import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import {GetServerSideProps} from "next";

export default function UnprotectedPage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.replace('/'); // Redirect to home page if already logged in
        }
    }, [session, router]);

    // Optionally show loading state
    if (status === "loading") {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>Unprotected Page</h1>
            <p>This page is accessible without authentication.</p>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);

    if (session) {
        return {
            redirect: {
                destination: '/', // Assuming you want to redirect an authenticated user to home
                permanent: false,
            },
        };
    }

    return {
        props: {}, // Return empty props if there is no session
    };
}
