// pages/api/validate-plusone.ts
import type { NextApiRequest, NextApiResponse } from 'next'

// Example +1 codes
const PLUSONE_CODES = new Set([
  'PLUSONE1',
  'GUEST2025',
])

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { code, guestName } = req.body as { code?: string; guestName?: string }

  if (!code || !guestName) {
    return res.status(400).json({ error: 'Missing code or guest name.' })
  }

  if (!PLUSONE_CODES.has(code.trim().toUpperCase())) {
    return res.status(400).json({ error: 'Invalid code or guest name.' })
  }

  // You could also save the guestName to a DB here.

  return res.status(200).json({ ok: true })
}
