"use client";

import { useEffect, useState } from "react";

export type NavItem = { id: string; label: string };

/** Sidebar navigation that highlights whichever section is currently being read. */
export default function SectionNav({ items }: { items: NavItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    // A thin band across the upper part of the screen: the section crossing it is the active one.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -65% 0px" },
    );
    for (const item of items) {
      const section = document.getElementById(item.id);
      if (section) io.observe(section);
    }
    return () => io.disconnect();
  }, [items]);

  return (
    <nav className="nav" aria-label="Sections">
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={item.id === active ? "is-active" : undefined}>
              <span className="nav__line" aria-hidden="true" />
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
