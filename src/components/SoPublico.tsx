"use client";
import { usePathname } from "next/navigation";

export default function SoPublico({ children }: { children: React.ReactNode }) {
  return (usePathname() ?? "").startsWith("/admin") ? null : <>{children}</>;
}