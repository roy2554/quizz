import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, User } from '@prisma/client';
import { Session } from 'next-auth';

interface cardsInterface {
    question: string;
    answer: string;
}

const POST = async (session: Session, req: NextApiRequest, res: NextApiResponse) => {
    const prisma = new PrismaClient();
    const { title, description, cards } = req.body;

    if (typeof title !== 'string' || !Array.isArray(cards)) {
        res.status(400).json({ message: 'type incorrect error' });
        prisma.$disconnect();
        return;
    }

    if (!title || !cards) {
        res.status(400).json({ message: 'Missing required fields' });
        prisma.$disconnect();
        return;
    }

    if (description) {
        if (typeof description !== 'string') {
            res.status(400).json({ message: 'type incorrect error' });
            prisma.$disconnect();
            return;
        }
    }

    try {
        if (!session.user.email) {
            res.status(401).json({ message: 'Not logged in' });
            prisma.$disconnect();
            return;
        }

        const user = await prisma.user.findUnique({
            where: {
                email: session.user.email!,
            },
        });

        if (!user) {
            res.status(401).json({ message: 'Not logged in' });
            prisma.$disconnect();
            return;
        }

        const set = await prisma.set.create({
            data: {
                name: title as string,
                description: description as string,
                authorId: user!.id,
            },
        });

        for (const card of cards!) {
            // @ts-ignore
            const eCard = card as cardsInterface;
            await prisma.card.create({
                data: {
                    setId: set.id,
                    question: eCard.question as string,
                    answer: eCard.answer as string,
                },
            });
        }

        res.status(200).json({ status: true, message: 'set created successfully' });
        prisma.$disconnect();
        return;
    } catch (e) {
        res.status(500).json({ status: false, message: 'An Error has occured', error: e });
        prisma.$disconnect();
        return;
    }
};

export default POST;
