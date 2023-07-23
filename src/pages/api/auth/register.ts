import { NextApiRequest, NextApiResponse } from 'next/types';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });
  try {
    const user = await prisma.contact.create({ data: req.body });
    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
