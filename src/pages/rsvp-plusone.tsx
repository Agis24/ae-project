// src/pages/rsvp-plusone.tsx
import { useRouter } from 'next/router'
import RSVPForm from '@/components/RSVPForm'

export default function RSVPPlusOne() {
  const router = useRouter()

  return (
    <RSVPForm
      allowPlusOne
      title="RSVP (+1)"
      buttonText="Submit RSVP"
      onSubmit={async (names, email, { attendance, diet, message }) => {
        const res = await fetch('/api/rsvp-plusone', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            names,                      // array on FE
            email,
            attendance,
            diet: diet.join(', '),      // string to API/DB
            message,
          }),
        })
        if (!res.ok) {
          const { error } = await res.json()
          throw new Error(error)
        }
        router.push('/thank-you-plusone')
      }}
    />
  )
}
