"use client";
import React from "react";
import Image from "next/image";

const faqs = [
  {
    q: "When is the RSVP deadline?",
    a: `Whenever you’re able to, we’d love to hear from you — the earlier we know, the easier it will be for us to organize all the details.`,
  },
  {
    q: "Are kids welcome?",
    a: `As much as we love your little ones, we kindly inform you that our wedding will be an adults-only celebration.`,
  },
  {
    q: "What kind of shoes should/shouldn't I wear?",
    a: `Since our wedding will take place on the beach, with some sandy and slightly rocky areas to walk through,
        we recommend choosing comfortable shoes. Flats or low heels work best, stilettos and high heels are not ideal for the setting.`,
  },
  {
    q: "What should I do if I miss the boat to the ceremony?",
    a: `Don’t worry! You can still reach Zogeria Beach in two ways:
    
    • By sea taxi (about 15 minutes): Head to Dapia port and take the next available sea taxi directly to Zogeria Beach.
    
    • By scooter or motorbike (about 15 minutes): Ride to Zogeria Beach (where the reception will take place),
    then enjoy a short 7-minute walk along the trail to St. George’s Church.`,
  },
  {
    q: "Can I bring a date?",
    a: `We’re so looking forward to celebrating with you! At this time, we’re only able to include the guests listed on the invitation.
        If you have any questions or special circumstances, please don’t hesitate to get in touch.`,
  },
  {
    q: "Whom should I call with questions?",
    a: (
        <>
          You’re welcome to reach out to us anytime, we’ll be happy to assist you with anything you need.
          <br />
          Aristotelis:{" "}
          <a href="tel:+306984603110" className="underline">
            +30 6984603110
          </a>
          <br />
          Elisavet:{" "}
          <a href="tel:+306977370374" className="underline">
            +30 6977370374
          </a>
          <br />
          Christina (our planner):{" "}
          <a href="tel:+306945414465" className="underline">
            +30 6945414465
          </a>
        </>
    ),
  },
];

export default function QandA() {
  return (
    <section className="text-center px-4 font-[var(--font-segoe)]">
      <section className="text-center py-8">
        <Image
          src="/QandA.png"
          alt="Q & A"
          width={600}
          height={200}
          className="mx-auto h-auto w-[40%] md:w-[30%] lg:w-[20%]"
          priority
        />
      </section>
      <div className="max-w-3xl mx-auto text-left divide-y divide-neutral-300">
        {faqs.map((item, index) => (
          <details
            key={index}
            className="group py-5 cursor-pointer transition-all duration-200"
          >
            <summary className="flex justify-between items-center text-lg md:text-xl uppercase tracking-widest font-semibold">
              <span>{item.q}</span>
              <span className="text-2xl transform group-open:rotate-45 transition-transform duration-200">
                +
              </span>
            </summary>
            <div className="mt-3 whitespace-pre-line text-base md:text-lg leading-relaxed">
              {item.a}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}