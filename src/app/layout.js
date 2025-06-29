import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ResumifAI | Summarize YouTube videos in seconds!",
  description:
    "Generate automatic summaries of YouTube videos quickly and easily with ResumifAI.",
  openGraph: {
    title: "ResumifAI | Summarize YouTube videos in seconds!",
    description:
      "Generate automatic summaries of YouTube videos quickly and easily with ResumifAI.",
    siteName: "ResumifAI",
    images: [
      {
        url: "/ResumifAiIcon.png",
        width: 512,
        height: 512,
        alt: "ResumifAI logo",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumifAI | Summarize YouTube videos in seconds!",
    description:
      "Generate automatic summaries of YouTube videos quickly and easily with ResumifAI.",
    images: ["/ResumifAiIcon.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="bg-[#110b2c]">
      <head>
        <link rel="icon" href="/ResumifAiIcon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
