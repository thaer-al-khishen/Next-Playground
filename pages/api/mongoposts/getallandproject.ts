import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../../lib/mongodb';
import Post from '../../../models/Post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await dbConnect();

    if (req.method === 'GET') {
        try {
            // Use MongoDB aggregation to project documents without the _id field
            const posts = await Post.aggregate([
                { $project: { _id: 0, __v: 0 } }, // Exclude the _id and __v fields
                { $limit: 2 } // Limit the result to 2 documents
            ]);

            res.status(200).json({ success: true, data: posts });
        } catch (error) {
            res.status(400).json({ success: false, error: error });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
