// pages/api/auth/register.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export default async function register(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    await dbConnect();

    const { email, password } = req.body;

    try {
        // Check if user already exists
        if (await User.findOne({ email })) {
            return res.status(409).json({ message: 'User already exists' }); // Conflict
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const user = new User({
            email,
            password: hashedPassword,
        });
        await user.save();

        // Handle post-registration (e.g., auto-login or send confirmation email)

        return res.status(201).json({ message: 'User created successfully' }); // Created
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' }); // Internal Server Error
    }

}
