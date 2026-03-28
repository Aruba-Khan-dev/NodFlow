import { Upload, CheckCircle2, RotateCcw, MessageSquare, ArrowUpCircle } from "lucide-react";
import type { ActivityItem } from "@/data/sampleData";

const iconMap: Record<ActivityItem["type"], React.ElementType> = {
  upload: Upload,
  approval: CheckCircle2,
  revision: RotateCcw,
  comment: MessageSquare,
  "status-change": ArrowUpCircle,
};

const colorMap: Record<ActivityItem["type"], string> = {
  upload: "text-primary bg-primary/10",
  approval: "text-emerald-600 bg-emerald-500/10",
  revision: "text-rose-600 bg-rose-500/10",
  comment: "text-amber-600 bg-amber-500/10",
  "status-change": "text-muted-foreground bg-muted",
};

const ActivityTimeline = ({ items }: { items: ActivityItem[] }) => {
  return (
    <div className="space-y-0">
      {items.map((item, i) => {
        const Icon = iconMap[item.type];
        const color = colorMap[item.type];
        return (
          <div key={item.id} className="flex gap-3 group">
            {/* Line + icon */}
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${color}`}>
                <Icon className="w-3.5 h-3.5" />
              </div>
              {i < items.length - 1 && <div className="w-px flex-1 bg-border min-h-[24px]" />}
            </div>
            {/* Content */}
            <div className="pb-5 min-w-0">
              <p className="text-sm text-foreground leading-snug">{item.message}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{item.user} · {item.time}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ActivityTimeline;
