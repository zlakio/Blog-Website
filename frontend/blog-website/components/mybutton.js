import Link from 'next/link'
export function MutasimButton(title) {
    return(
        <>
            <Link key={title} href="/"
            className='px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition'>{title}</Link>
        </>
    )
}