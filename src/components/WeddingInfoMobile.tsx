// src/components/WeddingInfoMobile.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CalendarDays, Clock } from 'lucide-react'

type Props = {
  couple: string
  date: string
  time: string
  locationName: string
  mapsQuery: string
  dressCode?: string
  transportNote?: string
}

export default function WeddingInfoMobile({
  couple,
  date,
  time,
  locationName,
  mapsQuery,
  dressCode,
  transportNote = 'Small boats will take guests to Zogeria Beach.',
}: Props) {
  const [open, setOpen] = useState(false)
  const gmapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`

    return (
      <section className="w-full max-w-lg mx-auto">
        {/* Couple Name */}
        <div className="bg-white rounded-2xl shadow-md p-6 text-center">
          <h1 className="font-serif text-2xl tracking-wide text-black">{couple}</h1>
          <div className="mt-4 flex flex-col sm:flex-row sm:justify-center sm:items-center gap-3 text-gray-700 text-sm">
            <div className="flex items-center gap-1">
              <CalendarDays className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{time}</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              <span>{locationName}</span>
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-serif text-xl tracking-wide text-center">Details</h2>
          <div className="mx-auto my-5 h-px w-10 bg-gray-300" />

          <p className="text-sm text-gray-700 text-center mb-4">{locationName}</p>
          <a
            href={gmapsHref}
            target="_blank"
            rel="noreferrer"
            className="block w-full text-center bg-black hover:bg-neutral-900 text-white text-sm font-medium px-3 py-2 rounded-lg"
          >
            Open in Google Maps
          </a>
        </div>

        {/* Dress Code */}
        {dressCode && (
          <div className="mt-6 bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-serif text-xl tracking-wide text-center">Dress Code</h2>
            <div className="mx-auto my-5 h-px w-10 bg-gray-300" />
            <p className="text-sm text-gray-700 text-center">{dressCode}</p>
          </div>
        )}

        {/* Transportation */}
        <div className="mt-6 bg-white rounded-2xl shadow-md">
          <button
            type="button"
            onClick={() => setOpen(v => !v)}
            className="w-full flex items-center justify-between px-6 py-4"
          >
            <h2 className="font-serif text-xl tracking-wide">Transportation</h2>
            <span className="text-sm text-gray-600">{open ? 'Hide' : 'Details'}</span>
          </button>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="px-6 overflow-hidden"
              >
                <div className="pb-4 text-sm text-gray-700 space-y-3">
                  <p>Small boats will ferry guests to <strong>Zogeria Beach</strong>. Please arrive at the dock 20–30 minutes early.</p>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Pickup Point: Dapia port (main dock)</li>
                    <li>First boat: 5:15 PM • Last boat: 5:50 PM</li>
                    <li>Return boats start after the party</li>
                  </ul>
                  <p className="text-xs text-gray-500">{transportNote}</p>
                </div>
              </motion.div>
            ) : (
              <div className="px-6 pb-4 text-sm text-gray-600">{transportNote}</div>
            )}
          </AnimatePresence>
        </div>
      </section>
    )

}
