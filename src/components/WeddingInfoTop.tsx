import Image from "next/image";
import banner from '@/assets/Aristotelis_and_Elisavet.png';

export default function WeddingInfoTop() {
  return (
    <section className="text-center py-8">
      <Image
        src={banner}
        alt="Aristotelis and Elisavet"
        width={800}
        height={300}
        className="mx-auto h-auto w-[90%] md:w-[70%] lg:w-[60%]"
        priority
      />
    </section>
  );
}