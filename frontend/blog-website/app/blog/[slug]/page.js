async function getPost(slug) {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 8000)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${slug}`, {
      next: { revalidate: 60 },
      signal: controller.signal,
    })
    clearTimeout(timeout)

    if (!res.ok) return null
    return await res.json()
  } catch (err) {
    console.error("Error fetching post:", err)
    return null
  }
}

export default async function BlogPost({params}) {
  const{slug} = await params
  const post = await getPost(slug)

  if (!post) {
    return (
      <main className="max-w-3xl mx-auto px-4 py-16">
        <p className="text-gray-400">Sorry, this post couldn&apos;t be loaded.</p>
      </main>
    )
  }

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