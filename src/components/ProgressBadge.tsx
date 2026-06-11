import type { CourseStatus } from "@/lib/types";

const STATUS_CONFIG: Record<
  CourseStatus,
  { label: string; labelEn: string; color: string; bg: string; dot: string }
> = {
  "not-started": {
    label: "No iniciado",
    labelEn: "Not started",
    color: "text-muted",
    bg: "bg-muted/10 border-muted/20",
    dot: "bg-muted/50",
  },
  "in-progress": {
    label: "En progreso",
    labelEn: "In progress",
    color: "text-accent-yellow",
    bg: "bg-accent-yellow/10 border-accent-yellow/20",
    dot: "bg-accent-yellow",
  },
  completed: {
    label: "Completado",
    labelEn: "Completed",
    color: "text-accent-green",
    bg: "bg-accent-green/10 border-accent-green/20",
    dot: "bg-accent-green",
  },
  skipped: {
    label: "Ya lo se",
    labelEn: "Known",
    color: "text-accent-purple",
    bg: "bg-accent-purple/10 border-accent-purple/20",
    dot: "bg-accent-purple",
  },
};

export function ProgressBadge({ status }: { status: CourseStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color} ${config.bg}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}
