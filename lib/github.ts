import snapshot from "@/content/github-snapshot.json";
import { profile } from "@/content/profile";

export type Repo = {
  name: string;
  description: string | null;
  language: string | null;
  url: string;
  /** The "Website" field on the repo, used as the live demo link. */
  homepage: string | null;
  topics: string[];
  pushedAt: string;
  stars: number;
  fork: boolean;
  size: number;
};

export type GithubData = {
  /** Own, non-empty repos, most recently pushed first. */
  repos: Repo[];
  /** Repos per primary language, largest first. */
  languages: { name: string; count: number }[];
  /** True when this came from the GitHub API, false when it is the saved snapshot. */
  live: boolean;
};

type ApiRepo = {
  name: string;
  description: string | null;
  language: string | null;
  html_url: string;
  homepage: string | null;
  topics?: string[];
  pushed_at: string;
  stargazers_count: number;
  fork: boolean;
  size: number;
};

/** How often the site re-checks GitHub, in seconds. */
export const SYNC_INTERVAL = 3600;

/** Add this topic to a repo on GitHub and it becomes a project card. */
export const FEATURE_TOPIC = "portfolio";

async function fetchRepos(): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "User-Agent": "portfolio-site",
  };
  // Optional. Without a token GitHub allows 60 requests per hour, which is plenty at one sync per hour.
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  const res = await fetch(
    `https://api.github.com/users/${profile.handle}/repos?per_page=100&sort=pushed`,
    { headers, next: { revalidate: SYNC_INTERVAL } },
  );
  if (!res.ok) throw new Error(`GitHub responded ${res.status}`);

  const data = (await res.json()) as ApiRepo[];
  return data.map((r) => ({
    name: r.name,
    description: r.description,
    language: r.language,
    url: r.html_url,
    homepage: r.homepage || null,
    topics: r.topics ?? [],
    pushedAt: r.pushed_at,
    stars: r.stargazers_count,
    fork: r.fork,
    size: r.size,
  }));
}

export async function getGithubData(): Promise<GithubData> {
  let all: Repo[];
  let live = true;
  try {
    all = await fetchRepos();
  } catch (err) {
    console.warn("[github] live sync failed, using snapshot:", (err as Error).message);
    all = snapshot as Repo[];
    live = false;
  }

  // Forks are someone else's work and empty repos have nothing to show.
  const repos = all
    .filter((r) => !r.fork && r.size > 0)
    .sort((a, b) => b.pushedAt.localeCompare(a.pushedAt));

  const counts = new Map<string, number>();
  for (const r of repos) {
    if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1);
  }
  const languages = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  return { repos, languages, live };
}
