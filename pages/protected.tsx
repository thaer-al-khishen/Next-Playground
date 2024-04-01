// pages/protected.tsx
import { getSession } from "next-auth/react";
import { GetServerSideProps } from "next";

export default function Protected() {
    return <div>This is a protected page</div>;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession({ req: context.req });

    if (!session) {
        return {
            redirect: {
                destination: '/auth/signin',
                permanent: false,
            },
        };
    }

    return {
        props: { session },
    };
};
