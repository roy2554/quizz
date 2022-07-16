import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import { Session } from 'next-auth';

const GET = async (session: Session, req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();

    if (!session.user.email || typeof session.user.email !== 'string') {
        res.status(401).json({ message: 'Not logged in' });
        prisma.$disconnect();
    }

    const user = await prisma.user.findUnique({
        where: {
            email: session.user.email!,
        },
    });

    res.status(200).json({ message: user });

    prisma.$disconnect();
};

export default GET;
