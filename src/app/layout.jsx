import Link from "next/link";
import "./globals.css";
import Poppins from "next/font/google";

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
            <Link href="/" className="nav-link">Home</Link>
            <Link href="/dashboard" className="nav-link">Dashboard</Link>
            <Link href="/login" className="nav-link">Login</Link>
            <Link href="/register" className="nav-link">Register</Link>
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
