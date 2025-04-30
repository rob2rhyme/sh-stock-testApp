import { NextApiRequest, NextApiResponse } from 'next';
import { ProductCategory } from '../../types';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const data: Record<string, ProductCategory> = req.body;
      
      // In a real application, you would save the data to a database here
      // For this example, we'll just log it and return success
      console.log('Received data to save:', data);
      
      res.status(200).json({ success: true });
    } catch (error) {
      console.error('Error saving data:', error);
      res.status(500).json({ success: false, error: 'Failed to save data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}