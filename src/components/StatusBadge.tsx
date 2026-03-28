import { cn } from "@/lib/utils";

type Status = "in-progress" | "pending-approval" | "approved" | "revision-requested" | "pending";

const statusConfig: Record<Status, { label: string; classes: string }> = {
  "in-progress": { label: "In Progress", classes: "bg-primary/10 text-primary border-primary/20" },
  "pending-approval": { label: "Pending Approval", classes: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  "pending": { label: "Pending", classes: "bg-amber-500/10 text-amber-600 border-amber-500/20" },
  "approved": { label: "Approved", classes: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" },
  "revision-requested": { label: "Revision Requested", classes: "bg-rose-500/10 text-rose-600 border-rose-500/20" },
};

const StatusBadge = ({ status }: { status: Status }) => {
  const config = statusConfig[status];
  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border", config.classes)}>
      {config.label}
    </span>
  );
};

export default StatusBadge;