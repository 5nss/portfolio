import type { CSSProperties } from "react";
import PreviewVideo from "@/components/PreviewVideo";
import { profile } from "@/content/profile";
import type { PreviewMedia } from "@/lib/systems";

type Props = { repo: string; name: string; media: PreviewMedia | null };

const HUES = [38, 199, 160, 262];
const PATTERNS = ["flow", "bars", "matrix"] as const;

/** A stable number from a string, so each project always gets the same generated cover. */
function hash(text: string): number {
  let h = 7;
  for (const ch of text) h = (h * 31 + ch.charCodeAt(0)) % 100_003;
  return h;
}

/** Up to two capitals for the watermark: "AI Decision Tracker" -> "AD", "FixFlow" -> "FF". */
function monogram(name: string): string {
  const caps = name.replace(/[^A-Z]/g, "");
  return (caps.length >= 2 ? caps : name).slice(0, 2).toUpperCase();
}

/** Animated stand-in shown until a real screenshot is dropped into public/previews. */
function GeneratedCover({ repo, name }: { repo: string; name: string }) {
  const seed = hash(repo.toLowerCase());
  const pattern = PATTERNS[seed % PATTERNS.length];
  const style = { "--h": HUES[seed % HUES.length] } as CSSProperties;

  return (
    <div className="cover" style={style}>
      {pattern === "flow" && (
        <div className="cv-flow">
          {[0, 1, 2, 3].map((i) => (
            <i key={i} style={{ "--i": i } as CSSProperties} />
          ))}
        </div>
      )}
      {pattern === "bars" && (
        <div className="cv-bars">
          {Array.from({ length: 9 }, (_, i) => (
            <i key={i} style={{ "--i": i, height: `${22 + ((seed * (i + 3) * 7) % 70)}%` } as CSSProperties} />
          ))}
        </div>
      )}
      {pattern === "matrix" && (
        <div className="cv-matrix">
          {Array.from({ length: 32 }, (_, i) => (
            <i key={i} className={(seed * (i + 5)) % 4 === 0 ? "is-lit" : undefined} style={{ "--i": (seed + i * 3) % 9 } as CSSProperties} />
          ))}
        </div>
      )}
      <span className="cover__mono" aria-hidden="true">
        {monogram(name)}
      </span>
      <span className="cover__name mono">
        {profile.handle}/{repo}
      </span>
    </div>
  );
}

/** Mini browser window holding a screenshot, a hover-to-play clip, or a generated cover. */
export default function Preview({ repo, name, media }: Props) {
  return (
    <div className="preview" aria-hidden="true">
      <div className="preview__bar">
        <i />
        <i />
        <i />
      </div>
      {media?.video ? (
        <PreviewVideo src={media.video} poster={media.image} />
      ) : media?.image ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={media.image} alt="" loading="lazy" />
      ) : (
        <GeneratedCover repo={repo} name={name} />
      )}
    </div>
  );
}
