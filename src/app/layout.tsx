import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "nullsec8 | Full-Stack Developer",
    template: "%s | nullsec8",
  },
  description: "17-year-old CS student building toward a future in AI and systems. Check out my projects and get in touch.",
  keywords: ["full-stack developer", "portfolio", "AI", "systems programming", "next.js", "react"],
  authors: [{ name: "nullsec8" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nullsec8.dev",
    siteName: "nullsec8 Portfolio",
    images: [
      {
        url: "https://nullsec8.dev/og-image.png",
        width: 1200,
        height: 630,
        alt: "nullsec8 Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "nullsec8 | Full-Stack Developer",
    description: "17-year-old CS student building toward a future in AI and systems.",
    images: ["https://nullsec8.dev/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "nullsec8",
    url: "https://nullsec8.dev",
    sameAs: [
      "https://github.com/nullsec8",
      "https://discord.com/users/nullsec8",
    ],
    jobTitle: "Full-Stack Developer",
    description: "17-year-old Computer Science student building toward a future in AI and systems.",
    knowsAbout: ["AI/ML", "Systems Programming", "Full-Stack Development", "Cybersecurity"],
  };

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="min-h-full flex flex-col bg-black text-white">
        <a href="#main-content" className="skip-to-content">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
