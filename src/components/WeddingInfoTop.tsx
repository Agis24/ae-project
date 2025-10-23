import { withPrefix } from "@/lib/prefix";

export default function WeddingInfoTop() {
  return (
    <section className="text-center py-8">
      <img
        src={withPrefix('/Aristotelis_and_Elisavet.png')}
        alt="Aristotelis and Elisavet"
        width={800}
        height={300}
        className="mx-auto h-auto w-[90%] md:w-[70%] lg:w-[60%]"
      />
    </section>
  );
}