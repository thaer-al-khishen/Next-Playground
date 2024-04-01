import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            const post = await Post.findOne({}); // Find the first post
            if (!post) {
                return res.status(404).json({ success: false, error: "Post not found" });
            }
            res.status(200).json({ success: true, data: post });
        } catch (error) {
            res.status(400).json({ success: false, error: error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
