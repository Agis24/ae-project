import Image from "next/image";

export default function Details() {
  return (
    <section className="text-center py-8 px-4 font-[var(--font-segoe)]">
      {/* Main Title */}
      <section className="text-center">
        <Image
          src="/Details.png"
          alt="Details"
          width={600}
          height={200}
          className="mx-auto h-auto w-[50%] md:w-[35%] lg:w-[25%]"
          priority
        />
      </section>
      {/* WEDDING LOCATION */}
      <h2 className="mt-10 text-lg md:text-xl uppercase tracking-widest font-semibold ">
        Wedding Location
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed">
        The ceremony will be held at Saint George’s Church in Zogeria Beach.
        <br />
        The reception will follow at Zogeria Beach.
      </p>

      {/* TRAVEL */}
      <h2 className="mt-12 text-lg md:text-xl uppercase tracking-widest font-semibold ">
        Travel
      </h2>
      <p className="mt-3 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ">
        From Athens to Spetses, Dapia Port
      </p>
      <div className="mt-4 max-w-3xl mx-auto text-left">
        <ul className="list-disc pl-6 space-y-3 text-base md:text-lg leading-relaxed ">
          <li>
            <strong className="not-italic">By boat (about 2 hours):</strong> Take a
            ferry directly from Piraeus port to Spetses (Dapia port).
          </li>
          <li>
            <strong className="not-italic">By car (about 3.5 hours):</strong> Drive
            from Athens to Kosta port. You’ll find two parking areas right by the port
            where you can securely leave your car. From there, continue to Spetses
            (Dapia port) by sea taxi or ferry (check ferry departure schedule).
          </li>
        </ul>
      </div>

      {/* DRESS CODE */}
      <h2 className="mt-12 text-lg md:text-xl uppercase tracking-widest font-semibold ">
        Dress Code
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ">
        Beach Formal Attire – elegant but adapted for a seaside setting. It combines
        the polish of formal wear with the lightness and comfort needed for seaside
        settings and sandy paths. For comfort on the sand and coastal path, flats or
        low heels are recommended; stilettos and high heels are not suitable.
        <br />
        We recommend bringing a shawl or wrap (for women) and a blazer (for men), for
        the evening sea breeze.
      </p>

      {/* FROM DAPIA TO WEDDING LOCATION */}
      <h2 className="mt-12 text-lg md:text-xl uppercase tracking-widest font-semibold ">
        From Spetses Port of Dapia to the Wedding Location
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ">
        Traditional boats will take guests from Spetses port (Dapia) to Zogeria
        Beach. Please arrive at the dock 15–20 minutes before departure.
      </p>
      <div className="mt-3 max-w-3xl mx-auto text-left">
        <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed ">
          <li>
            <strong className="not-italic">Boat departure:</strong> 17:15
          </li>
          <li>
            <strong className="not-italic">Return boats:</strong> Available after the
            celebration to bring you back to Spetses port and through the night
            (managed by our planner on site).
          </li>
        </ul>
      </div>
      <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ">
        Other ways to reach Zogeria Beach:
      </p>
      <div className="mt-3 max-w-3xl mx-auto text-left">
        <ul className="list-disc pl-6 space-y-2 text-base md:text-lg leading-relaxed ">
          <li>
            <strong className="not-italic">By sea taxi:</strong> Head to Dapia port
            and hop on the next available sea taxi.
          </li>
          <li>
            <strong className="not-italic">By scooter or motorbike:</strong> Ride to
            Zogeria Beach (where the wedding reception will be held), then enjoy a
            short 7-minute walk along the trail to St. George’s Church.
          </li>
        </ul>
      </div>

      {/* WHERE TO STAY */}
      <h2 className="mt-12 text-lg md:text-xl uppercase tracking-widest font-semibold ">
        Where to Stay
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ">
        Spetses offers a wonderful variety of places to stay, from seaside hotels to
        traditional guesthouses tucked away in its charming streets. We’ve selected a
        few options for our guests, and by mentioning our wedding when booking, you
        may receive better rates.
      </p>
      <div className="mt-4 max-w-3xl mx-auto text-center">
        <ul className="list-none space-y-2 text-base md:text-lg leading-relaxed">
          <li>
            <a
              href="https://www.hotelroumani.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Hotel Roumani
            </a> *** (Distance 100m)
          </li>
          <li>
            <a
              href="https://www.klimishotel.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Klimis Hotel
            </a> *** (Distance 200m)
          </li>
          <li>
            <a
              href="https://niriides-spetses.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Niriides Hotel
            </a> *** (Distance 300m)
          </li>
          <li>
            <a
              href="https://www.armatahotel.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Armata Boutique Hotel
            </a> *** (Distance 300m)
          </li>
          <li>
            <a
              href="https://www.kastrohotel-spetses.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Kastro Hotel
            </a> *** (Distance 500m)
          </li>
          <li>
            <a
              href="https://www.nissia.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Nissia Traditional Residences
            </a> **** (Distance 550m)
          </li>
          <li>
            <a
              href="https://www.maremonteboutiquehotel.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Mare Monte Luxury Suites
            </a> **** (Distance 500m)
          </li>
          <li>
            <a
              href="https://www.orloffresort.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Orloff Resort
            </a> **** (Distance 1200m)
          </li>
          <li>
            <a
              href="https://www.zoesclub.gr/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Zoe’s Club Hotel
            </a> **** (Distance 300m)
          </li>
          <li>
            <a
              href="https://poseidonion.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              Poseidonion Grand Hotel
            </a> ***** (Distance 200m)
          </li>
        </ul>

        <p className="mt-3 text-sm">
          *Star rating<br />
          Distance refers to the distance from the Port of Dapia
        </p>
      </div>

      {/* GETTING AROUND */}
      <h2 className="mt-12 text-lg md:text-xl uppercase tracking-widest font-semibold ">
        Getting Around Spetses
      </h2>
      <p className="mt-4 max-w-3xl mx-auto text-base md:text-lg leading-relaxed ">
        On Spetses, there are no cars, so getting around is easy by foot, bicycle,
        scooter, ATV, or even horse-drawn carriage. If you’d like to rent a scooter
        or ATV, there are many rental companies on the island. Here are a few we
        recommend:
      </p>
      <div className="mt-3 max-w-3xl mx-auto text-center">
        <ul className="list-none pl-6 space-y-2 text-base md:text-lg leading-relaxed ">
          <li>
            <a href="https://www.stanathiotis.gr/" target="_blank" rel="noopener noreferrer" className="underline">Stanathiotis Moto</a>
          </li>
          <li>
            <a href="https://maps.app.goo.gl/NjHKHKo9Q6oVapn1A" target="_blank" rel="noopener noreferrer" className="underline">Rent a moto Thymaras</a>
          </li>
          <li>
            <a href="https://spetses-moto.gr/" target="_blank" rel="noopener noreferrer" className="underline">Rentals Spetsesmoto</a>
          </li>
        </ul>
      </div>
    </section>
  );
}