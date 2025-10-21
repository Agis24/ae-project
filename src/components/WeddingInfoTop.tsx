import Image from "next/image";

export default function WeddingInfoTop() {
  return (
    <section className="text-center py-8">
      <Image
        src="/Aristotelis_and_Elisavet.png"
        alt="Aristotelis and Elisavet"
        width={600}
        height={200}
        className="mx-auto h-auto w-[70%] md:w-[50%] lg:w-[40%]"
        priority
      />
    </section>
  );
}