// components/SuccessAnchor.tsx
import React from "react";

type SuccessAnchorProps = {
  id: string;
  className?: string;
};

export default function SuccessAnchor({ id, className }: SuccessAnchorProps) {
  // Renders a plain div with the given id to be used as a portal target
  return <div id={id} className={className} />;
}
