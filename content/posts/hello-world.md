---
title: "Hello, devlog"
date: "2026-10-24"
description: "The first post — and a demonstration of the format."
tags: ["meta"]
---

This is a markdown file sitting in `content/posts/`. It became a page at `/blog/hello-world` with no CMS, no database, and no admin panel.

## The format

Every post needs `title` and `date` in frontmatter — posts missing either are skipped silently. `description` and `tags` are optional and show on the index card.

## Writing

Standard markdown, rendered by `marked`:

- **bold**, *italic*, `code`
- lists, links, images, blockquotes — all work
- headings become section anchors visually

## Ship a post

```sh
echo "post content" > content/posts/my-post.md
git add . && git commit -m "new post" && git push
```

That's the whole workflow.
