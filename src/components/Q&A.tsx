"use client";
import React from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import banner from '@/assets/QandA.png';

export default function QandA() {
  const { t } = useTranslation();

  const faqs = [
    {
      q: t('qAndA.question1Label'),
      a: t('qAndA.question1Answer'),
    },
    {
      q: t('qAndA.question2Label'),
      a: t('qAndA.question2Answer'),
    },
    {
      q: t('qAndA.question3Label'),
      a: t('qAndA.question3Answer'),
    },
    {
      q: t('qAndA.question4Label'),
      a: `${t('qAndA.question4Answer')}\n${t('qAndA.question4Answer1')}\n${t('qAndA.question4Answer2')}`,
    },
    {
      q: t('qAndA.question5Label'),
      a: t('qAndA.question5Answer'),
    },
    {
      q: t('qAndA.question6Label'),
      a: (
          <>
            {t('qAndA.question6Answer')}
            <br />
            {t('qAndA.question6AnswerAristotelis')}
            <a href="tel:+306984603110" className="underline">
              +30 6984603110
            </a>
            <br />
            {t('qAndA.question6AnswerElisavet')}
            <a href="tel:+306977370374" className="underline">
              +30 6977370374
            </a>
            <br />
            {t('qAndA.question6AnswerChristina')}
            <a href="tel:+306945414465" className="underline">
              +30 6945414465
            </a>
          </>
      ),
    },
  ];


  return (
    <section className="text-center px-4 font-[var(--font-segoe)] text-sm md:text-base">
      <section className="text-center py-8">
        <Image
          src={banner}
          alt="Q & A"
          width={600}
          height={200}
          className="mx-auto h-auto w-[50%] md:w-[35%] lg:w-[25%]"
          priority
        />
      </section>

      <div className="max-w-3xl mx-auto text-left divide-y divide-neutral-300">
        {faqs.map((item, index) => (
          <details
            key={index}
            className="group py-4 cursor-pointer transition-all duration-200"
          >
            <summary className="flex justify-between items-center text-base md:text-lg tracking-wide font-semibold">
              <span>{item.q}</span>
              <span className="text-xl transform group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="mt-3 whitespace-pre-line text-sm md:text-base leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}