// src/components/WeddingInfoMobile.tsx
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, CalendarDays, Clock, Ship } from 'lucide-react'

type Props = {
  couple: string
  date: string
  time: string
  locationName: string
  mapsQuery: string
  transportNote?: string
}

export default function WeddingInfoMobile({
  couple,
  date,
  time,
  locationName,
  mapsQuery,
  transportNote = 'Small boats will take guests to Zogeria Beach.',
}: Props) {
  const [open, setOpen] = useState(false)
  const gmapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`

  return (
    <section className="w-full max-w-lg mx-auto">
      {/* Header card */}
      <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-md p-4">
        <h1 className="text-xl font-extrabold text-black text-center">{couple}</h1>

        <div className="mt-3 grid grid-cols-3 gap-2 text-sm text-gray-700">
          <div className="flex items-center justify-center gap-1">
            <CalendarDays className="w-4 h-4" />
            <span className="truncate">{date}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{time}</span>
          </div>
          <div className="flex items-center justify-center gap-1">
            <MapPin className="w-4 h-4" />
            <span className="truncate">Zogeria</span>
          </div>
        </div>

        {/* Location + Map */}
        <div className="mt-3 flex flex-col sm:flex-row items-center gap-2">
          <p className="text-center text-gray-700 text-sm">{locationName}</p>
          <a
            href={gmapsHref}
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto text-center bg-black hover:bg-grey text-white text-sm font-semibold px-3 py-2 rounded-lg"
          >
            Open in Google Maps
          </a>
        </div>
      </div>

      {/* Transport collapsible */}
      <div className="mt-3 bg-white/90 backdrop-blur-md rounded-2xl shadow-md">
        <button
          type="button"
          onClick={() => setOpen(v => !v)}
          className="w-full flex items-center justify-between px-4 py-3"
        >
          <div className="flex items-center gap-2">
            <Ship className="w-5 h-5 text-black" />
            <span className="font-semibold">Transportation</span>
          </div>
          <span className="text-sm text-gray-600">{open ? 'Hide' : 'Details'}</span>
        </button>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="px-4 overflow-hidden"
            >
              <div className="pb-4 text-sm text-gray-700 space-y-2">
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
            <div className="px-4 pb-3 text-sm text-gray-600">{transportNote}</div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
