import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/lib/env";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://psgassociate.com"),
  title: "PSG Associate | Manpower & Business Services - Rewari, Haryana",
  description:
    "PSG Associate is a leading manpower, security, housekeeping, facility management, stationery supply, IT services and web design company based in Rewari, Haryana. GSTIN: 06GFVPM7025D1Z5.",
  keywords:
    "manpower agency Rewari, security services Haryana, housekeeping services, facility management, IT services Rewari, web design Rewari, PSG Associate, business services Haryana",
  authors: [{ name: "PSG Associate" }],
  creator: "PSG Associate",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://psgassociate.com",
    title: "PSG Associate | Complete Workforce & Business Service Solutions",
    description:
      "PAN India manpower, security, housekeeping, facility management and IT services. Based in Rewari, Haryana.",
    siteName: "PSG Associate",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "PSG Associate Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PSG Associate | Manpower & Business Services",
    description:
      "Complete Workforce & Business Service Solutions. GSTIN: 06GFVPM7025D1Z5",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "PSG Associate",
              image: "/logo.png",
              "@id": "https://psgassociate.com",
              url: "https://psgassociate.com",
              telephone: "+919313045554",
              email: "psgassociate1@gmail.com",
              address: {
                "@type": "PostalAddress",
                streetAddress:
                  "167/3 Uttam Nagar, Near Skoda Showroom, Delhi Road",
                addressLocality: "Rewari",
                addressRegion: "Haryana",
                postalCode: "123401",
                addressCountry: "IN",
              },
              vatID: "06GFVPM7025D1Z5",
              priceRange: "$$",
              description:
                "PSG Associate is a professional manpower and business services company providing security, housekeeping, facility management, IT and web services across PAN India.",
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} antialiased`} suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[9999] btn-gold py-2 px-4"
        >
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
