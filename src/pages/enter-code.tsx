import { FormEvent, ReactNode, useState } from 'react'
import { useRouter } from 'next/router'

export default function EnterCode() {
  const [step, setStep] = useState<'question' | 'form'>('question')
  const [code, setCode] = useState('')
  const [error, setError] = useState<ReactNode>('')
  const router = useRouter()

  const handleNo = () => {
    setError(
      <>
        Please check your invitation. Contact us at{' '}
        <a
          href="mail@mail.com"
          className="text-blue-600 hover:underline"
        >
          mail@mail.com
        </a>{' '}
        if you need help.
      </>
    )
  }

  const handleBack = () => {
    setError('')
    setCode('')
    setStep('question')
  }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    const res = await fetch('/api/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code }),
    })
    if (res.ok) {
      router.replace('/')
    } else {
      setError('Incorrect code, please try again.')
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        {step === 'question' ? (
          <>
            <h1 className="text-2xl font-bold text-center mb-6">
              Have you received your invitation?
            </h1>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setStep('form')}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition"
              >
                No
              </button>
            </div>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
          </>
        ) : (
          <>
            <div className="flex justify-start mb-4">
              <button
                onClick={handleBack}
                className="text-gray-500 hover:text-gray-700 transition"
              >
                &larr; Back
              </button>
            </div>
            <h1 className="text-2xl font-bold text-center mb-6">Enter Passcode</h1>
            <form onSubmit={submit} className="space-y-4">
              <input
                type="password"
                value={code}
                onChange={e => setCode(e.target.value)}
                placeholder="Your wedding code"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition"
              >
                Preview Site
              </button>
              {error && <p className="text-red-500 text-center mt-2">{error}</p>}
            </form>
          </>
        )}
      </div>
    </main>
  )
}