"use client";

import { Fragment, useEffect, useState } from "react";

type Step = { key: string; title: string; body: string };

/**
 * Spec -> Agent -> Build -> Verify -> Ship.
 * Advances on its own, pauses while the pointer is over it, and each step can be clicked.
 */
export default function BuildLoop({ steps }: { steps: readonly Step[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 2400);
    return () => clearInterval(id);
  }, [paused, steps.length]);

  const step = steps[active];

  return (
    <div
      className="loop"
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <p className="loop__head mono">
        <span>How I build</span>
        <span>{paused ? "paused" : "running"}</span>
      </p>

      <div className="loop__rail">
        {steps.map((s, i) => (
          <Fragment key={s.key}>
            <button
              type="button"
              className={`loop__node mono${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
              aria-pressed={i === active}
              onClick={() => setActive(i)}
            >
              {s.key}
            </button>
            {i < steps.length - 1 && <span className={`loop__link${i < active ? " is-done" : ""}`} aria-hidden="true" />}
          </Fragment>
        ))}
      </div>

      {/* The key restarts the fade each time the step changes. */}
      <div className="loop__detail" key={step.key} aria-live="off">
        <p className="loop__title">
          <span className="mono">0{active + 1}</span>
          {step.title}
        </p>
        <p className="loop__body">{step.body}</p>
      </div>
    </div>
  );
}
