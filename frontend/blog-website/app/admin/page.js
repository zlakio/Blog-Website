'use client'
import { useEffect, useState } from "react";

export default function Admin(){
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [message, setMessage] = useState('')
  const [posts, setPosts] = useState([])
  const[isLoading,setIsLoading] =useState(false)

  useEffect(() => {
  if (isLoggedIn) {
    setIsLoading(true)
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`)
      .then(res => res.json())
      .then(data => {setPosts(data)

        setIsLoading(false)
      })
      
  }
}, [isLoggedIn])
  async function handleLogin(e) {
    
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
    const data = await res.json()
    console.log(data)
    if (res.ok){
      setIsLoggedIn(true)
    }
  }

  async function handleCreatePost(e) {
    e.preventDefault()
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts`,{
      method : 'POST',
      headers : {'Content-Type' :'application/json'},
      body : JSON.stringify({title,content,excerpt})
    })
    const data = await res.json()
    console.log(data)
    if (res.ok) {
    setMessage('Post published successfully!')
    setTitle('')
    setContent('')
    setExcerpt('')
    } else {
    setMessage('Something went wrong: ' + data.error)
  }
  }
  async function handleDelete(id) {
  await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/posts/${id}`, {
    method: 'DELETE'
  })
  setPosts(posts.filter(post => post.id !== id))
}

if (isLoggedIn){
  return(
    <form onSubmit={handleCreatePost} className="flex flex-col gap-4 max-w-sm mx-auto mt-16">
{isLoading ? (
  <p className="text-gray-400">Loading posts...</p>
) : (
        <div className="flex flex-col gap-3 mt-8">
  {posts.map(post => (
    <div key={post.id} className="flex justify-between items-center border border-neutral-700 px-4 py-2 rounded">
      <span>{post.title}</span>
      <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:text-red-300">
        Delete
      </button>
    </div>
  ))}
</div>
)}

      {message && <p className="text-green-400">{message}</p>}
      <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title" className="border border-neutral-900 text-white px-3 py-2 rounded"/>
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" className="border border-neutral-700 bg-neutral-900 text-white px-3 py-2 rounded"/>
      <input type="text" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Excerpt" className="border border-neutral-700 bg-neutral-900 text-white px-3 py-2 rounded"/>
      <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">Publish</button>
    </form>

  )
}

return(
  <form onSubmit={handleLogin} className="flex flex-col gap-4 max-w-sm mx-auto mt-16">
    <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} className="border border-neutral-700 bg-neutral-900 text-white px-3 py-2 rounded" placeholder="Username"/>
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="border border-neutral-700 bg-neutral-900 text-white px-3 py-2 rounded" placeholder="Password"/>
    <button type="submit" className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition">Login</button>
  </form>

)
}