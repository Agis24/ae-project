import React from "react";

export default function DateLocationTime({
    date = "Saturday, 19 September 2026",
    locationMain = "Saint George Church, Zogeria Beach",
    locationSub = "Spetses, Greece",
    time = "18:00",
    className = "",
    }: {
        date?: string;
        locationMain?: string;
        locationSub?: string;
        time?: string;
        className?: string;
    }) {
        return (
            <section id="date" className={`mx-auto max-w-3xl px-4 py-10 text-center ${className}`}>
                <p className="text-base md:text-lg italic leading-relaxed font-[Georgia]">
                    {date}
                </p>
                <p className="mt-4 text-xl md:text-2xl italic leading-relaxed font-[Georgia]">
                    {locationMain}
                </p>
                <p className="mt-1 text-lg md:text-xl italic leading-relaxed text-neutral-700 font-[Georgia]">
                    {locationSub}
                </p>
                <p className="mt-6 text-base md:text-lg italic font-[Georgia]"><span className="not-italic text-neutral-800">Time:</span> 
                    {time}
                </p>
            </section>
        );
}
