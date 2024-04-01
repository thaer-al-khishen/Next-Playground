// pages/auth/error.tsx
import {signIn, useSession} from "next-auth/react";
import { useRouter } from "next/router";

export default function ErrorPage() {
    const router = useRouter();
    const { error } = router.query;

    const getErrorMessage = () => {
        switch (error) {
            case "CredentialsSignin":
                return "The email or password you entered is incorrect.";
            case "Configuration":
                return "There seems to be a configuration issue.";
            // Add more cases as needed for different error types
            default:
                return "An unexpected error occurred.";
        }
    };

    return (
        <div>
            <h2>An error occurred</h2>
            <p>{getErrorMessage()}</p>
            <button onClick={() => signIn()}>Try signing in again</button>
        </div>
    );
}
