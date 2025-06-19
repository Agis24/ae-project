import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <nav className="fixed top-4 right-4 z-50">
      <button
        aria-label="Toggle menu"
        className="p-2 rounded-md bg-white shadow-lg focus:outline-none"
        onClick={() => setOpen(!open)}
      >
        {open ? <X size={24} /> : <Menu size={24} />}
      </button>

      {open && (
        <div className="mt-2 bg-white rounded-md shadow-lg py-2 w-40 text-right">
          <Link href="#location" className="block px-4 py-2 hover:bg-gray-100">
            Location
          </Link>
          <Link href="#schedule" className="block px-4 py-2 hover:bg-gray-100">
            Schedule
          </Link>
          <Link href="#about-spetses" className="block px-4 py-2 hover:bg-gray-100">
            About Spetses
          </Link>
        </div>
      )}
    </nav>
  )
}