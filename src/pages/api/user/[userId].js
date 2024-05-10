import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const {
    query: { userId },
    method,
  } = req;

  switch (method) {
    case 'GET':
      try {
        const user = await prisma.user.findUnique({
          where: { id: userId },
          include: { userProfile: true },
        });

        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json(user);
      } catch (error) {
        console.error('Request error', error);
        res.status(500).json({ error: 'Error fetching user data', message: error.message });
      }
      break;

    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
