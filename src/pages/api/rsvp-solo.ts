import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type SoloResponse = { ok: true; rsvpId: number } | { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SoloResponse>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email } = req.body as {
    name?: unknown
    email?: unknown
  }

  if (typeof name !== 'string' || typeof email !== 'string') {
    return res
      .status(400)
      .json({ error: 'Please provide your name and email.' })
  }

  try {
    const rsvp = await prisma.rSVP.create({
      data: {
        code: '',               // no code anymore
        email: email.trim(),
        guests: [name.trim()],
      },
    })
    return res.status(200).json({ ok: true, rsvpId: rsvp.id })
  } catch (err: unknown) {
    console.error('Prisma error on solo RSVP:', err)
    return res.status(500).json({ error: 'Failed to create RSVP.' })
  }
}
