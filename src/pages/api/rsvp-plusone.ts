// src/pages/api/rsvp-plusone.ts
import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, Prisma } from '@prisma/client'
const prisma = new PrismaClient()

type PlusOneResponse = { ok: true; created: number } | { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PlusOneResponse>
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
    names.some(n => typeof n !== 'string') ||
    typeof email !== 'string' ||
    typeof phone !== 'string' ||
    typeof attendance !== 'string'
  ) {
    return res.status(400).json({ error: 'Please provide names, email, phone, and attendance.' })
  }

  const cleanNames = (names as string[]).map(n => n.trim()).filter(Boolean)
  if (cleanNames.length === 0) {
    return res.status(400).json({ error: 'At least one guest name is required.' })
  }

  try {
    const records: Prisma.RSVPCreateManyInput[] = cleanNames.map(name => ({
      code: '', // remove if not in schema
      email: (email as string).trim(),
      guests: name, // DB is string
      phone: phone,
      attendance: attendance as 'ceremony' | 'party' | 'both' | 'none',
      diet: typeof diet === 'string' ? (diet as string).trim() : null,
      message: typeof message === 'string' ? (message as string).trim() : null,
    }))

    const result = await prisma.rSVP.createMany({
      data: records,
      skipDuplicates: true,
    })

    return res.status(200).json({ ok: true, created: result.count })
  } catch (err) {
    console.error('Prisma error on +1 RSVP:', err)
    return res.status(500).json({ error: 'Failed to create RSVP records.' })
  }
}
