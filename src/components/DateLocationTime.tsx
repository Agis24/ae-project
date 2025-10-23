import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import banner from '@/assets/AE_date.png';

export default function DateLocationTime({
    date = "",
    time = "18:00",
    className,
    }: {
        date?: string;
        locationMain?: string;
        locationSub?: string;
        time?: string;
        className?: string;
    }) {

        const { t, i18n } = useTranslation('common');
        console.log('Current locale:', i18n.language);

        return (
            <section id="date" className={`mx-auto max-w-3xl px-4 py-10 text-center ${className}`}>
                <div className="text-center py-4">
                  <Image
                    src={banner}
                    alt={date}
                    width={800}
                    height={250}
                    className="mx-auto h-auto w-[90%] md:w-[70%] lg:w-[60%]"
                    priority
                  />
                </div>
                <p className="mt-4 text-xl md:text-2xl italic leading-relaxed font-[var(--font-segoe)]">
                    {t('dateLocationTime.locationMain')}
                </p>
                <p className="mt-1 text-lg md:text-xl italic leading-relaxed text-neutral-700 font-[var(--font-segoe)]">
                    {t('dateLocationTime.locationSub')}
                </p>
                <p className="mt-6 text-base md:text-lg italic font-[var(--font-segoe)]"><span className="not-italic text-neutral-800">{t('dateLocationTime.timeLabel')}</span> 
                    {time}
                </p>
            </section>
        );
}
