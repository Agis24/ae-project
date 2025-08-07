import { useState } from 'react'

export default function Location() {

    const [showMapWedding, setShowMapWedding] = useState(false)
    const [showMapParty, setShowMapParty] = useState(false)

    return (
        <section id="location" className="py-20 px-4 container mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Party Location</h2>
            <p className="mb-4">Zogeria Beach, Spetses, Greece</p>
            <button
                onClick={() => setShowMapParty(prev => !prev)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
                {showMapParty ? 'Hide Preview' : 'Preview Locarion'}
            </button>
            {showMapParty && (
                <div className="mt-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d478.8308187832473!2d23.100279333558912!3d37.27741140462962!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x149fbc2b1a570db3%3A0x387751c0bb007e25!2sParalia%20Zogeria!5e1!3m2!1sen!2sgr!4v1750151186491!5m2!1sen!2sgr"
                        width="100%"
                        height="450"
                        loading="lazy"
                        className="rounded-lg shadow-md"
                    />
                </div>
            )}
            <p className="mb-4">
                Zogeria Beach in Spetses is a beautiful shore boasting crystalline waters
                with mesmerizing blue colors! The larger cove of Zogeria has lots of coarse
                sand along its length, whereas the small, secluded Zogeria has a mixture of
                sand, dirt, and pebbles where the water breaks. The gorgeous surrounding
                forest trees make for a fantastic background for you to enjoy sunbathing or
                a refreshing swim!
            </p>
            <h2 className="text-2xl font-semibold mb-4">Ceremony Location</h2>
            <p className="mb-4">Εκκλησάκι Ζωγεριάς</p>
            <button
                onClick={() => setShowMapWedding(prev => !prev)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 transition"
            >
                {showMapWedding ? 'Hide Preview' : 'Preview Location'}
            </button>
            {showMapWedding && (
                <div className="mt-6">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d783.3342197712738!2d23.10292756325215!3d37.27882507091393!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1sen!2sgr!4v1750241484666!5m2!1sen!2sgr" 
                        width="100%"
                        height="450"
                        loading="lazy"
                        className="rounded-lg shadow-md"
                    />
                </div>
            )}
        </section>
    )
}
