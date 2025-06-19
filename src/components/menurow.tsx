import React from 'react'
import Link from 'next/link'

const menuItems = [
  { id: 'location', label: 'Location' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'about-spetses', label: 'About Spetses' },
  { id: 'contact', label: 'Contact' },
]

export default function MenuRow() {
  return (
    <nav className="fixed inset-x-0 top-0 bg-white bg-opacity-80 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex justify-center items-center h-16">
        <ul className="flex space-x-8">
          {menuItems.map(({ id, label }) => (
            <li key={id}>
              <Link
                href={`#${id}`}
                className="text-gray-700 uppercase tracking-wide text-sm hover:text-blue-600 transition-colors duration-200"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}