async function getPost(slug) {
  const res = await fetch(`http://localhost:5000/api/posts/${slug}`)
  const data = await res.json()
  return data
  
}

export default async function BlogPost({params}) {
  const{slug} = await params
  const post = await getPost(slug)

  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <section className="flex flex-col gap-4">
        <h2>
          {post.title}
        </h2>
        <p className="text-gray-600">
          {post.Content}
          {post["Created at"]}

        </p>
      </section>
    </main>
  )
  
}