// pages/api/auth/[...nextauth].ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import dbConnect from '@/lib/mongodb';
import bcrypt from "bcryptjs";
import User from "@/models/User";


export default NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                await dbConnect();
                if (!credentials) return null;

                console.log("Has credentials")

                const user = await User.findOne({ email: credentials.email }).exec();
                if (user && bcrypt.compareSync(credentials.password, user.password)) {
                    // Map MongoDB document to User type, converting _id to string.
                    console.log("Found user")

                    return {
                        id: user._id.toString(),
                        email: user.email,
                        // Include other fields as needed, omitting the password for security.
                    };
                }

                console.log("No user found")

                return null;
            }
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: '/auth/signin',  // Custom sign-in page
        error: '/auth/error' // Error page
    }
});
