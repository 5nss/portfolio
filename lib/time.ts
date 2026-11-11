const DAY = 86_400_000;

/** "today", "3d ago", "5w ago", "4mo ago", "2y ago" */
export function timeAgo(iso: string, now: Date = new Date()): string {
  const days = Math.max(0, Math.floor((now.getTime() - new Date(iso).getTime()) / DAY));
  if (days === 0) return "today";
  if (days < 14) return `${days}d ago`;
  if (days < 60) return `${Math.floor(days / 7)}w ago`;
  if (days < 365) return `${Math.floor(days / 30)}mo ago`;
  return `${Math.floor(days / 365)}y ago`;
}

/** "2026-10-15" */
export function isoDate(iso: string): string {
  return iso.slice(0, 10);
}
