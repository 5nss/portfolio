# Sudharsan S · Portfolio

A two-column portfolio built with Next.js: a sticky sidebar on the left, About / Experience / Projects scrolling on the right. Project data syncs from GitHub (`5nss`) once an hour, so the site keeps itself up to date.

## Run it locally

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

## Adding a new project

You have three levels, from zero effort to full control.

### 1. Do nothing

Push a new public repo. Within an hour it appears in the **All repositories** list. Forks and empty repos are skipped.

Tip: fill in the repo's **Description** on GitHub. That text is what the list shows.

### 2. Promote it to a project card (no code)

On the repo's GitHub page, click the gear next to **About** and:

- add the topic `portfolio`
- write a one-line **Description** (becomes the card text)
- add more topics such as `fastapi`, `langgraph`, `react` (become the tech chips)

The card appears on the next sync. Cards are sorted by most recent push, so new work rises to the top.

### 3. Write richer copy (one edit)

Add an entry to the `projects` list in `content/profile.ts`:

```ts
{
  repo: "my-new-repo",            // exact GitHub repo name
  name: "My New Project",
  tagline: "One line on what it is",
  summary: "Two sentences on the problem and what it does.",
  highlights: ["Most impressive thing", "Second most impressive thing"],
  context: "Solo build",          // or "Hackathon · <event>"
  stack: ["FastAPI", "LangGraph"],
},
```

A hand-written entry always wins over the automatic card for the same repo.

## Linking a hosted project

When a project is live, put its URL in the **Website** field of the repo on GitHub (gear next to **About**). On the next sync:

- clicking the card opens the live site instead of the repo
- a green **Live demo** link appears next to **Source**

## Project previews

Each card has a small browser window. Until you add media it shows an animated generated cover.

To show the real thing, drop files into `public/previews/`, named after the repo:

| File | What it does |
| --- | --- |
| `public/previews/fixflow.png` | Screenshot shown in the window. A tall, full-page screenshot scrolls top to bottom while the card is hovered. |
| `public/previews/fixflow.mp4` | Short clip that plays while the card is hovered. Keep it under about 10 seconds and 2 MB. |

`.webp`, `.jpg`, `.gif`, `.avif` and `.webm` also work. If you add both an image and a video, the image is used as the video's poster.

The file list is read when the server starts, so restart `npm run dev` after adding a file.

## Editing your details

Everything hand-written lives in `content/profile.ts`:

- `profile`: name, role, tagline, the About paragraphs, links. Fill in `links.email` or `links.resume` to show those buttons (put the PDF in `public/` and use `/resume.pdf`).
- `experience`: each entry has `start` and `end`, shown as "Aug 2026 — Present". Newest first.
- `projects`, `stack`, `signals`.

## How the automatic parts work

| What | Where |
| --- | --- |
| GitHub sync, hourly | `lib/github.ts` |
| Which repos become cards, and their order | `lib/systems.ts` |
| Status lights (in development / stable / archived) | `lib/status.ts` |
| Preview file list | `scripts/previews.mjs` writes `content/previews.json` |
| Saved copy used if GitHub is unreachable | `content/github-snapshot.json` |

## Deploying to Vercel

1. Push this folder to a new GitHub repo.
2. On vercel.com choose **Add New → Project** and import that repo. The defaults are correct.
3. Optional: add an environment variable `GITHUB_TOKEN` (a GitHub token with no scopes) to raise the API rate limit.

Every push to the repo redeploys the site.
