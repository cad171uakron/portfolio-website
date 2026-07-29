import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  authors: [{ name: "Carter Dockery", url: "https://www.linkedin.com/in/carter-dockery-924741350/" }],
  openGraph: {
    title: "Carter Dockery | Software Developer & Data Engineer",
    description:
      "Software Developer, Data & BI Developer, and IT Professional. Building full-stack applications, data pipelines, analytics dashboards, and IT automation tools.",
    type: "website",
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
      </body>
    </html>
  );
}
