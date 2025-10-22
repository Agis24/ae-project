// src/pages/api/rsvp-solo.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type SoloOk = { ok: true; rsvpId: number; confirmationCode: string };
type SoloErr = { error: string };
type SoloResponse = SoloOk | SoloErr;

function normalizeEmail(email: string) {
  return (email || "").trim().toLowerCase();
}

function normalizePhone(raw: string) {
  const s = String(raw || "").replace(/[^\d+]/g, "");
  const withPlus = s.startsWith("+") ? s : `+${s}`;
  return withPlus.replace(/^\++/, "+");
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SoloResponse>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { names, email, phone, attendance, diet, message } = req.body as {
    names?: unknown[];
    email?: unknown;
    phone?: unknown;
    attendance?: unknown;
    diet?: unknown;
    message?: unknown;
  };

  if (
    !Array.isArray(names) ||
    names.length !== 1 ||
    names.some((n) => typeof n !== "string") ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof attendance !== "string"
  ) {
    return res.status(400).json({
      error:
        "Please provide exactly one name, plus a valid email, phone, and attendance.",
    });
  }

  const name = (names[0] as string).trim();
  if (!name) {
    return res.status(400).json({ error: "Name cannot be empty." });
  }

  const normEmail = normalizeEmail(email);
  const normPhone = normalizePhone(phone);

  try {
    const exists = await prisma.rSVP.count({
      where: {
        OR: [{ email: normEmail }, { phone: normPhone }],
      },
    });

    if (exists > 0) {
      return res
        .status(409)
        .json({ error: "We already received an RSVP with this email or phone." });
    }

    const confirmationCode =
      typeof crypto?.randomUUID === "function"
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2, 10);

    const rsvp = await prisma.rSVP.create({
      data: {
        code: confirmationCode,
        email: normEmail,
        guests: name,
        phone: normPhone,
        attendance,
        diet: typeof diet === "string" ? diet.trim() || null : null,
        message: typeof message === "string" ? message.trim() || null : null,
      },
    });

    return res.status(200).json({
      ok: true,
      rsvpId: rsvp.id,
      confirmationCode,
    });
  } catch (err) {
    console.error("Prisma error on solo RSVP:", err);
    return res.status(500).json({ error: "Failed to create RSVP." });
  }
}
