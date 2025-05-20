// pages/api/test-supabase.ts (for Next.js/Vercel)
import { supabase } from '@/lib/supabaseClient'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, error } = await supabase.from('users').select('*')
  if (error) return res.status(500).json({ error })
  res.status(200).json(data)
}
