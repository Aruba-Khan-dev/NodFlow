import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import {
  ArrowLeft,
  FileIcon,
  Image as ImageIcon,
  FileText,
  File,
  CheckCircle2,
  RotateCcw,
  Upload,
  Clock,
  Download,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import ActivityTimeline from "@/components/ActivityTimeline";
import ThreadedComments from "@/components/ThreadedComments";
import RevisionModal from "@/components/RevisionModal";
import UploadModal from "@/components/UploadModal";
import { freelancerProjects, type Deliverable, type Comment, type ActivityItem } from "@/data/sampleData";
import { toast } from "sonner";

interface DeliverableDetailsProps {
  role: "freelancer" | "client";
}

const defaultComments: Comment[] = [
  {
    id: "c1",
    author: "James Park",
    avatar: "JP",
    text: "This looks great! Just a few minor tweaks needed.",
    time: "2 days ago",
    replies: [
      {
        id: "r1",
        author: "Alex Rivera",
        avatar: "AR",
        text: "Thanks for the feedback! What tweaks are we talking about?",
        time: "2 days ago",
      },
    ],
  },
  {
    id: "c2",
    author: "Maria Lopez",
    avatar: "ML",
    text: "I love the color palette. Could we explore a version with a darker shade of blue?",
    time: "1 week ago",
  },
];

const defaultActivity: ActivityItem[] = [
  {
    id: "act1",
    type: "upload",
    message: "Brand_Guidelines.pdf uploaded",
    user: "Alex Rivera",
    time: "3 days ago",
  },
  {
    id: "act2",
    type: "comment",
    message: "James Park commented on the file",
    user: "James Park",
    time: "3 days ago",
  },
  {
    id: "act3",
    type: "approval",
    message: "File approved by Maria Lopez",
    user: "Maria Lopez",
    time: "1 week ago",
  },
];

const defaultVersions = [
  {
    id: "v1",
    versionNumber: 1,
    name: "Brand_Guidelines_v1.pdf",
    uploadedAt: "1 week ago",
    uploadedBy: "Alex Rivera",
    size: "3.2 MB",
    notes: "Initial version",
  },
];

const previewIcons: Record<string, React.ElementType> = {
  image: ImageIcon,
  pdf: FileText,
  doc: FileText,
  other: File,
};

const previewColors: Record<string, string> = {
  image: "from-primary/20 to-primary/5 text-primary",
  pdf: "from-rose-500/20 to-rose-500/5 text-rose-600",
  doc: "from-amber-500/20 to-amber-500/5 text-amber-600",
  other: "from-muted to-muted/50 text-muted-foreground",
};

const DeliverableDetails = ({ role }: { role: "freelancer" | "client" }) => {
  const { id, deliverableId } = useParams();
  const navigate = useNavigate();

  const project = freelancerProjects.find((p) => p.id === id);
  const deliverable = project?.deliverables.find((d) => d.id === deliverableId);

  const [status, setStatus] = useState<Deliverable["status"]>(deliverable?.status ?? "pending");
  const [comments, setComments] = useState<Comment[]>(deliverable?.comments ?? []);
  const [activity, setActivity] = useState<ActivityItem[]>(deliverable?.activity ?? []);
  const [versions, setVersions] = useState(deliverable?.versions ?? []);
  const [revisionOpen, setRevisionOpen] = useState(false);
  const [uploadOpen, setUploadOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"comments" | "versions" | "activity">("comments");

  const PreviewIcon = useMemo(() => previewIcons[deliverable?.previewType ?? "other"], [deliverable]);
  const previewColor = previewColors[deliverable?.previewType ?? "other"];

  if (!project || !deliverable) {
    return (
      <DashboardLayout role={role}>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Deliverable not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  const handleApprove = () => {
    setStatus("approved");
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: "approval",
      message: `${deliverable.name} approved`,
      user: role === "client" ? "You" : project.client,
      time: "Just now",
    };
    setActivity((prev) => [newActivity, ...prev]);
    toast.success("Deliverable approved!");
  };

  const handleRevisionSubmit = (comment: string) => {
    setStatus("revision-requested");
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: role === "client" ? "You" : project.client,
      avatar: role === "client" ? "YO" : "CL",
      text: comment,
      time: "Just now",
    };
    setComments((prev) => [...prev, newComment]);
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: "revision",
      message: `Revision requested on ${deliverable.name}`,
      user: role === "client" ? "You" : project.client,
      time: "Just now",
    };
    setActivity((prev) => [newActivity, ...prev]);
  };

  const handleAddComment = (text: string, parentId?: string) => {
    const me = role === "freelancer" ? "Alex Rivera" : "You";
    const avatar = role === "freelancer" ? "AR" : "YO";
    if (parentId) {
      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? { ...c, replies: [...(c.replies || []), { id: `r-${Date.now()}`, author: me, avatar, text, time: "Just now" }] }
            : c
        )
      );
    } else {
      setComments((prev) => [...prev, { id: `c-${Date.now()}`, author: me, avatar, text, time: "Just now" }]);
    }
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: "comment",
      message: `${me} commented on ${deliverable.name}`,
      user: me,
      time: "Just now",
    };
    setActivity((prev) => [newActivity, ...prev]);
  };

  const handleUploadClose = () => {
    const newVersion = {
      id: `v-${Date.now()}`,
      versionNumber: versions.length + 1,
      name: `${deliverable.name.replace(/\.[^.]+$/, "")}_v${versions.length + 1}.${deliverable.type.toLowerCase()}`,
      uploadedAt: "Just now",
      uploadedBy: "Alex Rivera",
      size: `${(Math.random() * 10 + 3).toFixed(1)} MB`,
      notes: "New version uploaded",
    };
    setVersions((prev) => [...prev, newVersion]);
    setStatus("pending");
    const newActivity: ActivityItem = {
      id: `act-${Date.now()}`,
      type: "upload",
      message: `${deliverable.name} v${versions.length + 1} uploaded`,
      user: "Alex Rivera",
      time: "Just now",
    };
    setActivity((prev) => [newActivity, ...prev]);
    setUploadOpen(false);
  };

  const tabs = [
    { key: "comments" as const, label: "Comments", count: comments.length },
    { key: "versions" as const, label: "Versions", count: versions.length },
    { key: "activity" as const, label: "Activity", count: activity.length },
  ];

  return (
    <DashboardLayout role={role}>
      <div className="max-w-5xl mx-auto space-y-6">
        <button
          onClick={() => navigate(`/${role}/project/${project.id}`)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to {project.name}
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Preview + Info */}
          <div className="lg:col-span-2 space-y-5">
            {/* File Preview */}
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-card">
              <div className={`aspect-video bg-gradient-to-br ${previewColor} flex flex-col items-center justify-center gap-3`}>
                <PreviewIcon className="w-16 h-16 opacity-60" />
                <span className="text-sm font-medium opacity-70">{deliverable.type} Preview</span>
                <span className="text-xs opacity-50">{deliverable.name}</span>
              </div>
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <h1 className="font-display text-xl font-bold text-brand mb-1">{deliverable.name}</h1>
                    <div className="flex items-center gap-3 flex-wrap">
                      <StatusBadge status={status} />
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {deliverable.uploadedAt}
                      </span>
                      <span className="text-xs text-muted-foreground">{deliverable.size}</span>
                      <span className="text-xs text-muted-foreground">v{versions.length}</span>
                    </div>
                  </div>
                  <button className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-brand text-brand-foreground text-sm font-medium hover:bg-brand-light transition-all shrink-0">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {role === "client" && status !== "approved" && (
                <button
                  onClick={handleApprove}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 text-sm font-semibold hover:bg-emerald-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Approve
                </button>
              )}
              {status !== "approved" && (
                <button
                  onClick={() => setRevisionOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20 text-sm font-semibold hover:bg-rose-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                >
                  <RotateCcw className="w-4 h-4" />
                  Request Revision
                </button>
              )}
              {role === "freelancer" && (
                <button
                  onClick={() => setUploadOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                >
                  <Upload className="w-4 h-4" />
                  Upload New Version
                </button>
              )}
              {status === "approved" && (
                <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-emerald-500/10 text-emerald-600 text-sm font-semibold">
                  <CheckCircle2 className="w-4 h-4" />
                  This deliverable is approved
                </span>
              )}
            </div>

            {/* Tabs */}
            <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
              <div className="flex border-b border-border">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex-1 px-4 py-3 text-sm font-medium transition-all relative ${
                      activeTab === tab.key
                        ? "text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {tab.label}
                    <span className="ml-1.5 text-xs opacity-60">({tab.count})</span>
                    {activeTab === tab.key && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-primary" />
                    )}
                  </button>
                ))}
              </div>

              <div className="p-5">
                {activeTab === "comments" && (
                  <ThreadedComments comments={comments} onAddComment={handleAddComment} />
                )}
                {activeTab === "versions" && (
                  <div className="space-y-3">
                    {[...versions].reverse().map((v, i) => (
                      <div
                        key={v.id}
                        className={`flex items-center gap-4 p-3 rounded-lg transition-colors ${
                          i === 0 ? "bg-accent border border-primary/20" : "hover:bg-muted/50"
                        }`}
                      >
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                          <span className="text-xs font-bold text-primary">v{v.versionNumber}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {v.name}
                            {i === 0 && <span className="ml-2 text-xs text-primary font-semibold">(Latest)</span>}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {v.uploadedBy} · {v.uploadedAt} · {v.size}
                          </p>
                          <p className="text-xs text-muted-foreground mt-0.5 italic">{v.notes}</p>
                        </div>
                        <button className="text-primary hover:text-primary/70 transition-colors shrink-0">
                          <Download className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
                {activeTab === "activity" && (
                  <ActivityTimeline items={activity} />
                )}
              </div>
            </div>
          </div>

          {/* Right: Sidebar info */}
          <div className="space-y-5">
            {/* File Info */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-card">
              <h3 className="font-display text-sm font-bold text-brand mb-4">File Details</h3>
              <div className="space-y-3">
                {[
                  { label: "Project", value: project.name },
                  { label: "Client", value: project.client },
                  { label: "Freelancer", value: project.freelancer },
                  { label: "File Type", value: deliverable.type },
                  { label: "File Size", value: deliverable.size },
                  { label: "Uploaded", value: deliverable.uploadedAt },
                  { label: "Versions", value: String(versions.length) },
                  { label: "Comments", value: String(comments.length) },
                ].map((item) => (
                  <div key={item.label} className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">{item.label}</span>
                    <span className="text-xs font-medium text-foreground">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Activity */}
            <div className="bg-card border border-border rounded-xl p-5 shadow-card">
              <h3 className="font-display text-sm font-bold text-brand mb-4">Recent Activity</h3>
              <ActivityTimeline items={activity.slice(0, 4)} />
            </div>
          </div>
        </div>
      </div>

      <RevisionModal
        open={revisionOpen}
        onClose={() => setRevisionOpen(false)}
        deliverableName={deliverable.name}
        onSubmit={handleRevisionSubmit}
      />
      <UploadModal open={uploadOpen} onClose={handleUploadClose} />
    </DashboardLayout>
  );
};

export default DeliverableDetails;