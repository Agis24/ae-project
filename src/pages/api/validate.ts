import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end()

  const { code } = req.body
  if (code === process.env.PASSCODE) {
    res.setHeader('Set-Cookie', `passcode=${code}; Path=/; HttpOnly; Max-Age=86400; SameSite=Lax`)
    return res.status(200).json({ ok: true })
  }
  return res.status(401).json({ ok: false })
}