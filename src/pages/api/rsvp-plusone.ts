// src/pages/api/rsvp-plusone.ts

import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

type Response = { ok: true; created: number } | { error: string }

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { names, email } = req.body as {
    names?: unknown
    email?: unknown
  }

  if (
    !Array.isArray(names) ||
    names.some(n => typeof n !== 'string') ||
    typeof email !== 'string'
  ) {
    return res
      .status(400)
      .json({ error: 'Please provide at least your name and your email.' })
  }

  // Clean up names
  const cleanNames = (names as string[])
    .map(n => n.trim())
    .filter(n => n.length > 0)

  if (cleanNames.length === 0) {
    return res
      .status(400)
      .json({ error: 'At least one name is required.' })
  }

  try {
    // Create one row per guest
    const records = cleanNames.map(name => ({
      code: '',        // if you still have a code field
      email: email.trim(),
      guests: [name],
    }))

    // Bulk insert
    const result = await prisma.rSVP.createMany({
      data: records,
      skipDuplicates: true, // optional
    })

    // result.count is number of inserted rows
    return res.status(200).json({ ok: true, created: result.count })
  } catch (err: unknown) {
    console.error('Prisma error on +1 RSVP:', err)
    return res.status(500).json({ error: 'Failed to create RSVP records.' })
  }
}
 