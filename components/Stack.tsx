import { signals, stack } from "@/content/profile";
import type { GithubData } from "@/lib/github";

export default function Stack({ gh }: { gh: GithubData }) {
  const max = Math.max(1, ...gh.languages.map((l) => l.count));

  return (
    <section className="sec" id="stack" aria-labelledby="stack-label">
      <h2 className="sec__label mono" id="stack-label">
        Stack
      </h2>

      <dl className="stack" data-reveal>
        {stack.map((group) => (
          <div key={group.label}>
            <dt className="mono">{group.label}</dt>
            <dd>
              <ul className="chips">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>

      <div className="panel" data-reveal>
        <p className="panel__head mono">
          <span>Repos by primary language</span>
          <span>{gh.live ? "Live from GitHub" : "Saved snapshot"}</span>
        </p>
        <ul className="langs">
          {gh.languages.map((l) => (
            <li key={l.name} className="lang" title={`${l.name}: ${l.count} ${l.count === 1 ? "repo" : "repos"}`}>
              <span className="lang__name">{l.name}</span>
              <span className="lang__track" aria-hidden="true">
                <span className="lang__fill" style={{ width: `${(l.count / max) * 100}%` }} />
              </span>
              <span className="lang__n mono">{l.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <dl className="signals" data-reveal>
        {signals.map((s) => (
          <div key={s.label}>
            <dt>{s.label}</dt>
            <dd>{s.detail}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
