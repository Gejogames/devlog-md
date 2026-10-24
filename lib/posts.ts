// File-based posts: markdown files in content/posts become routes at /blog/<slug>.
// No CMS, no database — write a .md file with frontmatter, commit, deploy.

import fs from "node:fs"
import path from "node:path"
import matter from "gray-matter"
import { marked } from "marked"

const postsDir = path.join(process.cwd(), "content", "posts")

export interface PostMeta {
  slug: string
  title: string
  date: string
  description: string
  tags: string[]
}

export interface Post extends PostMeta {
  html: string
}

interface Frontmatter {
  title?: string
  date?: string
  description?: string
  tags?: string[]
}

function readMeta(file: string): PostMeta | null {
  const slug = file.replace(/\.md$/, "")
  const raw = fs.readFileSync(path.join(postsDir, file), "utf8")
  const { data } = matter(raw) as { data: Frontmatter }
  if (!data.title || !data.date) return null
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description ?? "",
    tags: data.tags ?? [],
  }
}

export function getAllPosts(): PostMeta[] {
  if (!fs.existsSync(postsDir)) return []
  return fs
    .readdirSync(postsDir)
    .filter((f) => f.endsWith(".md"))
    .map(readMeta)
    .filter((p): p is PostMeta => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPost(slug: string): Post | null {
  const file = path.join(postsDir, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  const { data, content } = matter(fs.readFileSync(file, "utf8")) as {
    data: Frontmatter
    content: string
  }
  if (!data.title || !data.date) return null
  return {
    slug,
    title: data.title,
    date: data.date,
    description: data.description ?? "",
    tags: data.tags ?? [],
    html: marked.parse(content, { async: false }) as string,
  }
}
