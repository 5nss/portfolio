import StatusChip from "@/components/StatusChip";
import type { GithubData } from "@/lib/github";
import { getSystemStatus } from "@/lib/status";
import type { SystemCard } from "@/lib/systems";
import { isoDate, timeAgo } from "@/lib/time";

/** Every public repo, with no curation. New repos show up here on their own. */
export default function Repos({ gh, systems, now }: { gh: GithubData; systems: SystemCard[]; now: Date }) {
  // When a repo has no description on GitHub, borrow the tagline from its project card.
  const taglines = new Map(systems.map((s) => [s.repo.toLowerCase(), s.tagline]));
  const describe = (name: string, description: string | null) =>
    description || taglines.get(name.toLowerCase()) || "No description yet";

  return (
    <div className="panel repos-panel" data-reveal>
        <p className="panel__head mono">
          <span>All repositories</span>
          <span>
            {gh.repos.length} public · {gh.live ? "synced hourly" : "saved snapshot"}
          </span>
        </p>
        <ul className="repos">
          {gh.repos.map((r) => (
            <li key={r.name}>
              <a className="repo" href={r.url} target="_blank" rel="noreferrer">
                <span className="repo__main">
                  <span className="repo__name">{r.name}</span>
                  <span className="repo__desc">{describe(r.name, r.description)}</span>
                </span>
                <span className="repo__lang mono">{r.language ?? "n/a"}</span>
                <time className="repo__date mono" dateTime={r.pushedAt} title={isoDate(r.pushedAt)}>
                  {timeAgo(r.pushedAt, now)}
                </time>
                <StatusChip status={getSystemStatus(r.pushedAt, now)} />
              </a>
            </li>
          ))}
        </ul>
    </div>
  );
}
