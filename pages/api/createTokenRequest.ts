import { NextApiRequest, NextApiResponse } from 'next';
import { Rest } from 'ably';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const ably = new Rest('xtpzMw.xQ96UQ:Myc10hW76q9vHN1s6TjIaM5T4OYvgYRRafTLjQ5aOgs');
    const tokenRequestData = await ably.auth.createTokenRequest({ clientId: 'uniqueClientId' });
    res.status(200).json(tokenRequestData);
}
