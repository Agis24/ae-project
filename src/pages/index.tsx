import DateLocationTime from "@/components/DateLocationTime"
import Details from "@/components/Details"
import QandA from "@/components/Q&A"
import WeddingInfoTop from "@/components/WeddingInfoTop"
import { useRouter } from "next/router"
import CheckRSVP from "@/components/CheckRSVP"
import { useMemo } from "react"
import SuccessAnchor from "@/components/SuccessAnchor"

const PLUS_ONE_TOKENS = new Set(["plus1", "plusone", "plus-one"]);
const SOLO_ANCHOR_ID = "rsvp-success-anchor";
const PLUSONE_ANCHOR_ID = "rsvp-plusone-success-anchor";

function Divider() {
  return <div className="my-8 border-t border-gray-300 w-full opacity-60" />;
}

export default function Home() {
  const router = useRouter();
  const { isReady, query } = router;

  const isPlusOne = useMemo(() => {
    if (!isReady) return null; // query not ready yet
    const invite = typeof query.invite === "string" ? query.invite.toLowerCase() : "";
    const hasBooleanFlag = "plusone" in query || "plusOne" in query;
    return hasBooleanFlag || PLUS_ONE_TOKENS.has(invite);
  }, [isReady, query]);

  if (isPlusOne === null) return null; // or a tiny loader to avoid flicker

  const successPortalId = isPlusOne ? PLUSONE_ANCHOR_ID : SOLO_ANCHOR_ID;


  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <WeddingInfoTop/>
      <DateLocationTime 
        date="Saturday, 19 September 2026"
        locationMain="Saint George Church, Zogeria Beach"
        locationSub="Spetses, Greece"
        time="18:00"
        className="italic font-lichtner"
      />
      <Divider />
      <Details/>
      <Divider />
      <QandA/>
      <Divider />
      {/* Anchors (place exactly where you want success to appear) */}
      <SuccessAnchor id={SOLO_ANCHOR_ID} className="my-8" />
      <SuccessAnchor id={PLUSONE_ANCHOR_ID} className="my-8" />
      {/* Form renders here; success will be portaled above into the chosen anchor */}
      <CheckRSVP isPlusOne={!!isPlusOne} successPortalId={successPortalId} />
    </main>
  )
}