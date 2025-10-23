// src/components/LangSelect.tsx
import { useRouter } from "next/router";

export default function LangSelect({ value }: { value: string }) {
  const router = useRouter();
  value = router.locale || 'en';

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <select
        value={value}
        onChange={async (e) => {
          const lang = e.target.value;
          await router.push(router.asPath, router.asPath, { locale: lang });
          router.reload(); // Force reload to ensure translations load
        }}
        className="px-2 py-1 bg-white border border-gray-300 rounded"
        aria-label="Select language"
      >
        <option value="en">EN</option>
        <option value="el">EL</option>
      </select>
    </label>
  );
}