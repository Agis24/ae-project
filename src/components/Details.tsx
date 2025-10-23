"use client";
import Image from "next/image";
import { useState } from "react";
import { Trans, useTranslation } from 'next-i18next';
import banner from '@/assets/Details.png';

export default function Details() {
  const { t } = useTranslation();
  const [stayOpen, setStayOpen] = useState(false);
  const [gettingOpen, setGettingOpen] = useState(false);

  return (
    <section className="text-center py-8 px-4 font-[var(--font-segoe)] text-sm md:text-base">
      {/* Main Title */}
      <section className="text-center">
        <Image
          src={banner}
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
        {t('details.weddingLocation1')}
        <br />
        {t('details.weddingLocation2')}
      </p>

      {/* TRAVEL */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        Travel
      </h2>
      <p className="mt-3 max-w-3xl mx-auto leading-relaxed">
        {t('details.travelHeader1')}
      </p>
      <ul className="mt-4 max-w-3xl mx-auto text-left list-disc pl-6 space-y-2 leading-relaxed">
        <li>
          <Trans 
            i18nKey="details.travelOption1"
            components={{ strong: <strong className="not-italic" /> }}
          />
        </li>
        <li>
          <Trans 
            i18nKey="details.travelOption2"
            components={{ strong: <strong className="not-italic" /> }}
          />
        </li>
      </ul>

      {/* DRESS CODE */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        Dress Code
      </h2>
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        <Trans
          i18nKey="details.dressCode1"
          components={{
            bold: <span className="font-bold" />,
            italic: <span className="italic" />,
            br: <br />
          }}
        />
        <br />
        {t('details.dressCode2')}
      </p>

      {/* FROM DAPIA TO WEDDING LOCATION */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold">
        From Dapia to Zogeria
      </h2>
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        {t('details.toWeddingLocation1')}
      </p>
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        <Trans
          i18nKey="details.return1"
          components={{
            bold: <span className="font-bold" />,
            italic: <span className="italic" />,
            br: <br />
          }}
        />
      </p>
      <p className="mt-4 max-w-3xl mx-auto leading-relaxed">
        {t('details.toZogeriaOptionsLabel')}
      </p>
      <ul className="mt-3 max-w-3xl mx-auto text-left list-disc pl-6 space-y-2 leading-relaxed">
        <li>
          <Trans 
            i18nKey="details.toZogeriaOption1"
            components={{
              bold: <span className="font-bold" />,
              italic: <span className="italic" />,
              br: <br />
            }}
          />
        </li>
        <li>
          <Trans 
            i18nKey="details.toZogeriaOption2"
            components={{
              bold: <span className="font-bold" />,
              italic: <span className="italic" />,
              br: <br />
            }}
          />
        </li>
      </ul>

      {/* WHERE TO STAY */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold text-center">
        Where to Stay
      </h2>
      <div className="mt-4 max-w-3xl mx-auto text-center">
        <p className="leading-relaxed mb-3">
          {t('details.whereToStayText')}
        </p>
                
        <button
          onClick={() => setStayOpen(!stayOpen)}
          aria-expanded={stayOpen}
          aria-controls="stays-list"
          className="inline-flex items-center gap-2 mx-auto px-4 py-2 border rounded hover:opacity-80 transition"
        >
          {stayOpen ? 'Hide recommended stays' : 'Show recommended stays'}
          <span>{stayOpen ? '▲' : '▼'}</span>
        </button>
                
        {stayOpen && (
          <div id="stays-list" className="mt-4 animate-fadeIn">
            <ul className="list-none space-y-2 leading-relaxed">
              {[
                ['Hotel Roumani', 'https://www.hotelroumani.gr/', '100m', '***'],
                ['Klimis Hotel', 'https://www.klimishotel.gr/', '200m', '***'],
                ['Niriides Hotel', 'https://niriides-spetses.gr/', '300m', '***'],
                ['Armata Boutique Hotel', 'https://www.armatahotel.gr/', '300m', '***'],
                ['Kastro Hotel', 'https://www.kastrohotel-spetses.gr/', '500m', '***'],
                ['Nissia Traditional Residences', 'https://www.nissia.gr/', '550m', '****'],
                ['Mare Monte Luxury Suites', 'https://www.maremonteboutiquehotel.com/', '500m', '****'],
                ['Orloff Resort', 'https://www.orloffresort.com/', '1200m', '****'],
                ['Zoe’s Club Hotel', 'https://www.zoesclub.gr/', '300m', '****'],
                ['Poseidonion Grand Hotel', 'https://poseidonion.com/', '200m', '*****'],
              ].map(([name, link, distance, stars]) => (
                <li key={name}>
                  <a href={link} target="_blank" rel="noopener noreferrer" className="underline">
                    {name}
                  </a>{' '}
                  {stars} (Distance {distance})
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs">
              {t('details.whereToStayStarRating')}<br />
              {t('details.whereToStayFooter')}
            </p>
          </div>
        )}
      </div>
      
      {/* GETTING AROUND */}
      <h2 className="mt-12 text-base md:text-lg uppercase tracking-widest font-semibold text-center">
        Getting Around Spetses
      </h2>
      <div className="mt-4 max-w-3xl mx-auto text-center">
        <p className="leading-relaxed uppercase mb-3">
          {t('details.gettingAroundSpetsesText')}
        </p>
      
        <button
          onClick={() => setGettingOpen(!gettingOpen)}
          aria-expanded={gettingOpen}
          aria-controls="rentals-list"
          className="inline-flex items-center gap-2 mx-auto px-4 py-2 border rounded hover:opacity-80 transition"
        >
          {gettingOpen ? 'Hide recommended rentals' : 'Show recommended rentals'}
          <span>{gettingOpen ? '▲' : '▼'}</span>
        </button>
      
        {gettingOpen && (
          <div id="rentals-list" className="mt-4 animate-fadeIn">
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
      </div>
    </section>
  );
}
