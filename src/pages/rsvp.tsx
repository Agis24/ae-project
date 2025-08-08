// src/pages/rsvp.tsx
import { useRouter } from 'next/router'
import RSVPForm from '@/components/RSVPForm'

export default function RSVP() {
  const router = useRouter()

  return (
    <RSVPForm
      title="RSVP"
      buttonText="Submit RSVP"
      onSubmit={async (names, email, { attendance, diet, message }) => {
        const res = await fetch('/api/rsvp-solo', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            names,                      // array on FE
            email,
            attendance,
            diet: diet.join(', '),      // send as string to API/DB
            message,
          }),
        })
        if (!res.ok) {
          const { error } = await res.json()
          throw new Error(error)
        }
        router.push('/thank-you')
      }}
    />
  )
}
