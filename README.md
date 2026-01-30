## ✨ Features

- 🌐 Built-in i18n support (English, Chinese, Japanese)
- 🎨 Modern UI design with Tailwind CSS
- 🌙 Dark/Light theme toggle
- 📱 Responsive layout
- 📝 MDX blog system
- 🔍 SEO optimization
- 📊 Integrated analytics tools
  - Google Analytics
  - Baidu Analytics
  - Google Adsense
  - Vercel Analytics

## 📋 In this document

1. [Installation](#1-installation) — Set up the project locally
2. [How to upload blog](#2-how-to-upload-blog) — Add and publish blog posts

---

## 1. Installation

### Prerequisites

- **Node.js** 20.x (see `engines` in `package.json`)
- **Package manager**: pnpm 10.x (recommended), npm, or yarn

> **Note**: The project has `packageManager: "pnpm@10.12.4"` in `package.json`. You can use **pnpm**, **npm**, or **yarn**; enable Corepack only if you use pnpm.

### Steps

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd dna-website
   ```

2. **Enable Corepack** (only if using pnpm)

   ```bash
   corepack enable
   ```

3. **Install dependencies**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn
   ```

4. **Set up environment variables**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` and set at least:

   - `NEXT_PUBLIC_SITE_URL` — Your site URL (e.g. `http://localhost:3000` for dev)
   - Optional: Resend, Upstash, analytics IDs (see `.env.example`)

5. **Run the development server**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

---

## 2. How to upload blog

Blog posts are **file-based**: you add or edit `.mdx` files in the repo. There is no admin UI; “upload” means adding a new file (or editing an existing one) in the right folder with the correct frontmatter.

**Draft, preview, and download as MDX:** Use [blog-draft](https://blog-draft-livid.vercel.app/) to write posts in the browser, preview them, and download the result as an `.mdx` file you can drop into `blogs/[locale]/`.

### Where blog files live

- **Folder**: `blogs/[locale]/`
- **Locales**: `en`, `vi` (and optionally `ja`, `zh` if you use them)
- **Format**: One `.mdx` file per post, e.g. `blogs/en/my-post-slug.mdx`

### Steps to add a new blog post

1. **Pick the locale**  
   Create or use a folder under `blogs/` for that locale (e.g. `blogs/en/`, `blogs/vi/`).

2. **Create a new `.mdx` file**  
   Use a descriptive filename that matches the slug (e.g. `my-new-post.mdx` for slug `/my-new-post`).

3. **Add frontmatter at the top** (between `---` lines):

   ```yaml
   ---
   title: "Your Post Title"
   description: "Short description for SEO and listing pages."
   slug: /your-post-url-path
   image: /blog/your-image.jpg
   tags: tag1,tag2,tag3
   date: 2026-01-30
   visible: published
   pin: false
   ---
   ```

   | Field         | Required | Description                                                               |
   | ------------- | -------- | ------------------------------------------------------------------------- |
   | `title`       | Yes      | Post title.                                                               |
   | `description` | No       | Summary for SEO and cards.                                                |
   | `slug`        | Yes      | URL path (e.g. `/my-post` → `/blog/my-post` or `/[locale]/blog/my-post`). |
   | `image`       | No       | Path under `public/` (e.g. `/blog/1.jpg`).                                |
   | `tags`        | No       | Comma-separated.                                                          |
   | `date`        | Yes      | Publish date (YYYY-MM-DD).                                                |
   | `visible`     | No       | `published` (show) or `draft` / `invisible` (hide). Default: `published`. |
   | `pin`         | No       | `true` to pin post to top of lists. Default: `false`.                     |

4. **Add the body**  
   Below the closing `---`, write content in **Markdown** or **MDX** (components allowed if configured).

5. **Optional: add images**  
   Put images in `public/blog/` and reference them in frontmatter (`image: /blog/filename.jpg`) or [inside the post body](#adding-images-inside-a-blog-post).

6. **Publish**  
   Set `visible: published`. Save the file; the dev server will pick it up. For production, commit and deploy.

### Example: minimal new post

**File**: `blogs/en/hello-world.mdx`

```mdx
---
title: "Hello World"
description: "First post."
slug: /hello-world
date: 2026-01-30
visible: published
pin: false
---

Your content here. **Markdown** and MDX work.
```

### Adding images inside a blog post

To show images **in the post body** (not only the featured image in frontmatter):

1. **Put image files in `public/`**  
   Any path under `public/` is served from the site root. Common choice: `public/blog/` (e.g. `public/blog/diagram.png`).

2. **Use Markdown in the `.mdx` file**  
   Paths are from the **site root** (no `public/` in the URL):

   ```markdown
   ![Description of the image](/blog/diagram.png)
   ```

   Or with a title (optional):

   ```markdown
   ![Alt text](/blog/screenshot.jpg "Optional title on hover")
   ```

3. **Or use HTML/MDX `<img>` for more control**  
   Inline images are styled with rounded corners and spacing by the blog MDX components:

   ```mdx
   <img src="/blog/diagram.png" alt="Description" />
   ```

   You can add your own `className` if needed.

**Summary:** Place files in `public/blog/` (or another folder under `public/`), then reference them in the post with paths starting with `/` (e.g. `/blog/diagram.png`).

### Multilingual posts

To have the same post in multiple languages, add one `.mdx` per locale with the same `slug` (and translated `title`/`description`/body), e.g.:

- `blogs/en/my-post.mdx`
- `blogs/vi/my-post.mdx`

Full frontmatter and types are defined in `types/blog.ts`.

### Multiple people uploading at once

When several people add blog posts at the same time, avoid conflicts by naming **filenames** and **slugs** uniquely.

**Two things must be unique:**

1. **Filename** (e.g. `blogs/en/my-post.mdx`)

   - Must be unique per locale folder.
   - If two people use the same filename (e.g. `my-post.mdx`), Git will conflict or one file can overwrite the other.
   - **Suggested naming:** include date and topic (or author) so filenames rarely collide, e.g.
     - `2026-01-30-ai-tips.mdx`
     - `2026-01-30-john-enterprise-workflows.mdx`
   - Or use a short unique id: `my-post-abc123.mdx`.

2. **Slug** (in frontmatter: `slug: /my-post`)
   - Must be unique per locale. The slug is the URL path (e.g. `/blog/my-post`).
   - If two posts share the same slug, the site shows **one** of them for that URL (the first match in the sorted list).
   - **Suggested naming:** include date or a short id in the slug so URLs stay unique, e.g.
     - `slug: /2026-01-30-ai-tips`
     - `slug: /ai-tips-john`
   - Or coordinate with the team so each post has a different slug.

**Which blog renders first (order on the blog list)?**

Order is **deterministic** and does not depend on filename or who uploaded first:

1. **Pinned posts first** — All posts with `pin: true` appear at the top.
2. **Then by date (newest first)** — Within each group (pinned and non-pinned), posts are ordered by `date` descending (newest first).

**If multiple posts are pinned:** they all appear at the top, ordered among themselves by **date (newest first)**. There is no “first pinned wins”; the only tiebreaker is `date`. So to control the order of pinned posts, set their `date` values accordingly (newer date = higher in the list).

---
