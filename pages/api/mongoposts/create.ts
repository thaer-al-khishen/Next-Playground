import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Post, { IPost } from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'POST') {
        try {
            const post = await Post.create(req.body as IPost); // Create a new post
            res.status(201).json({ success: true, data: post });
        } catch (error) {
            res.status(400).json({ success: false, error: error });
        }
    } else {
        // Handles any requests other than POST
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
