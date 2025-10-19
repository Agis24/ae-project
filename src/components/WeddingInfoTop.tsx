import Image from "next/image";

export default function WeddingInfoTop() {
  return (
    <section className="text-center py-20">
      <Image
        src="/Aristotelis_and_Elisavet.png"             // 👈 put your PNG file in /public
        alt="Aristotelis and Elisavet"
        width={600}                  // adjust to your image dimensions
        height={200}
        className="mx-auto h-auto w-auto"
        priority                     // loads it early for better LCP
      />
    </section>
  );
}