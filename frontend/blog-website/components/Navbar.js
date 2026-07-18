import Link from 'next/link'
export default function Navbar(){
    return(
        <nav className="flex justify-between items-center p-4 sticky top-0 border-b border-neutral-800 backdrop-blur">
            <p>My Blog</p>
            <Link href="/"
            className='px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition'>Home</Link>
            <Link href="/about"
            className='px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition'>About</Link>
        </nav>
    )
}