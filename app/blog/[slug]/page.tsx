import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPosts, getPost } from "@/lib/posts"

export function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) return {}
  return { title: `${post.title} — devlog-md`, description: post.description }
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = getPost(slug)
  if (!post) notFound()

  return (
    <article>
      <Link href="/" className="back">← all posts</Link>
      <h1>{post.title}</h1>
      <p className="meta">{post.date}</p>
      <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />
    </article>
  )
}
