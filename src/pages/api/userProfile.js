import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Extract data from request body
    const { userId, healthGoals, dietaryPreferences } = req.body;

    try {
      // Validate data (basic example, more validation can be added)
      if (!userId) {
        return res.status(400).json({ error: 'UserId is required' });
      }

      // Check if user exists
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });

      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }

      // Create new user profile in the database
      const userProfile = await prisma.userProfile.create({
        data: {
          user: {
            connect: { id: userId },
          },
          healthGoals,
          dietaryPreferences,
        },
      });

      // Send successful response
      res.status(200).json({ userProfile });
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error during profile creation:', error);

      // Handle errors
      res.status(500).json({ error: error.message });
    }
  } else {
    // Handle any other HTTP methods
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
