import { NextApiRequest, NextApiResponse } from 'next/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  try {
    res.status(200);
  } catch (err) {
    res.status(400).json({ message: 'Something went wrong' });
  }
}
