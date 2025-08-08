// components/Section.tsx
import { PropsWithChildren } from 'react'

export default function Section({ title, kicker, children }: PropsWithChildren<{title: string; kicker?: string;}>) {
  return (
    <section className="w-full max-w-lg mx-auto px-4">
      <header className="mb-3">
        {kicker && <p className="text-xs tracking-widest uppercase text-mute">{kicker}</p>}
        <h2 className="font-display text-2xl leading-tight text-ink">{title}</h2>
      </header>
      <div className="bg-white rounded-2xl shadow-card p-4">{children}</div>
    </section>
  )
}
