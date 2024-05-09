import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      // Assuming there is a 'level' and 'badges' field in the 'UserProfile' model
      const { userId } = req.query;

      // Validate the userId is provided
      if (!userId) {
        return res.status(400).json({ error: 'UserId query parameter is required' });
      }

      // Fetch the user's level and badges data from the database
      const userProfile = await prisma.userProfile.findUnique({
        where: {
          userId: userId,
        },
        select: {
          level: true,
          badges: true,
        },
      });

      // If the user profile doesn't exist, return an error
      if (!userProfile) {
        return res.status(404).json({ error: 'User profile not found' });
      }

      // Return the level and badges data
      res.status(200).json({
        level: userProfile.level,
        badges: userProfile.badges,
      });
    } catch (error) {
      // Handle any errors during the database query
      console.error('Request error', error);
      res.status(500).json({ error: 'Error fetching user level data' });
    }
  } else {
    // If the request method is not GET, return a 405 Method Not Allowed
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
