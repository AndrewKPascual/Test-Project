import { validateSession } from '@/config/api-validation';
import { getWorkspaces } from '@/prisma/services/workspace';

const handler = async (req, res) => {
  const { method } = req;

  try {
    if (method === 'GET') {
      const session = await validateSession(req, res);
      if (!session || !session.user) {
        return res.status(401).json({ error: 'Session not found' });
      }

      const workspaces = await getWorkspaces(session.user.userId, session.user.email);
      res.status(200).json({ data: { workspaces } });
    } else {
      res.status(405).json({ error: `${method} method unsupported` });
    }
  } catch (error) {
    console.error('Error caught in /api/workspaces:', error.message, 'Stack:', error.stack);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
};

export default handler;
