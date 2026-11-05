import type { Metadata } from "next";
import Guarda from "@/components/admin/Guarda";

export const metadata: Metadata = { title: "Painel | Comunica +", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <Guarda>{children}</Guarda>;
}