export type SystemStatus = "active" | "stable" | "archived";

export const STATUS_LABEL: Record<SystemStatus, string> = {
  active: "In development",
  stable: "Stable",
  archived: "Archived",
};

/** Change these two numbers to retune every status light on the site. */
const ACTIVE_WITHIN_DAYS = 30;
const ARCHIVED_AFTER_DAYS = 365;

/**
 * Decides which status light a project shows, from the date of its last push.
 * Used on every project card and every row of the repository table.
 */
export function getSystemStatus(pushedAt: string, now: Date = new Date()): SystemStatus {
  const daysSincePush = (now.getTime() - new Date(pushedAt).getTime()) / 86_400_000;

  // Pushed within the last month: clearly being worked on.
  if (daysSincePush <= ACTIVE_WITHIN_DAYS) return "active";
  // Untouched for over a year: finished and shelved.
  if (daysSincePush > ARCHIVED_AFTER_DAYS) return "archived";
  return "stable";
}
