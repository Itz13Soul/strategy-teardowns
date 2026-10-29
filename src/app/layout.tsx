import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import Link from "next/link";
import Nav from "../components/Nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "Strategy Teardowns",
  description: "Short, sourced strategy memos, each with a live model you can change.",
  authors: [{ name: "Divyansh Srivastava" }],
  creator: "Divyansh Srivastava",
  openGraph: { title: "Strategy Teardowns", type: "website", siteName: "Strategy Teardowns" },
  twitter: { card: "summary", title: "Strategy Teardowns" },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col text-zinc-100">
        <a href="#main" className="skip-link">Skip to content</a>
        <Nav />
        <div id="main" tabIndex={-1} className="flex-1 outline-none">{children}</div>
        <footer className="mx-auto w-full max-w-5xl px-4 py-8 text-xs text-zinc-400">
          © 2026 Divyansh Srivastava. All rights reserved. Developed by Divyansh Srivastava. Analysis for discussion, not investment advice.{" "}
          <Link href="/privacy" className="underline underline-offset-2 hover:text-zinc-300">Privacy</Link>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
