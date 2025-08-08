import { useState } from 'react'
import RSVPForm from '@/components/RSVPForm'
import WeddingInfoMobile from '@/components/WeddingInfoMobile'
import { motion } from 'framer-motion'

const EVENT = {
  title: 'Elisavet & Aristotelis – Wedding',
  location: 'Zogeria Beach, Spetses',
  // 19 Sep 2026, 13:00 local (Europe/Athens). End ~5 hours later
  start: new Date('2026-09-19T10:00:00Z'), // 13:00 EET/EEST ≈ 10:00Z depending on DST
  end:   new Date('2026-09-19T18:00:00Z'),
  transport: 'Small boats from Dapia to Zogeria (arrive 20–30 min early).',
}

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false)
  const [confirmation, setConfirmation] = useState<string | null>(null)
  const [guestNames, setGuestNames] = useState<string[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [email, setEmail] = useState<string>('')

  function downloadICS() {
  const pad = (n: number) => String(n).padStart(2, '0')
  const fmtUTC = (d: Date) =>
    `${d.getUTCFullYear()}${pad(d.getUTCMonth() + 1)}${pad(d.getUTCDate())}T${pad(d.getUTCHours())}${pad(d.getUTCMinutes())}${pad(d.getUTCSeconds())}Z`

  // If you wanted ~5 hours total, set end accordingly:
  // const start = new Date('2026-09-19T10:00:00Z') // 13:00 in Greece (UTC+3 in September)
  // const end   = new Date('2026-09-19T15:00:00Z') // 18:00 local
  const start = EVENT.start
  const end   = EVENT.end

  const escapeText = (s: string) =>
    s.replace(/\\/g, '\\\\')
     .replace(/\n/g, '\\n')
     .replace(/,/g, '\\,')
     .replace(/;/g, '\\;')

  const SUMMARY = escapeText(EVENT.title)
  const LOCATION = escapeText(EVENT.location)
  const DESCRIPTION = escapeText(EVENT.transport)

  const uid = (globalThis.crypto?.randomUUID?.() ?? (Math.random().toString(36).slice(2) + Date.now()))
  const now = new Date()

  // Use CRLF and NO leading spaces per iCalendar spec
  const ics =
    'BEGIN:VCALENDAR\r\n' +
    'VERSION:2.0\r\n' +
    'PRODID:-//AE Wedding//RSVP//EN\r\n' +
    'CALSCALE:GREGORIAN\r\n' +
    'METHOD:PUBLISH\r\n' +
    'BEGIN:VEVENT\r\n' +
    `UID:${uid}\r\n` +
    `DTSTAMP:${fmtUTC(now)}\r\n` +
    `DTSTART:${fmtUTC(start)}\r\n` +
    `DTEND:${fmtUTC(end)}\r\n` +
    `SUMMARY:${SUMMARY}\r\n` +
    `LOCATION:${LOCATION}\r\n` +
    `DESCRIPTION:${DESCRIPTION}\r\n` +
    'END:VEVENT\r\n' +
    'END:VCALENDAR\r\n'

  const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'wedding.ics'
  a.click()
  URL.revokeObjectURL(url)
}


  function copyDetails() {
    const namesLine = guestNames.join(' & ')
    const text =
      `${EVENT.title}
      Guest(s): ${namesLine}
      When: Sat, Sep 19, 2026 • 13:00
      Where: ${EVENT.location}
      Transport: ${EVENT.transport}

      Confirmation: ${confirmation ?? '-'}`
    navigator.clipboard.writeText(text).catch(() => {})
  }

  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-3 py-4">
      <WeddingInfoMobile
        couple="Elisavet & Aristotelis"
        date="Sat, Sep 19, 2026"
        time="1:00 PM"
        locationName={EVENT.location}
        mapsQuery={EVENT.location}
        dressCode='Beach formal – light fabrics, summer colors, comfortable shoes for sand'
      />

      <div className="mt-4 w-full max-w-lg">
        {!submitted ? (
          <RSVPForm
            title="RSVP"
            buttonText="Submit RSVP"
            onSubmit={async (names, emailValue, phone, { attendance, diet, message }) => {
              const res = await fetch('/api/rsvp-solo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  names,
                  email: emailValue,
                  phone,
                  attendance,
                  diet: diet.join(', '),
                  message,
                }),
              })
              if (!res.ok) {
                const { error } = await res.json()
                throw new Error(error)
              }
              const data = await res.json()
              setConfirmation(data.confirmationCode ?? null)
              setGuestNames(names)
              setEmail(emailValue)
              setSubmitted(true)
            }}
          />
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 border border-gray-200 rounded-lg p-6 shadow-md text-center space-y-3"
          >
            <h2 className="text-2xl font-bold text-gray-900">🎉 Thank you for RSVPing!</h2>
            {confirmation && (
              <p className="text-sm text-gray-700">
                Your confirmation code: <span className="font-mono font-semibold">{confirmation}</span>
              </p>
            )}
            <div className="flex flex-col sm:flex-row gap-2 mt-2">
              <button
                onClick={downloadICS}
                className="w-full bg-gray-900 hover:bg-black text-white px-4 py-2 rounded-lg"
              >
                Add to Calendar
              </button>
              <button
                onClick={copyDetails}
                className="w-full border border-gray-300 hover:bg-gray-100 text-gray-900 px-4 py-2 rounded-lg"
              >
                Copy Event Details
              </button>
            </div>
            <p className="text-xs text-gray-500">
              You can close this page—your RSVP was saved.
            </p>
          </motion.div>
        )}
      </div>
    </main>
  )
}