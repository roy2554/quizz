import type { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';

import GET from './get';
import POST from './post';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req });

    if (!session) {
        res.status(401).json({ message: 'Not logged in' });
        return;
    }

    if (req.method === 'GET') GET(session, req, res);
    else if (req.method === 'POST') POST(session, req, res);
}
