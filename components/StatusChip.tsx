import { STATUS_LABEL, type SystemStatus } from "@/lib/status";

/** Status light with a text label, so the state never depends on colour alone. */
export default function StatusChip({ status }: { status: SystemStatus | null }) {
  if (!status) return null;
  return (
    <span className={`status status--${status} mono`}>
      <span className="status__dot" aria-hidden="true" />
      {STATUS_LABEL[status]}
    </span>
  );
}
