import Link from "next/link";
import "./globals.css";
import Footer from "@/components/Footer"
import {Poppins} from "next/font/google";
import Navigation from "@/components/Navigation";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <header>
          <Navigation />
        </header>
        <main>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
