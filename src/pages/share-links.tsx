import { useEffect, useState } from 'react'

export default function ShareLinks() {
  const [origin, setOrigin] = useState<string>()

  // grab the current site origin (e.g. https://your-domain.com)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin)
    }
  }, [])

  if (!origin) return null

  const solo = `${origin}/rsvp`
  const plus = `${origin}/rsvp-plusone`

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-lg w-full space-y-6">
        <h1 className="text-2xl font-bold">Share these RSVP links</h1>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RSVP (no +1)
          </label>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={solo}
              className="flex-grow px-3 py-2 border rounded-l focus:outline-none"
              onFocus={e => e.currentTarget.select()}
            />
            <button
              onClick={() => navigator.clipboard.writeText(solo)}
              className="px-4 bg-gray-100 border-l rounded-r hover:bg-gray-200 transition"
            >
              Copy
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            RSVP (+1)
          </label>
          <div className="flex">
            <input
              type="text"
              readOnly
              value={plus}
              className="flex-grow px-3 py-2 border rounded-l focus:outline-none"
              onFocus={e => e.currentTarget.select()}
            />
            <button
              onClick={() => navigator.clipboard.writeText(plus)}
              className="px-4 bg-gray-100 border-l rounded-r hover:bg-gray-200 transition"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
