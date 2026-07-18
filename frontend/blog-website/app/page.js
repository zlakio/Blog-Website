import Link from "next/link";
async function getPosts() {
  const res = await fetch('http://localhost:5000/api/posts')
  const data = await res.json()
    console.log("data", data)
  return data
}
export default async function Home(){
  const posts = await getPosts()
  return(
    <main className="max-w-3xl mx-auto px-4 py-16">
      <section className="flex flex-col gap-4">
        <div className="text-3xl font-bold">Hii, I am Zlakio</div>
        <div className="text-xl font-bold">I love to build</div>
        <div className="flex gap-4"><Link href="https://github.com/zlakio">github</Link>
        <Link href="https://www.linkedin.com/in/mohd-mutasim-shaik-81a962315/">linkedin</Link></div>
        <>
          {
          posts.map((post) => (
            
              <div key={post.id}>
              <h2 className="text-3xl font-bold">{post.title}</h2>
              <p className="text-gray-600">{post.Excerpt}</p>
              <div className="flex gap-3">
                <Link href={`/blog/${post.slug}`}>Read more</Link>
              </div>
            </div>
            
          ))
        }
        </>
      </section>
    </main>
  )
}