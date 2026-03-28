import { useState } from "react";
import { Upload, CheckCircle, MessageSquare, RotateCcw, Bell } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { notifications as initialNotifications } from "@/data/sampleData";

const allActivity = [
  { id: "t1", type: "upload" as const, message: "Alex Rivera uploaded Brand_Guidelines.pdf v2", time: "Mar 5, 2026 · 4:00 PM", read: false },
  { id: "t2", type: "approval" as const, message: "James Park approved Logo_Final_v3.ai", time: "Mar 4, 2026 · 3:00 PM", read: false },
  { id: "t3", type: "revision" as const, message: "David Kim requested revision on Pitch_Deck_v2.pptx", time: "Mar 5, 2026 · 11:00 AM", read: true },
  { id: "t4", type: "comment" as const, message: "Sarah Chen commented on Brand_Guidelines.pdf", time: "Mar 5, 2026 · 2:30 PM", read: false },
  { id: "t5", type: "upload" as const, message: "Alex Rivera uploaded Mobile_Designs.fig", time: "Mar 5, 2026 · 9:00 AM", read: true },
  { id: "t6", type: "approval" as const, message: "Tom Wright approved Social_Pack.zip", time: "Mar 2, 2026 · 4:00 PM", read: true },
  { id: "t7", type: "comment" as const, message: "Maria Lopez commented on Homepage_Mockup.fig", time: "Mar 4, 2026 · 1:00 PM", read: true },
  { id: "t8", type: "revision" as const, message: "Maria Lopez requested revision on Product_Page.fig", time: "Mar 5, 2026 · 10:00 AM", read: false },
  { id: "t9", type: "upload" as const, message: "Alex Rivera uploaded AnnualReport_Draft.pdf v2", time: "Mar 5, 2026 · 4:00 PM", read: false },
  { id: "t10", type: "approval" as const, message: "Tom Wright approved Email_Template.html", time: "Mar 2, 2026 · 5:00 PM", read: true },
];

const typeConfig = {
  upload: { icon: Upload, color: "text-primary", bg: "bg-primary/10" },
  approval: { icon: CheckCircle, color: "text-emerald-600", bg: "bg-emerald-500/10" },
  revision: { icon: RotateCcw, color: "text-amber-600", bg: "bg-amber-500/10" },
  comment: { icon: MessageSquare, color: "text-blue-600", bg: "bg-blue-500/10" },
};

const NotificationsPage = ({ role }: { role: "freelancer" | "client" }) => {
  const [items, setItems] = useState(allActivity);
  const unreadCount = items.filter(i => !i.read).length;

  const markAllRead = () => setItems(prev => prev.map(i => ({ ...i, read: true })));

  return (
    <DashboardLayout role={role}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand">Notifications</h1>
            <p className="text-sm text-muted-foreground mt-1">{unreadCount} unread</p>
          </div>
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="text-xs text-primary hover:underline font-medium">Mark all as read</button>
          )}
        </div>

        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden divide-y divide-border">
          {items.map((item) => {
            const config = typeConfig[item.type];
            const Icon = config.icon;
            return (
              <div
                key={item.id}
                onClick={() => setItems(prev => prev.map(i => i.id === item.id ? { ...i, read: true } : i))}
                className={`px-5 py-4 flex items-start gap-4 cursor-pointer transition-colors hover:bg-accent/50 ${!item.read ? "bg-primary/5" : ""}`}
              >
                <div className={`w-9 h-9 rounded-lg ${config.bg} flex items-center justify-center shrink-0 mt-0.5`}>
                  <Icon className={`w-4 h-4 ${config.color}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className={`text-sm ${!item.read ? "font-semibold text-foreground" : "text-foreground"}`}>{item.message}</p>
                  <p className="text-xs text-muted-foreground mt-1">{item.time}</p>
                </div>
                {!item.read && <div className="w-2 h-2 rounded-full bg-primary shrink-0 mt-2" />}
              </div>
            );
          })}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default NotificationsPage;