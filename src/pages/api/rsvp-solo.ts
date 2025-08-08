// src/pages/api/rsvp-solo.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

type SoloResponse = { ok: true; rsvpId: number } | { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SoloResponse>
) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' })

  const { names, email, phone, attendance, diet, message } = req.body as {
    names?: unknown[]
    email?: unknown
    phone?: unknown
    attendance?: unknown
    diet?: unknown
    message?: unknown
  }

  if (
    !Array.isArray(names) ||
    names.length !== 1 ||
    names.some(n => typeof n !== 'string') ||
    typeof email !== 'string' ||
    typeof phone !== 'string' ||
    typeof attendance !== 'string'
  ) {
    return res.status(400).json({ error: 'Please provide exactly one name, email, phone, and attendance.' })
  }

  const name = (names[0] as string).trim()
  if (!name) return res.status(400).json({ error: 'Name cannot be empty.' })

  try {
    const rsvp = await prisma.rSVP.create({
      data: {
        code: '', // remove if not in schema
        email: email.trim(),
        guests: name, // DB is string
        phone: phone,
        attendance: attendance as 'ceremony' | 'party' | 'both' | 'none',
        diet: typeof diet === 'string' ? diet.trim() : null,
        message: typeof message === 'string' ? message.trim() : null,
      },
    })
    return res.status(200).json({ ok: true, rsvpId: rsvp.id })
  } catch (err) {
    console.error('Prisma error on solo RSVP:', err)
    return res.status(500).json({ error: 'Failed to create RSVP.' })
  }
}
