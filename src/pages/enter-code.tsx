import { FormEvent, useState } from 'react'
import { useRouter } from 'next/router'

export default function EnterCode() {
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    if (res.ok) {
      router.replace('/')
    } else {
      setError('Incorrect code')
    }
  }

  return (
    <main style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h1>Enter Passcode</h1>
      <form onSubmit={submit}>
        <input
          type="password"
          value={code}
          onChange={e => setCode(e.target.value)}
          placeholder="Your wedding code"
          style={{ width: '100%', padding: 8 }}
        />
        <button type="submit" style={{ marginTop: 10, padding: '8px 16px' }}>
          Submit
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </main>
  )
}