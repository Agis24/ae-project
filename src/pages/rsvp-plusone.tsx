// src/pages/rsvp-plusone.tsx
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function RSVPPlusOne() {
  const [you, setYou]         = useState('')
  const [plusOne, setPlusOne] = useState('')
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)

    // build an array of the two names, filter out any empty string
    const names = [you.trim(), plusOne.trim()].filter(n => n.length > 0)

    const res = await fetch('/api/rsvp-plusone', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ names, email: email.trim() }),
    })

    setLoading(false)
    if (res.ok) {
      router.push('/thank-you-plusone')
    } else {
      const { error: msg } = await res.json()
      setError(msg || 'Submission failed.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">
          RSVP (+1)
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={you}
            onChange={e => setYou(e.target.value)}
            placeholder="Your Name"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          <input
            type="text"
            value={plusOne}
            onChange={e => setPlusOne(e.target.value)}
            placeholder="Guest Name (optional)"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            placeholder="Your Email"
            required
            className="w-full px-3 py-2 border rounded-lg focus:outline-none"
          />
          {error && <p className="text-red-500">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg"
          >
            {loading ? 'Submitting…' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </main>
  )
}