import Link from "next/link";
export default function About(){
  return(
    <div className="max-w-3xl mx-auto px-4 py-16 flex flex-col gap-4">
      <h1 className="text-4xl font-bold text-gray-100">I am Zlakio</h1>
      <p className="text-xl text-gray-400">
        Using this as a Platform where i can track my progress
      </p>
      <ul className="flex gap-3 flex-wrap">
        <li className="bg-gray-800 px-3 py-5 ">Python</li>
        <li className="bg-gray-800 px-3 py-5 ">Flask</li>
        <li className="bg-gray-800 px-3 py-5 ">Next.js</li>
      </ul>
      <div className="flex gap-4 ">
        <Link href="https://github.com/zlakio" className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition">github</Link>
        
        <Link href="https://www.linkedin.com/in/mohd-mutasim-shaik-81a962315/" className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition">linkedIn</Link>

      </div>
    </div>
  )
}