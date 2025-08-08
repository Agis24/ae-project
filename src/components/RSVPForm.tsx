// components/RSVPForm.tsx
import { FormEvent, useState } from 'react'
import { motion, Variants } from 'framer-motion'

export type RSVPFormProps = {
  allowPlusOne?: boolean
  title: string
  buttonText: string
  onSubmit: (
    names: string[],
    email: string,
    phone: string,
    options: {
      attendance: 'ceremony' | 'party' | 'both' | 'none'
      diet: string[]           // FE keeps diet as array
      message: string
    }
  ) => Promise<void>
}

const cardVariants: Variants = {
  hidden: { rotateX: -90, scale: 0.8, opacity: 0 },
  visible: {
    rotateX: 0,
    scale: 1,
    opacity: 1,
    transition: { duration: 0.8, when: 'beforeChildren', staggerChildren: 0.1 },
  },
}
const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}
const attendanceOptions = ['ceremony', 'party', 'both', 'none'] as const
const dietOptions = ['Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free', 'Vegetarian'] as const

export default function RSVPForm({
  allowPlusOne = false,
  title,
  buttonText,
  onSubmit,
}: RSVPFormProps) {
  const [you, setYou] = useState('')
  const [plusOne, setPlusOne] = useState('')
  const [email, setEmail] = useState('')
  const [attendance, setAttendance] = useState<(typeof attendanceOptions)[number]>('both')
  const [diet, setDiet] = useState<string[]>([])
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countryCode, setCountryCode] = useState('+30')
  const [phone, setPhone] = useState('')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const names = [you.trim(), allowPlusOne ? plusOne.trim() : ''].filter(Boolean)
    const fullPhone = `${countryCode}${phone.trim()}`

    try {
      await onSubmit(
        names,
        email.trim(),
        fullPhone,
        { attendance, diet, message: message.trim() }
      )
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
  <div className="min-h-screen w-full flex items-start justify-center bg-white">
    <motion.div
      className="w-full max-w-md mx-4 mt-6"
      initial="hidden"
      animate="visible"
      variants={cardVariants}
      style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
    >
      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-md p-6">
        <motion.h1
          className="font-serif text-3xl tracking-wide text-center text-black"
          variants={fieldVariants}
        >
          {title}
        </motion.h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          Please respond by June 10
        </p>

        {/* thin divider */}
        <div className="mx-auto my-5 h-12 w-px bg-gray-200" />

        {/* optional contact line (match reference look) */}
        <div className="text-center">
          <p className="font-serif text-2xl">Contact</p>
          <p className="text-gray-500 text-sm mt-1">
            us at <span className="font-medium">6900000000</span> for any enquiries.
          </p>
        </div>
      </div>

      {/* Form card */}
      <div className="bg-white rounded-2xl shadow-md p-6 mt-4">
        <motion.form onSubmit={handleSubmit} className="space-y-5" variants={fieldVariants}>
          {/* Full Name(s) */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Your Full Name</label>
            <motion.input
              type="text"
              value={you}
              onChange={e => setYou(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              variants={fieldVariants}
            />
          </div>

          {allowPlusOne && (
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold text-black">Plus-One Full Name (optional)</label>
              <motion.input
                type="text"
                value={plusOne}
                onChange={e => setPlusOne(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                variants={fieldVariants}
              />
            </div>
          )}

          {/* Email */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Email</label>
            <motion.input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              variants={fieldVariants}
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Phone Number</label>
            <div className="flex">
              <select
                value={countryCode}
                onChange={e => setCountryCode(e.target.value)}
                className="px-3 py-3 border border-gray-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="+30">🇬🇷 +30</option>
                <option value="+44">🇬🇧 +44</option>
                <option value="+1">🇺🇸 +1</option>
              </select>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                placeholder="Your phone number"
                className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          {/* Attendance */}
          <motion.fieldset className="flex flex-col gap-2" variants={fieldVariants}>
            <legend className="text-sm font-semibold text-black">Will you be attending</legend>
            {attendanceOptions.map(opt => (
              <label key={opt} className="inline-flex items-center gap-2 text-gray-800">
                <input
                  type="radio"
                  name="attendance"
                  value={opt}
                  checked={attendance === opt}
                  onChange={() => setAttendance(opt)}
                  className="accent-black"
                />
                <span>
                  {opt === 'both'
                    ? 'Ceremony & Party'
                    : opt === 'none'
                    ? 'No, unfortunately I cannot attend'
                    : opt === 'ceremony'
                    ? 'Wedding Ceremony'
                    : 'Evening Banquet'}
                </span>
              </label>
            ))}
          </motion.fieldset>

          {/* Diet checkboxes */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Dietary Preferences (optional)</label>
            {dietOptions.map(option => (
              <label
                key={option}
                className="inline-flex items-center gap-2 bg-white p-2 rounded-md shadow-sm hover:bg-gray-50 transition"
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={diet.includes(option)}
                  onChange={e => {
                    if (e.target.checked) setDiet(prev => [...prev, option])
                    else setDiet(prev => prev.filter(o => o !== option))
                  }}
                  className="accent-black rounded"
                />
                <span>{option}</span>
              </label>
            ))}
          </div>

          {/* Message */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-black">Message for the couple (optional)</label>
            <motion.textarea
              value={message}
              onChange={e => setMessage(e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              variants={fieldVariants}
            />
          </div>

          {/* Error */}
          {error && (
            <motion.p className="text-red-600 text-center text-sm" variants={fieldVariants}>
              {error}
            </motion.p>
          )}

          {/* Submit */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-black hover:bg-neutral-900 text-white font-medium py-3 rounded-lg"
            variants={fieldVariants}
          >
            {loading ? 'Submitting…' : buttonText}
          </motion.button>
        </motion.form>
      </div>
    </motion.div>
  </div>
)

}
