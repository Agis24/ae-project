// src/components/LangSelect.tsx
import { useRouter } from 'next/router';
import type { Lang } from '@/i18n';

export default function LangSelect({ value }: { value: Lang }) {
  const router = useRouter();

  return (
    <label className="inline-flex items-center gap-2 text-sm">
      <select
        value={value}
        onChange={(e) => {
          const lang = e.target.value as Lang;
          router.replace(
            { pathname: router.pathname, query: { ...router.query, lang } },
            undefined,
            { shallow: true }
          );
        }}
        className="px-2 py-1 bg-white"
        aria-label="Select language"
      >
        <option value="en">🇬🇧 EN</option>
        <option value="el">🇬🇷 EL</option>
      </select>
    </label>
  );
}
