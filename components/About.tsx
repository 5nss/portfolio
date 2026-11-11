import BuildLoop from "@/components/BuildLoop";
import { buildLoop, profile } from "@/content/profile";

/** Turns "plain **highlighted** plain" into text with <strong> around the starred part. */
function rich(text: string) {
  return text.split("**").map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function About() {
  return (
    <section className="sec" id="about" aria-labelledby="about-label">
      <h2 className="sec__label mono" id="about-label">
        About
      </h2>
      <div className="about" data-reveal>
        {profile.about.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{rich(paragraph)}</p>
        ))}
      </div>
      <div data-reveal>
        <BuildLoop steps={buildLoop} />
      </div>
    </section>
  );
}
