"use client";

import { useEffect, useState } from "react";

/** Types a word, holds, deletes it, then types the next one. Shows the first word until it mounts. */
export default function Typed({ words }: { words: readonly string[] }) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    if (words.length < 2) return;
    let word = 0;
    let length = words[0].length;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      // A fully typed word rests for a moment before it is deleted.
      if (!deleting && length === words[word].length) {
        deleting = true;
        timer = setTimeout(tick, 1900);
        return;
      }
      if (deleting && length === 0) {
        deleting = false;
        word = (word + 1) % words.length;
      }
      length += deleting ? -1 : 1;
      setText(words[word].slice(0, length));
      timer = setTimeout(tick, deleting ? 32 : 72);
    };

    timer = setTimeout(tick, 600);
    return () => clearTimeout(timer);
  }, [words]);

  return (
    <span className="typed" aria-label={words.join(", ")}>
      <span aria-hidden="true">{text}</span>
      <span className="cursor" aria-hidden="true" />
    </span>
  );
}
