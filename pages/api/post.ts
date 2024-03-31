// pages/api/post.ts
import type { NextApiRequest, NextApiResponse } from 'next';

type Data = {
    message: string;
    data?: any;
}

//Call with http://localhost:3000/api/post
export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    if (req.method === 'GET') {
        res.status(200).json({ message: 'This is a GET request' });
    } else if (req.method === 'POST') {
        res.status(200).json({ message: 'This is a POST request', data: req.body });
    } else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
