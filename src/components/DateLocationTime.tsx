import React from "react";
import Image from "next/image";
import { t, Lang } from "@/i18n";

export default function DateLocationTime({
    date = "Saturday, 19 September 2026",
    locationMain = "Saint George Church, Zogeria Beach",
    locationSub = "Spetses, Greece",
    time = "18:00",
    className = "",
    lang = 'en',
    }: {
        date?: string;
        locationMain?: string;
        locationSub?: string;
        time?: string;
        className?: string;
        lang?: Lang;
    }) {
        const msg = t[lang].dateLocationTime
        return (
            <section id="date" className={`mx-auto max-w-3xl px-4 py-10 text-center ${className}`}>
                <div className="text-center py-4">
                  <Image
                    src="/AE_date.png"
                    alt={date}
                    width={800}
                    height={250}
                    className="mx-auto h-auto w-[90%] md:w-[70%] lg:w-[60%]"
                    priority
                  />
                </div>
                <p className="mt-4 text-xl md:text-2xl italic leading-relaxed font-[var(--font-segoe)]">
                    {locationMain}
                </p>
                <p className="mt-1 text-lg md:text-xl italic leading-relaxed text-neutral-700 font-[var(--font-segoe)]">
                    {locationSub}
                </p>
                <p className="mt-6 text-base md:text-lg italic font-[var(--font-segoe)]"><span className="not-italic text-neutral-800">Time: </span> 
                    {time}
                </p>
            </section>
        );
}
