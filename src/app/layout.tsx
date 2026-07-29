import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingTerminal from "@/components/FloatingTerminal";
import KonamiHandler from "@/components/KonamiHandler";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Carter Dockery | Software Developer & Data Engineer",
  description:
    "Portfolio of Carter Dockery — Software Developer, Data & BI Developer, and IT Professional based in Copley, OH. Expert in SQL, Power BI, Python, JavaScript, Azure, and full-stack development.",
  keywords: [
    "Carter Dockery",
    "Software Developer",
    "Data Engineer",
    "Power BI",
    "Azure",
    "SQL",
    "JavaScript",
    "IT Professional",
    "Portfolio",
  ],
  metadataBase: new URL("https://www.carterdockery.com"),
  authors: [{ name: "Carter Dockery", url: "https://www.linkedin.com/in/carter-dockery-924741350/" }],
  openGraph: {
    title: "Carter Dockery | Software Developer & Data Engineer",
    description:
      "Software Developer, Data & BI Developer, and IT Professional. Building full-stack applications, data pipelines, analytics dashboards, and IT automation tools.",
    type: "website",
    url: "https://www.carterdockery.com",
    siteName: "Carter Dockery Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Carter Dockery | Software Developer & Data Engineer",
    description: "Software Developer, Data & BI Developer, and IT Professional.",
  },
  alternates: {
    canonical: "https://www.carterdockery.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="min-h-screen flex flex-col bg-[#070d1a]">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
        <FloatingTerminal />
        <KonamiHandler />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
