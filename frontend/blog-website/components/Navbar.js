import Link from 'next/link'
export default function Navbar(){
    return(
        <nav className="flex justify-between items-center p-4">
            <p>My Blog</p>
            <Link href="/">Home</Link>
            <Link href="/about">About</Link>
        </nav>
    )
}