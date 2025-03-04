import Link from "next/link";
import "./globals.css";
import {Poppins} from "next/font/google";
import NavLinks from "@/components/NavLinks";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function RootLayout({ children }) {

  return (
    <html lang="en" className={poppins.className}>
      <body>
        <header>
          <nav>
            <NavLinks href="/" label="Home" />
            <div>
              <NavLinks href="/dashboard" label="Dashboard" />
              <NavLinks href="/register" label="Register" />
            </div>
          </nav>
        </header>
        <main>
          {children}
        </main>
        <footer>Footer</footer>
      </body>
    </html>
  );
}
