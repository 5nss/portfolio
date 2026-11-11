import type { CSSProperties } from "react";
import Clock from "@/components/Clock";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/components/Icons";
import SectionNav, { type NavItem } from "@/components/SectionNav";
import Typed from "@/components/Typed";
import { profile } from "@/content/profile";
import type { GithubData } from "@/lib/github";
import type { SystemCard } from "@/lib/systems";
import { timeAgo } from "@/lib/time";

const NAV: NavItem[] = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "stack", label: "Stack" },
];

type Props = { gh: GithubData; systems: SystemCard[]; now: Date };

/** The left column. Stays in place on desktop while the right column scrolls. */
export default function Sidebar({ gh, systems, now }: Props) {
  const latest = gh.repos[0];
  const telemetry: [string, string][] = [
    ["public repos", String(gh.repos.length)],
    ["featured", `${systems.length} systems`],
    ["last push", latest ? `${timeAgo(latest.pushedAt, now)} · ${latest.name}` : "n/a"],
  ];

  return (
    <header className="side">
      <div>
        <p className="side__status mono">
          {profile.openToWork && (
            <span className="pill">
              <span className="dot dot--live" aria-hidden="true" />
              Open to work
            </span>
          )}
          <span className="side__clock">
            <Clock timeZone={profile.timeZone} /> {profile.timeZoneLabel}
          </span>
        </p>

        <h1 className="side__name">
          <a href="#top">{profile.name}</a>
        </h1>
        <p className="side__role">{profile.role}</p>
        <p className="side__typed mono">
          <span className="side__prompt">&gt; building</span> <Typed words={profile.building} />
        </p>
        <p className="side__tag">{profile.tagline}</p>

        <SectionNav items={NAV} />

        <div className="telemetry mono" aria-label="Live GitHub numbers">
          <p className="telemetry__head">
            <span>github/{profile.handle}</span>
            <span>{gh.live ? "live" : "snapshot"}</span>
          </p>
          {telemetry.map(([k, v], i) => (
            <p key={k} className="telemetry__row" style={{ "--i": i } as CSSProperties}>
              <span className="telemetry__k">{k}</span>
              <span className="telemetry__lead" aria-hidden="true" />
              <span className="telemetry__v">{v}</span>
            </p>
          ))}
        </div>
      </div>

      <ul className="social" aria-label="Profiles">
        <li>
          <a href={profile.links.github} target="_blank" rel="noreferrer" aria-label="GitHub">
            <GitHubIcon />
          </a>
        </li>
        <li>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
        </li>
        {profile.links.email && (
          <li>
            <a href={`mailto:${profile.links.email}`} aria-label="Email">
              <MailIcon />
            </a>
          </li>
        )}
      </ul>
    </header>
  );
}
