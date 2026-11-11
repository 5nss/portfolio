import type { ReactNode } from "react";
import { ArrowUpRight } from "@/components/Icons";
import Preview from "@/components/Preview";
import StatusChip from "@/components/StatusChip";
import { profile } from "@/content/profile";
import type { SystemCard } from "@/lib/systems";
import { timeAgo } from "@/lib/time";

type Props = {
  systems: SystemCard[];
  now: Date;
  /** Rendered under the cards: the full repository list. */
  children?: ReactNode;
};

export default function Projects({ systems, now, children }: Props) {
  return (
    <section className="sec" id="projects" aria-labelledby="projects-label">
      <h2 className="sec__label mono" id="projects-label">
        Projects
      </h2>
      <ol className="list">
        {systems.map((s) => (
          <li key={s.repo} className="item item--project" data-reveal>
            <Preview repo={s.repo} name={s.name} media={s.preview} />
            <div className="item__body">
              <h3 className="item__title">
                {/* Hosted projects open the live site. Everything else opens the repo. */}
                <a href={s.demo ?? s.url} target="_blank" rel="noreferrer">
                  {s.name}
                  <ArrowUpRight />
                </a>
              </h3>
              {s.tagline && <p className="item__tagline">{s.tagline}</p>}
              <p className="item__text">{s.summary}</p>
              {s.highlights.length > 0 && (
                <ul className="points">
                  {s.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
              <p className="item__meta mono">
                <StatusChip status={s.status} />
                <span>{s.context}</span>
                {s.pushedAt && <span>Pushed {timeAgo(s.pushedAt, now)}</span>}
              </p>
              <p className="item__links mono">
                {s.demo && (
                  <a className="is-live" href={s.demo} target="_blank" rel="noreferrer">
                    <span className="dot dot--live" aria-hidden="true" />
                    Live demo
                  </a>
                )}
                <a href={s.url} target="_blank" rel="noreferrer">
                  Source
                </a>
              </p>
              {s.stack.length > 0 && (
                <ul className="chips" aria-label="Tech stack">
                  {s.stack.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
      {children}
      <p className="more" data-reveal>
        <a href={`${profile.links.github}?tab=repositories`} target="_blank" rel="noreferrer">
          View everything on GitHub
          <ArrowUpRight />
        </a>
      </p>
    </section>
  );
}
