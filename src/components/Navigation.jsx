'use client'
import NavLinks from './NavLinks'

function Navigation() {
  return (
    <nav>
        <NavLinks href="/" label="Home" />
        <div>
            <NavLinks href="/register" label="Register" />
            <NavLinks href="/login" label="Login" />
            <NavLinks href="/dashboard" label="Dashboard" />
        </div>
    </nav>
  )
}

export default Navigation