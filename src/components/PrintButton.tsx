"use client";
import { Download } from "lucide-react";
export default function PrintButton() {
  return (
    <button className="button" onClick={() => window.print()}>
      Print / save PDF <Download size={16} />
    </button>
  );
}
