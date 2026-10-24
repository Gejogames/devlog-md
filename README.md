# devlog-md

A minimal markdown-file blog for Next.js. Write a `.md` file in `content/posts/`, commit, deploy — that's the entire CMS. Extracted from a production studio site.

## Why

Devlogs shouldn't need a database or a headless CMS. Posts are files, files are git, git is the version history. If you can write markdown, you can publish.

## Stack

- Next.js App Router — static export-ready, posts are prerendered at build
- `gray-matter` for frontmatter, `marked` for rendering
- No Tailwind, no UI kit — one `globals.css` you can actually read

## Use it

```sh
npm install
npm run dev
```

Then write `content/posts/my-post.md`:

```md
---
title: "My post"
date: "2026-10-24"
description: "shown on the index card"
tags: ["tag1", "tag2"]
---

Markdown body here.
```

## Structure

- `content/posts/*.md` — your posts (slug = filename)
- `lib/posts.ts` — the whole pipeline, ~70 lines
- `app/page.tsx` — index listing
- `app/blog/[slug]/page.tsx` — post page with `generateStaticParams` + per-post metadata

## Notes

- Posts missing `title` or `date` frontmatter are skipped rather than crashing the build
- Posts render with `dangerouslySetInnerHTML` — it's *your* markdown, but if you ever accept posts from others, sanitize first
- Posts are sorted by date string — `YYYY-MM-DD` sorts correctly, keep that format

## License

MIT
