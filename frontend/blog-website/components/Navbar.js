'use client'
import Link from 'next/link'
import { usePathname } from "next/navigation"
export default function Navbar(){
    const pathname = usePathname()
    return(
        <nav className="flex justify-between items-center px-4 py-3 gap-4 sticky top-0 border-b border-neutral-800 backdrop-blur">
            <p>My Blog</p>
            <Link 
              href="/"
              className={`px-4 py-2 rounded-lg transition ${pathname === '/' ? 'bg-indigo-600' : 'bg-neutral-800 hover:bg-neutral-700'}`}
            >
              Home
            </Link>
            <Link 
              href="/about"
              className={`px-4 py-2 rounded-lg transition ${pathname === '/about' ? 'bg-indigo-600' : 'bg-neutral-800 hover:bg-neutral-700'}`}
            >
              About
            </Link>
        </nav>
    )
}