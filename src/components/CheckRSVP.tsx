// components/CheckRSVP.tsx
import RSVP from "@/pages/rsvp";
import RSVPPlusOne from "@/pages/rsvp-plusone";

type Props = {
  isPlusOne?: boolean;
  successPortalId?: string;
  onSubmitted?: (payload: { confirmation?: string | null; names: string[]; email: string }) => void;
};

export default function CheckRSVP({ isPlusOne = false, successPortalId, onSubmitted }: Props) {
  return isPlusOne ? (
    <RSVPPlusOne successPortalId={successPortalId} onSubmitted={onSubmitted} />
  ) : (
    <RSVP successPortalId={successPortalId} onSubmitted={onSubmitted} />
  );
}
