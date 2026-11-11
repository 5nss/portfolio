import { ArrowUpRight } from "@/components/Icons";
import { profile } from "@/content/profile";

export default function Footer({ live }: { live: boolean }) {
  const { links } = profile;
  return (
    <footer className="foot" id="contact">
      <div className="contact" data-reveal>
        <p className="contact__label mono">Contact</p>
        <h2>Open a channel.</h2>
        <p className="contact__text">{profile.lookingFor}</p>
        <div className="cta">
          <a className="btn btn--primary" href={links.linkedin} target="_blank" rel="noreferrer">
            Message on LinkedIn
            <ArrowUpRight />
          </a>
          <a className="btn" href={links.github} target="_blank" rel="noreferrer">
            GitHub
            <ArrowUpRight />
          </a>
          {links.email && (
            <a className="btn" href={`mailto:${links.email}`}>
              Email
            </a>
          )}
          {links.resume && (
            <a className="btn" href={links.resume} target="_blank" rel="noreferrer">
              Résumé
            </a>
          )}
        </div>
      </div>
      <p className="foot__note">
        Built with Next.js. Project data {live ? "syncs from" : "is a saved snapshot of"} github/{profile.handle}
        {live ? " every hour" : ""}, so this page updates itself when I ship something new.
      </p>
    </footer>
  );
}
