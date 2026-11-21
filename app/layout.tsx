import type { Metadata } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://lumiere-booking.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "LUMIÈRE | Ekskluzivne rezervacije frizerskih i beauty tretmana",
    template: "%s | LUMIÈRE",
  },
  description:
    "Rezervišite svog omiljenog stilistu, manikir, pedikir ili masažu u par sekundi. Pametni sistem preporuke zamjene i digitalni karton vašeg stila.",
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "bs_BA",
    url: SITE_URL,
    siteName: "LUMIÈRE",
    title: "LUMIÈRE | Vaš termin, vaš stilista, bez čekanja",
    description:
      "Nova generacija rezervacija za vrhunske salone ljepote, frizere i wellness centre.",
    images: [
      {
        url: `${SITE_URL}/og-lumiere.jpg`,
        width: 1200,
        height: 630,
        alt: "LUMIÈRE Beauty & Hair Booking Platforma",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "LUMIÈRE | Ekskluzivne beauty rezervacije",
    description:
      "Direktna rezervacija omiljenog frizera, manikira ili masaže sa pametnim sistemom zamjene.",
    images: [`${SITE_URL}/og-lumiere.jpg`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        "@id": `${SITE_URL}/#webapp`,
        name: "LUMIÈRE",
        url: SITE_URL,
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Web",
        description:
          "Platforma za direktnu online rezervaciju frizerskih, kozmetičkih i wellness tretmana sa odabirom željenog stiliste.",
      },
      {
        "@type": "BeautySalon",
        "@id": `${SITE_URL}/#beautysalon`,
        name: "LUMIÈRE Partner Saloni",
        url: SITE_URL,
        image: `${SITE_URL}/hero-lumiere.jpg`,
        priceRange: "$$ - $$$",
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Tretmani ljepote i njege",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Frizerske usluge i koloracija",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Manikir i pedikir",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Relaks i terapijske masaže",
              },
            },
          ],
        },
      },
    ],
  };

  return (
    <html lang="bs" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="bg-[#FAF8F5] text-[#1C1917] font-sans antialiased selection:bg-[#C6A87C]/30 selection:text-[#1C1917]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}