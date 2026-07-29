async function getPost(slug) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`)
  const data = await res.json()
  return data
  
}

export default async function BlogPost({params}) {
  const{slug} = await params
  const post = await getPost(slug)

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <section className="flex flex-col gap-4">
        <h1 className="text-4xl font-bold">
          {post.title}
        </h1>
        <div className="flex flex-col gap-4">
    
          <p className="text-sm text-gray-500">{post["Created at"]}</p>
          <p className="text-gray-300 leading-relaxed">{post.Content}</p>
        </div>
      </section>
    </main>
  )
  
}