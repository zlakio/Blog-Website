import Link from "next/link";
async function getPosts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
  const data = await res.json()
    console.log("data", data)
  return data
}
export default async function Home(){
  const posts = await getPosts()
  return(
    <main className="max-w-3xl mx-auto px-4 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">Hii, I am Zlakio</h1>
        <p className="text-xl text-gray-400">I love to build</p>
        <div className="flex gap-4"><Link href="https://github.com/zlakio" className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 tran">github</Link>
        <Link href="https://www.linkedin.com/in/mohd-mutasim-shaik-81a962315/" className="px-4 py-2 bg-neutral-800 rounded-lg hover:bg-neutral-700 transition">linkedin</Link></div>
        <>
        {posts.length===0 ?(
          <p className="text-gray-400">No posts yet. Check back soon !</p>
        ):(
          posts.map((post) => (
            
              <div key={post.id} className="flex flex-col gap-2 border-b border-neutral-800 pb-6">
              <h2 className="text-2xl font-bold">{post.title}</h2>
              <p className="text-gray-400">{post.Excerpt}</p>
              <div className="flex gap-3">
                <Link href={`/blog/${post.slug}`} className="text-indigo-400 hover:text-indigo-300 text-sm">Read more →</Link>
              </div>
            </div>
            
          ))
        )}
        </>
      </section>
    </main>
  )
}