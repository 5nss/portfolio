import rawPreviews from "@/content/previews.json";
import { profile, projects, type Project } from "@/content/profile";
import { FEATURE_TOPIC, type GithubData, type Repo } from "@/lib/github";
import { getSystemStatus, type SystemStatus } from "@/lib/status";

export type PreviewMedia = { image?: string; video?: string };

export type SystemCard = Project & {
  url: string;
  /** The repo's "Website" field on GitHub. When set, the card links to the live project. */
  demo: string | null;
  pushedAt: string | null;
  status: SystemStatus | null;
  /** Screenshot and/or short clip from public/previews, matched by repo name. */
  preview: PreviewMedia | null;
};

const previews = rawPreviews as Record<string, PreviewMedia>;

/** "ai-decision-tracker" -> "Ai Decision Tracker" */
function prettyName(repo: string): string {
  return repo
    .replace(/[-_]+/g, " ")
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/** A card built purely from what GitHub knows about the repo. */
function cardFromRepo(repo: Repo): Project {
  const stack = repo.topics.filter((t) => t !== FEATURE_TOPIC);
  if (repo.language && !stack.some((t) => t.toLowerCase() === repo.language!.toLowerCase())) {
    stack.unshift(repo.language);
  }
  return {
    repo: repo.name,
    name: prettyName(repo.name),
    tagline: "",
    summary: repo.description ?? "Description coming soon.",
    highlights: [],
    context: "New build",
    stack,
  };
}

/**
 * The project cards, newest first.
 *
 * A repo gets a card in one of two ways:
 *   1. it has the `portfolio` topic on GitHub (zero code), or
 *   2. it has a hand-written entry in content/profile.ts (richer copy).
 * A hand-written entry wins when both exist.
 */
export function buildSystems(gh: GithubData, now: Date = new Date()): SystemCard[] {
  const byName = new Map(gh.repos.map((r) => [r.name.toLowerCase(), r]));
  const written = new Set(projects.map((p) => p.repo.toLowerCase()));

  const tagged = gh.repos
    .filter((r) => r.topics.includes(FEATURE_TOPIC) && !written.has(r.name.toLowerCase()))
    .map(cardFromRepo);

  return [...projects, ...tagged]
    .map((p) => {
      const repo = byName.get(p.repo.toLowerCase());
      return {
        ...p,
        url: repo?.url ?? `${profile.links.github}/${p.repo}`,
        demo: repo?.homepage ?? null,
        pushedAt: repo?.pushedAt ?? null,
        status: repo ? getSystemStatus(repo.pushedAt, now) : null,
        preview: previews[p.repo.toLowerCase()] ?? null,
      };
    })
    .sort((a, b) => (b.pushedAt ?? "").localeCompare(a.pushedAt ?? ""));
}
