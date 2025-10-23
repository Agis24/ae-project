// components/RSVPForm.tsx
import { FormEvent, useMemo, useState } from 'react'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import countryCallingCodes from 'country-calling-code';
import { withPrefix } from '@/lib/prefix';

interface CountryCallingCodeItem {
  countryCodes: string[];
  isoCode2: string;
  isoCode3: string;
}

export type RSVPFormProps = {
  allowPlusOne?: boolean
  title: string
  buttonText: string
  onSubmit: (
    names: string[],
    email: string,
    phone: string,
    options: {
      attendance: 'yes' | 'no'
      diet: string
      message: string
    }
  ) => Promise<void>
}

const fieldVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
}

const attendanceOptions = ['yes', 'no'] as const;

function isoToFlagEmoji(isoCode: string): string {
  return isoCode
    .toUpperCase()
    .replace(/./g, char =>
      String.fromCodePoint(127397 + char.charCodeAt(0))
    );
}

type CountryDial = {
  code: string;
  isoCode: string;
};

const normalizeCode = (c: string) => (c.startsWith('+') ? c : `+${c}`);

const FAVORITES: CountryDial[] = [
  { code: '+30', isoCode: 'GR' },
  { code: '+44', isoCode: 'GB' },
  { code: '+1', isoCode: 'US' },
  { code: '+39', isoCode: 'IT' },
  {code: '+33', isoCode: 'FR'},
];

const favoriteSet = new Set(FAVORITES.map(f => f.code));

export default function RSVPForm({
  allowPlusOne = false,
  title,
  buttonText,
  onSubmit,
}: RSVPFormProps) {
  const [you, setYou] = useState('')
  const [plusOne, setPlusOne] = useState('')
  const [email, setEmail] = useState('')
  const [attendance, setAttendance] =
    useState<(typeof attendanceOptions)[number]>('yes')
  const [diet, setDiet] = useState('');
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [countryCode, setCountryCode] = useState('+30')
  const [phone, setPhone] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const names = [you.trim(), allowPlusOne ? plusOne.trim() : ''].filter(Boolean)
    const fullPhone = `${countryCode}${(phone ?? '').trim()}`;

    try {
      await onSubmit(names, email.trim(), fullPhone, {
        attendance,
        diet,
        message: message.trim(),
      })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Submission failed.')
    } finally {
      setLoading(false)
    }
  }

  const otherCountries = useMemo<CountryDial[]>(() => {
    const byCode = new Map<string, string>();

    for (const e of countryCallingCodes as CountryCallingCodeItem[]) {
      const iso: string | undefined = e.isoCode2;
      if (!iso) continue;

      const codes: string[] = Array.isArray(e.countryCodes) ? e.countryCodes : [];
      for (const raw of codes) {
        const code = normalizeCode(String(raw));
        if (!favoriteSet.has(code) && !byCode.has(code)) {
          byCode.set(code, iso);
        }
      }
    }

    const arr = Array.from(byCode, ([code, isoCode]) => ({ code, isoCode }));
    arr.sort((a, b) => a.isoCode.localeCompare(b.isoCode));
    return arr;
  }, []);
  

  return (
    <div className="w-full max-w-md mx-auto px-4 mt-6">
      {/* Header (no card) */}
      <motion.div initial="hidden" animate="visible" variants={fieldVariants}>
        <section className="text-center py-6">
          <Image
            src={withPrefix("/RSVP.png")}
            alt={title}
            width={600}
            height={200}
            className="mx-auto h-auto w-[40%] md:w-[30%] lg:w-[20%]"
            priority
          />
        </section>
        <p className="text-center text-neutral-500 text-sm mt-1">
          Please respond at your earliest convienience
        </p>
      </motion.div>

      {/* Form (no card) */}
      <motion.form
        onSubmit={handleSubmit}
        className="space-y-5 mt-6"
        initial="hidden"
        animate="visible"
        variants={fieldVariants}
      >
        {/* Full Name(s) */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-neutral-900">
            {allowPlusOne ? 'Full Name (Person 1)' : 'Your Full Name'}
          </label>
          <motion.input
            type="text"
            value={you}
            onChange={(e) => setYou(e.target.value)}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            variants={fieldVariants}
          />
        </div>

        {allowPlusOne && (
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-neutral-900">
              Full Name (Person 2)
            </label>
            <motion.input
              type="text"
              value={plusOne}
              onChange={(e) => setPlusOne(e.target.value)}
              className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
              variants={fieldVariants}
            />
          </div>
        )}

        {/* Email */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-neutral-900">Email</label>
          <motion.input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            variants={fieldVariants}
          />
        </div>

        {/* Phone Number */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-black">Phone Number</label>
          <div className="flex">
            <select
              value={countryCode}
              onChange={(e) => setCountryCode(e.target.value)}
              className="min-w-[7rem] max-w-[8rem] text-center px-2 py-3 border border-gray-300 rounded-l-lg bg-white focus:outline-none focus:ring-2 focus:ring-black shrink-0"
            >
              {FAVORITES.map((c) => (
                <option key={`fav-${c.code}`} value={c.code}>
                  {isoToFlagEmoji(c.isoCode)} {c.isoCode} {c.code}
                </option>
              ))}

              <option disabled>──────────</option>

              {otherCountries.map((c) => (
                <option key={c.code} value={c.code}>
                  {isoToFlagEmoji(c.isoCode)} {c.isoCode} {c.code}
                </option>
              ))}
            </select>

            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your phone number"
              className="flex-1 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        {/* Attendance */}
       <motion.fieldset className="flex flex-col gap-2" variants={fieldVariants}>
          <legend className="text-sm py-1.5 font-semibold text-neutral-900">
            Will you be attending?
          </legend>
          {attendanceOptions.map((opt) => (
            <label key={opt} className="inline-flex items-center gap-2 text-neutral-800">
              <input
                type="radio"
                name="attendance"
                value={opt}
                checked={attendance === opt}
                onChange={() => setAttendance(opt)}
                className="accent-neutral-900"
              />
              <span>
                {opt === 'yes'
                  ? 'Yes, I will be there'
                  : 'No, unfortunately I will not attend'}
              </span>
            </label>
          ))}
        </motion.fieldset>

        {/* Diet Message */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-neutral-900">
            Dietary Preferences (optional)
          </label>
          <motion.textarea
            value={diet}
            onChange={(e) => setDiet(e.target.value)}
            placeholder="e.g. Allergies, vegetarian, no nuts, gluten-free..."
            rows={3}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
            variants={fieldVariants}
          />
        </div>

        {/* Message for couple*/}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-neutral-900">
            Message for the couple (optional)
          </label>
          <motion.textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
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
          className="w-full bg-neutral-900 hover:bg-black text-white font-medium py-3 rounded-lg"
          variants={fieldVariants}
        >
          {loading ? 'Submitting…' : buttonText}
        </motion.button>
      </motion.form>
    </div>
  )
}