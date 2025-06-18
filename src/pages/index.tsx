import Welcome from "@/components/Welcome"
import AboutSpetses from "@/components/AboutSpetses"
import Location from "@/components/Location"
import Schedule from "@/components/Schedule"
import Contact from "@/components/Contact"

export default function Home() {
  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <Welcome/>
      <Location/>
      <Schedule/>
      <AboutSpetses/>
      <Contact/>
    </main>
  )
}