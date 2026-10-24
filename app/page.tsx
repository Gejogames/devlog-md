import Link from "next/link"
import { getAllPosts } from "@/lib/posts"

export default function Home() {
  const posts = getAllPosts()
  return (
    <>
      <Link href="/" className="brand">devlog-md</Link>
      <div className="post-list">
        {posts.length === 0 && (
          <p>
            No posts yet. Drop a markdown file in <code>content/posts/</code> —
            see <code>hello-world.md</code> for the frontmatter format.
          </p>
        )}
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="post-card">
            <p className="meta">{post.date}</p>
            <h2>{post.title}</h2>
            {post.description && <p>{post.description}</p>}
            {post.tags.length > 0 && (
              <div className="tags">
                {post.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            )}
          </Link>
        ))}
      </div>
    </>
  )
}
