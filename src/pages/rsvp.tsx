// src/pages/rsvp.tsx
import { useRouter } from 'next/router'
import RSVPForm from '@/components/RSVPForm'
import WeddingInfoMobile from '@/components/WeddingInfoMobile'

export default function RSVP() {
  const router = useRouter()
  return (
    <main className="min-h-screen w-full flex flex-col items-center justify-center bg-white px-3 py-4">
      <WeddingInfoMobile
        couple="Elisavet & Aristotelis"
        date="Sat, Sep 19, 2026"
        time="1:00 PM"
        locationName="Zogeria Beach, Spetses"
        mapsQuery="Zogeria Beach, Spetses"
      />

      <div className="mt-4 w-full max-w-lg">
        <RSVPForm
          title="RSVP"
          buttonText="Submit RSVP"
          onSubmit={async (names, email, phone, { attendance, diet, message }) => {
            const res = await fetch('/api/rsvp-solo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                names,
                email,
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
            router.push('/thank-you')
          }}
        />
      </div>
    </main>
  )
}
