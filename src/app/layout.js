import { Sora, Inter } from "next/font/google";
import Footer from "@/components/footer/Footer";
import "./globals.css";
import { ReactLenis } from "@/utils/lenis";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ReactLenis root>
      <body
        className={`${sora.variable} ${inter.variable} antialiased`}
      >
        {children}
        <Footer />
     
      </body>
      </ReactLenis>
    </html>
  );
}
