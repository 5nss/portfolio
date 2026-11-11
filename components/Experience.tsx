import { ArrowUpRight } from "@/components/Icons";
import { experience, profile } from "@/content/profile";

export default function Experience() {
  const more = profile.links.resume
    ? { href: profile.links.resume, label: "View full résumé" }
    : { href: profile.links.linkedin, label: "View full profile on LinkedIn" };

  return (
    <section className="sec" id="experience" aria-labelledby="experience-label">
      <h2 className="sec__label mono" id="experience-label">
        Experience
      </h2>
      <ol className="list">
        {experience.map((e) => (
          <li key={`${e.role}-${e.org}`} className="item" data-reveal>
            <p className="item__date mono">
              {e.end === "Present" && <span className="dot dot--live" aria-hidden="true" />}
              {e.start} — {e.end}
            </p>
            <div className="item__body">
              <h3 className="item__title">
                {e.url ? (
                  <a href={e.url} target="_blank" rel="noreferrer">
                    {e.role} <span className="item__org">· {e.org}</span>
                    <ArrowUpRight />
                  </a>
                ) : (
                  <>
                    {e.role} <span className="item__org">· {e.org}</span>
                  </>
                )}
              </h3>
              <p className="item__text">{e.body}</p>
              <ul className="chips">
                {e.tags.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
      <p className="more" data-reveal>
        <a href={more.href} target="_blank" rel="noreferrer">
          {more.label}
          <ArrowUpRight />
        </a>
      </p>
    </section>
  );
}
