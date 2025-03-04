'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function NavLinks({label, href}) {
    const pathname = usePathname();
  return (
    <Link href={href} className={`nav-link ${pathname === href ? 'nav-link-active' : ''}`}>{label}</Link>
  )
}

export default NavLinks