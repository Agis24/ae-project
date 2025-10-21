// components/SuccessAnchor.tsx
import React from "react";

type SuccessAnchorProps = {
  id: string;
  className?: string;
};

export default function SuccessAnchor({ id, className }: SuccessAnchorProps) {
  return <div id={id} className={className} />;
}
