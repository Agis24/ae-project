// ValidateInvitationCode (no write)
import type { NextApiRequest, NextApiResponse } from 'next'

const SOLO_CODES = new Set(['ABC123','XYZ789','SOLO2025'])

type ValidateResp = { valid: true } | { valid: false; error: string }

export default function handler(
  req: NextApiRequest, 
  res: NextApiResponse<ValidateResp>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ valid: false, error: 'Method not allowed' })
  }
  const { code } = req.body as { code?: unknown }
  if (typeof code !== 'string') {
    return res.status(400).json({ valid: false, error: 'No code provided' })
  }
  const canon = code.trim().toUpperCase()
  if (!SOLO_CODES.has(canon)) {
    return res.status(400).json({ valid: false, error: 'Invalid code' })
  }
  return res.status(200).json({ valid: true })
}

