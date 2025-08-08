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

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const names = [you.trim(), allowPlusOne ? plusOne.trim() : ''].filter(Boolean)

    try {
      await onSubmit(
        names,
        email.trim(),
        { attendance, diet, message: message.trim() }
      )
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-cyan-300 via-blue-400 to-indigo-500 overflow-auto">
      <motion.div
        className="relative w-full max-w-lg mx-4 my-8 overflow-y-auto"
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        style={{ transformPerspective: 800, transformStyle: 'preserve-3d' }}
      >
        <div className="absolute top-0 left-0 w-full h-8 bg-white" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
        <div className="relative bg-white/90 backdrop-blur-md pt-12 pb-8 px-8 rounded-b-3xl shadow-2xl">
          <motion.h1 className="text-3xl font-extrabold text-center text-blue-900 mb-4" variants={fieldVariants}>
            {title}
          </motion.h1>

          <motion.form onSubmit={handleSubmit} className="space-y-4" variants={fieldVariants}>
            {/* Full Name(s) */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-bold">Your Full Name</label>
              <motion.input
                type="text"
                value={you}
                onChange={e => setYou(e.target.value)}
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                variants={fieldVariants}
              />
            </div>

            {allowPlusOne && (
              <div className="flex flex-col space-y-2">
                <label className="text-gray-700 font-bold">Plus-One Full Name (optional)</label>
                <motion.input
                  type="text"
                  value={plusOne}
                  onChange={e => setPlusOne(e.target.value)}
                  className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  variants={fieldVariants}
                />
              </div>
            )}

            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-bold">Your Email</label>
              <motion.input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                variants={fieldVariants}
              />
            </div>

            {/* Attendance */}
            <motion.fieldset className="flex flex-col space-y-2" variants={fieldVariants}>
              <legend className="text-gray-700 font-bold">Attending</legend>
              {attendanceOptions.map(opt => (
                <label key={opt} className="inline-flex items-center space-x-2 text-gray-800">
                  <input
                    type="radio"
                    name="attendance"
                    value={opt}
                    checked={attendance === opt}
                    onChange={() => setAttendance(opt)}
                    className="text-blue-600"
                  />
                  <span>
                    {opt === 'both'
                      ? 'Ceremony & Party'
                      : opt === 'none'
                      ? 'Not Attending'
                      : opt.charAt(0).toUpperCase() + opt.slice(1)}
                  </span>
                </label>
              ))}
            </motion.fieldset>

            {/* Diet checkboxes */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-bold">Select your dietary preferences</label>
              {dietOptions.map(option => (
                <label key={option} className="inline-flex items-center space-x-2 bg-white/80 p-2 rounded-md shadow-sm hover:bg-blue-50 transition">
                  <input
                    type="checkbox"
                    value={option}
                    checked={diet.includes(option)}
                    onChange={(e) => {
                      if (e.target.checked) setDiet(prev => [...prev, option])
                      else setDiet(prev => prev.filter(o => o !== option))
                    }}
                    className="text-blue-600 rounded"
                  />
                  <span>{option}</span>
                </label>
              ))}
            </div>

            {/* Message */}
            <div className="flex flex-col space-y-2">
              <label className="text-gray-700 font-bold">Message for the bride & groom (optional)</label>
              <motion.textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                variants={fieldVariants}
              />
            </div>

            {/* Error */}
            {error && (
              <motion.p className="text-red-600 text-center" variants={fieldVariants}>
                {error}
              </motion.p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg"
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
