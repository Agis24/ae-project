"use client";
import Image from "next/image";
import { useState } from "react";

export default function Details() {
  const [stayOpen, setStayOpen] = useState(false);
  const [gettingOpen, setGettingOpen] = useState(false);

  return (
    <section className="text-center py-8 px-4 font-[var(--font-segoe)] text-sm md:text-base">
      {/* Main Title */}
      <section className="text-center">
        <Image
          src="/Details.png"
          alt="Details"
          width={600}
          height={200}
          className="mx-auto h-auto w-[60%] md:w-[40%] lg:w-[30%]"
          priority
        />
      </section>

      {/* WEDDING LOCATION */}
      <h2 className="mt-10 text-base md:text-lg uppercase tracking-widest font-semibold">
        Wedding Location
      </h2>
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        The ceremony will be held at Saint George’s Church in Zogeria Beach.
        <br />
        The reception will follow at Zogeria Beach.
      </p>

      {/* TRAVEL */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        Travel
      </h2>
      <p className="mt-3 max-w-3xl mx-auto leading-relaxed">
        From Athens to Spetses, Dapia Port
      </p>
      <ul className="mt-4 max-w-3xl mx-auto text-left list-disc pl-6 space-y-2 leading-relaxed">
        <li>
          <strong className="not-italic">By boat (about 2 hours):</strong> Take a ferry directly from Piraeus port to Spetses (Dapia port).
        </li>
        <li>
          <strong className="not-italic">By car (about 3.5 hours):</strong> Drive from Athens to Kosta port. You’ll find two parking areas right by the port where you can securely leave your car. From there, continue to Spetses (Dapia port) by sea taxi or ferry.
        </li>
      </ul>

      {/* DRESS CODE */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        Dress Code
      </h2>
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        Beach Formal Attire – elegant but adapted for a seaside setting. It combines the polish of formal wear with the lightness and comfort needed for seaside settings and sandy paths. For comfort on the sand and coastal path, flats or low heels are recommended; stilettos and high heels are not suitable.
        <br />
        We recommend bringing a shawl or wrap (for women) and a blazer (for men), for the evening sea breeze.
      </p>

      {/* FROM DAPIA TO WEDDING LOCATION */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        From Dapia to Zogeria
      </h2>
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        Traditional boats... Details will follow soon.
      </p>
      {/* <ul className="mt-3 max-w-3xl mx-auto text-left list-disc pl-6 space-y-2 leading-relaxed">
        <li>
          <strong className="not-italic">Boat departure:</strong> 17:15
        </li>
        <li>
          <strong className="not-italic">Return boats:</strong> Available after the celebration to bring you back to Spetses port and through the night (managed by our planner on site).
        </li>
      </ul> */}
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        Other ways to reach Zogeria Beach:
      </p>
      <ul className="mt-3 max-w-3xl mx-auto text-left list-disc pl-6 space-y-2 leading-relaxed">
        <li>
          <strong className="not-italic">By sea taxi:</strong> Head to Dapia port and hop on the next available sea taxi.
        </li>
        <li>
          <strong className="not-italic">By scooter or motorbike:</strong> Ride to Zogeria Beach, then enjoy a short 7-minute walk along the trail to St. George’s Church.
        </li>
      </ul>

      {/* WHERE TO STAY */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        <button
          onClick={() => setStayOpen(!stayOpen)}
          className="flex items-center mx-auto gap-2 hover:opacity-80 transition"
        >
          Where to Stay
          <span>{stayOpen ? "▲" : "▼"}</span>
        </button>
      </h2>
      {stayOpen && (
        <div className="mt-4 max-w-3xl mx-auto text-center animate-fadeIn">
          <p className="leading-relaxed mb-3">
            Spetses offers a wonderful variety of places to stay, from seaside hotels to traditional guesthouses. By mentioning our wedding when booking, you may receive better rates.
          </p>
          <ul className="list-none space-y-2 leading-relaxed">
            {[
              ["Hotel Roumani", "https://www.hotelroumani.gr/", "100m", "***"],
              ["Klimis Hotel", "https://www.klimishotel.gr/", "200m", "***"],
              ["Niriides Hotel", "https://niriides-spetses.gr/", "300m", "***"],
              ["Armata Boutique Hotel", "https://www.armatahotel.gr/", "300m", "***"],
              ["Kastro Hotel", "https://www.kastrohotel-spetses.gr/", "500m", "***"],
              ["Nissia Traditional Residences", "https://www.nissia.gr/", "550m", "****"],
              ["Mare Monte Luxury Suites", "https://www.maremonteboutiquehotel.com/", "500m", "****"],
              ["Orloff Resort", "https://www.orloffresort.com/", "1200m", "****"],
              ["Zoe’s Club Hotel", "https://www.zoesclub.gr/", "300m", "****"],
              ["Poseidonion Grand Hotel", "https://poseidonion.com/", "200m", "*****"],
            ].map(([name, link, distance, stars]) => (
              <li key={name}>
                <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                  {name}
                </a>{" "}
                {stars} (Distance {distance})
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs">
            *Star rating<br />
            Distance refers to the distance from the Port of Dapia
          </p>
        </div>
      )}

      {/* GETTING AROUND */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        <button
          onClick={() => setGettingOpen(!gettingOpen)}
          className="flex items-center mx-auto gap-2 hover:opacity-80 transition"
        >
          Getting Around Spetses
          <span>{gettingOpen ? "▲" : "▼"}</span>
        </button>
      </h2>
      {gettingOpen && (
        <div className="mt-4 max-w-3xl mx-auto text-center animate-fadeIn">
          <p className="leading-relaxed mb-3">
            On Spetses, there are no cars, so getting around is easy by foot, bicycle, scooter, ATV, or even horse-drawn carriage. If you’d like to rent a scooter or ATV, here are a few recommendations:
          </p>
          <ul className="list-none space-y-2 leading-relaxed">
            <li>
              <a href="https://www.stanathiotis.gr/" target="_blank" rel="noopener noreferrer" className="underline">
                Stanathiotis Moto
              </a>
            </li>
            <li>
              <a href="https://maps.app.goo.gl/NjHKHKo9Q6oVapn1A" target="_blank" rel="noopener noreferrer" className="underline">
                Rent a moto Thymaras
              </a>
            </li>
            <li>
              <a href="https://spetses-moto.gr/" target="_blank" rel="noopener noreferrer" className="underline">
                Rentals Spetsesmoto
              </a>
            </li>
          </ul>
        </div>
      )}
    </section>
  );
}
