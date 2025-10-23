import DateLocationTime from "@/components/DateLocationTime"
import Details from "@/components/Details"
import QandA from "@/components/Q&A"
import WeddingInfoTop from "@/components/WeddingInfoTop"
import { useRouter } from "next/router"
import CheckRSVP from "@/components/CheckRSVP"
import { useEffect, useState } from "react"
import SuccessAnchor from "@/components/SuccessAnchor"
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import LangSelect from "@/components/LangSelect";
import { GetStaticProps } from "next"

const PLUS_ONE_TOKENS = "2p";
const SOLO_ANCHOR_ID = "rsvp-success-anchor";
const PLUSONE_ANCHOR_ID = "rsvp-plusone-success-anchor";

function getQueryString(q: Record<string, unknown>, key: string): string {
  const v = q[key];
  if (Array.isArray(v)) return String(v[0] ?? "");
  return v == null ? "" : String(v);
}

function Divider() {
  return <div className="h-32 w-px bg-neutral-800 mx-auto my-10" />;
}

export default function Home() {
  const router = useRouter();
  const { isReady, query } = router;
  // const { t, i18n } = useTranslation("common");

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const invite = getQueryString(query, "invite").toLowerCase().trim();

  const keyHasToken = Object.keys(query).some(
    (k) => k.toLowerCase().trim() === PLUS_ONE_TOKENS
  );

  const valueHasToken = invite === PLUS_ONE_TOKENS;

  const isPlusOne = isReady && (keyHasToken || valueHasToken);

  if (!mounted) return null;

  const successPortalId = isPlusOne ? PLUSONE_ANCHOR_ID : SOLO_ANCHOR_ID;

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      {!mounted ? (
        <div style={{ height: 200 }} />
      ) : (
        <>
           <div className="sticky top-0 z-50 flex justify-end px-5 py-2">
            <LangSelect value={router.locale ?? "el"} />
          </div>

          <WeddingInfoTop />
          <DateLocationTime className="italic font-[var(--font-segoe)]" />
          <Divider />
          <Details/>
          <Divider /> 
          <QandA/>
          <Divider />
          <SuccessAnchor id={SOLO_ANCHOR_ID} className="my-8" />
          <SuccessAnchor id={PLUSONE_ANCHOR_ID} className="my-8" />
          <CheckRSVP
            isPlusOne={isPlusOne}
            successPortalId={successPortalId}
          />
        </>
      )}
    </main>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale = "en" }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
};