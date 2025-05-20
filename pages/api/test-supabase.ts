import { supabase } from '@/lib/supabaseClient';
import type { NextApiRequest, NextApiResponse } from 'next';

// Define type for the users table (adjust based on your schema)
interface User {
  id: string;
  [key: string]: any; // Flexible for additional fields
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<User[] | { error: string }>) {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(data);
  } catch (err) {
    console.error('Unexpected error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}