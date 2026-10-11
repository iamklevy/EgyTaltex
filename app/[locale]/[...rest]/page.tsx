import { notFound } from "next/navigation";

// Unknown URLs inside a locale render that locale's not-found page (with header/footer).
export default function CatchAll() {
  notFound();
}
