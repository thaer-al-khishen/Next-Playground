import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const {
        query: { id },
        method,
    } = req;

    await dbConnect();

    switch (method) {
        case 'GET':
                try {
                    const post = await Post.findById(id); // Find the required
                    if (!post) {
                        return res.status(404).json({ success: false, error: "Post not found" });
                    }
                    res.status(200).json({ success: true, data: post });
                } catch (error) {
                    res.status(400).json({ success: false, error: error });
                }
                break;

        case 'PATCH':
            try {
                const post = await Post.findByIdAndUpdate(id, req.body, {
                    new: true,
                    runValidators: true,
                });
                if (!post) {
                    return res.status(404).json({ success: false, error: "Post not found" });
                }
                res.status(200).json({ success: true, data: post });
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;

        case 'DELETE':
            try {
                const deletedPost = await Post.deleteOne({ _id: id });
                if (!deletedPost.deletedCount) {
                    return res.status(404).json({ success: false, error: "Post not found" });
                }
                res.status(204).end();
            } catch (error) {
                res.status(400).json({ success: false, error: error });
            }
            break;


        // Implement other methods (e.g., DELETE) here
        default:
            res.setHeader('Allow', ['PATCH']); // Add other allowed methods to the array
            res.status(405).end(`Method ${method} Not Allowed`);
    }

}
