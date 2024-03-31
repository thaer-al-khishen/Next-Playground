// pages/api/users.ts
import type { NextApiRequest, NextApiResponse } from 'next';

//Call with http://localhost:3000/api/users
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Failed to fetch data' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
