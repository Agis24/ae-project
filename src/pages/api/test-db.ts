import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ rsvpCount: number } | { error: string }>
) {
  try {
    const count = await prisma.rSVP.count()
    res.status(200).json({ rsvpCount: count })
  } catch (error: unknown) {
    console.error('DB error:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
