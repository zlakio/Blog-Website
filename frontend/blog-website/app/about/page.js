import Link from "next/link";
export default function About(){
  return(
    <div>
      <h1 className="text-gray-100 text-4xl">I am Zlakio</h1>
      <p className="text-xl text-gray-400">
        I like building things and this whole website is basically a personal diary
      </p>
      <ul className="flex gap-3 flex-wrap">
        <li className="bg-gray-800 px-3 py-5 ">Python</li>
        <li className="bg-gray-800 px-3 py-5 ">Flask</li>
        <li className="bg-gray-800 px-3 py-5 ">Next.js</li>
      </ul>
      <div className="flex gap-2 flex-wrap">
        <Link href="https://github.com/zlakio">github</Link>
        
        <Link href="https://www.linkedin.com/in/mohd-mutasim-shaik-81a962315/">linkedIn</Link>

      </div>
    </div>
  )
}