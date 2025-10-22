import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

type PlusOneOk = { ok: true; created: number; confirmationCode: string };
type PlusOneErr = { error: string };
type PlusOneResponse = PlusOneOk | PlusOneErr;

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
  res: NextApiResponse<PlusOneResponse>
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

  // Basic validation
  if (
    !Array.isArray(names) ||
    names.some((n) => typeof n !== "string") ||
    typeof email !== "string" ||
    typeof phone !== "string" ||
    typeof attendance !== "string"
  ) {
    return res.status(400).json({
      error: "Please provide names, email, phone, and attendance.",
    });
  }

  const cleanNames = (names as string[]).map((n) => n.trim()).filter(Boolean);
  if (cleanNames.length === 0) {
    return res.status(400).json({ error: "At least one guest name is required." });
  }

  const normEmail = normalizeEmail(email);
  const normPhone = normalizePhone(phone);

  try {
    // Duplicate guard
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

    // Option 1: store all names in one row (recommended)
    // const guestString = cleanNames.join(", ");

    // const rsvp = await prisma.rSVP.create({
    //   data: {
    //     code: confirmationCode,
    //     email: normEmail,
    //     guests: guestString,
    //     phone: normPhone,
    //     attendance,
    //     diet: typeof diet === "string" ? diet.trim() || null : null,
    //     message: typeof message === "string" ? message.trim() || null : null,
    //   },
    // });

    // return res
    //   .status(200)
    //   .json({ ok: true, created: 1, confirmationCode });

    
    //📝 OR Option 2: if you really prefer separate rows per guest:
    
    const result = await prisma.rSVP.createMany({
      data: cleanNames.map(name => ({
        code: confirmationCode,
        email: normEmail,
        guests: name,
        phone: normPhone,
        attendance,
        diet: typeof diet === "string" ? diet.trim() || null : null,
        message: typeof message === "string" ? message.trim() || null : null,
      })),
      skipDuplicates: true,
    });
    
    return res.status(200).json({ ok: true, created: result.count, confirmationCode });
    
  } catch (err) {
    console.error("Prisma error on +1 RSVP:", err);
    return res.status(500).json({ error: "Failed to create RSVP records." });
  }
}
