import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FolderKanban, Clock, FileCheck, Upload, ArrowUpRight, Plus, Activity, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import UploadModal from "@/components/UploadModal";
import { freelancerProjects } from "@/data/sampleData";
import { toast } from "sonner";

const statCards = [
  { label: "Total Projects", value: freelancerProjects.length, icon: FolderKanban, accent: "text-primary", bg: "bg-primary/10" },
  { label: "Pending Approvals", value: freelancerProjects.filter(p => p.status === "pending-approval").length, icon: Clock, accent: "text-amber-600", bg: "bg-amber-500/10" },
  { label: "Awaiting Feedback", value: freelancerProjects.filter(p => p.status === "revision-requested").length, icon: FileCheck, accent: "text-emerald-600", bg: "bg-emerald-500/10" },
];

const recentActivity = [
  { id: "ra1", message: "Brand_Guidelines.pdf v2 uploaded", time: "2 hours ago", type: "upload" as const },
  { id: "ra2", message: "Logo_Final.ai approved by James Park", time: "5 hours ago", type: "approval" as const },
  { id: "ra3", message: "Revision requested on Pitch_Deck_v2.pptx", time: "6 hours ago", type: "revision" as const },
  { id: "ra4", message: "Maria Lopez commented on Homepage_Mockup.fig", time: "1 day ago", type: "comment" as const },
];

const activityColors: Record<string, string> = {
  upload: "bg-primary/20 text-primary",
  approval: "bg-emerald-500/20 text-emerald-600",
  revision: "bg-amber-500/20 text-amber-600",
  comment: "bg-blue-500/20 text-blue-600",
};

const FreelancerDashboard = () => {
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newClient, setNewClient] = useState("");
  const recentProjects = freelancerProjects.slice(0, 4);

  const handleCreate = () => {
    if (!newName.trim()) return;
    toast.success(`Project "${newName}" created successfully`);
    setCreateOpen(false);
    setNewName("");
    setNewClient("");
  };

  return (
    <DashboardLayout role="freelancer">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl md:text-3xl font-bold text-brand">Welcome back</h1>
            <p className="text-sm text-muted-foreground mt-1">Here's what's happening across your projects</p>
          </div>
          <div className="flex gap-3 self-start">
            <button
              onClick={() => setCreateOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all"
            >
              <Plus className="w-4 h-4" />
              Create Project
            </button>
            <button
              onClick={() => setUploadOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all"
            >
              <Upload className="w-4 h-4" />
              Upload Deliverable
            </button>
          </div>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {statCards.map((card) => (
            <div key={card.label} className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center`}>
                  <card.icon className={`w-5 h-5 ${card.accent}`} />
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{card.value}</p>
              <p className="text-sm text-muted-foreground mt-0.5">{card.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Projects */}
          <div className="lg:col-span-2 bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-brand">Recent Projects</h2>
              <button onClick={() => navigate("/freelancer/projects")} className="text-xs text-primary hover:underline font-medium">View All</button>
            </div>
            <div className="divide-y divide-border">
              {recentProjects.map((project) => (
                <div
                  key={project.id}
                  onClick={() => navigate(`/freelancer/project/${project.id}`)}
                  className="px-5 py-4 hover:bg-accent/50 transition-colors cursor-pointer flex items-center justify-between gap-4"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{project.name}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{project.client} · {project.lastActivity}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <StatusBadge status={project.status} />
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
            <div className="px-5 py-4 border-b border-border flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-brand">Recent Activity</h2>
              <Activity className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="divide-y divide-border">
              {recentActivity.map((item) => (
                <div key={item.id} className="px-5 py-3.5">
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${activityColors[item.type]?.split(" ")[0] || "bg-muted"}`} />
                    <div>
                      <p className="text-sm text-foreground">{item.message}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />

      {/* Create Project Modal */}
      {createOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={() => setCreateOpen(false)}>
          <div className="bg-card border border-border rounded-2xl shadow-xl w-full max-w-md mx-4 p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-display text-lg font-bold text-foreground">Create New Project</h2>
              <button onClick={() => setCreateOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Project Name</label>
                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="e.g. Brand Identity Redesign" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-1.5 block">Client Name</label>
                <input value={newClient} onChange={(e) => setNewClient(e.target.value)} placeholder="e.g. Apex Ventures" className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setCreateOpen(false)} className="flex-1 px-4 py-2.5 rounded-lg border border-border text-sm font-medium text-muted-foreground hover:bg-accent transition-colors">Cancel</button>
              <button onClick={handleCreate} disabled={!newName.trim()} className="flex-1 px-4 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all disabled:opacity-50">Create Project</button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default FreelancerDashboard;