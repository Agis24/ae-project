import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function RSVP() {
  const [name, setName]       = useState('')
  const [email, setEmail]     = useState('')
  const [error, setError]     = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(''); setLoading(true)

    const res = await fetch('/api/rsvp-solo', {
      method: 'POST',
      headers: { 'Content-Type':'application/json' },
      body: JSON.stringify({ name, email }),
    })

    setLoading(false)
    if (res.ok) {
      router.push('/thank-you')
    } else {
      const { error: msg } = await res.json()
      setError(msg || 'Submission failed.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">RSVP</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="Your Name"
            required
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
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            {loading ? 'Submitting…' : 'Submit RSVP'}
          </button>
        </form>
      </div>
    </main>
  )
}
