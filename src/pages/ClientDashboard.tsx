import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, CheckCircle2, RotateCcw, ArrowUpRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { clientProjects, type Project } from "@/data/sampleData";
import { toast } from "sonner";

const ClientDashboard = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>(clientProjects);

  const pendingCount = projects.filter((p) => p.status === "pending-approval").length;
  const approvedCount = projects.filter((p) => p.status === "approved").length;

  const handleApprove = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: "approved" as const } : p))
    );
    toast.success("Project approved!");
  };

  const handleRevision = (e: React.MouseEvent, projectId: string) => {
    e.stopPropagation();
    setProjects((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, status: "revision-requested" as const } : p))
    );
    toast.info("Revision requested.");
  };

  return (
    <DashboardLayout role="client">
      <div className="max-w-6xl mx-auto space-y-8">
        <div>
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground mt-1">Review and approve deliverables from your creative team</p>
        </div>

        {/* Stat row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{pendingCount}</p>
            <p className="text-sm text-muted-foreground">Pending Approvals</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{approvedCount}</p>
            <p className="text-sm text-muted-foreground">Approved</p>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-shadow">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
              <RotateCcw className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-display font-bold text-foreground">{projects.length}</p>
            <p className="text-sm text-muted-foreground">Total Projects</p>
          </div>
        </div>

        {/* Projects */}
        <div className="space-y-4">
          <h2 className="font-display text-lg font-bold text-brand">Your Projects</h2>
          <div className="grid gap-4">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => navigate(`/client/project/${project.id}`)}
                className="bg-card border border-border rounded-xl p-5 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-display font-semibold text-foreground truncate">
                        {project.name}
                      </h3>
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={project.status} />
                      <span className="text-xs text-muted-foreground">{project.lastActivity}</span>
                    </div>
                  </div>

                  {project.status !== "approved" && (
                    <div className="flex gap-2 shrink-0">
                      <button
                        onClick={(e) => handleApprove(e, project.id)}
                        className="px-4 py-2 rounded-lg bg-emerald-500/10 text-emerald-600 text-sm font-medium hover:bg-emerald-500/20 transition-all border border-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                      >
                        Approve
                      </button>
                      <button
                        onClick={(e) => handleRevision(e, project.id)}
                        className="px-4 py-2 rounded-lg bg-rose-500/10 text-rose-600 text-sm font-medium hover:bg-rose-500/20 transition-all border border-rose-500/20 focus:outline-none focus:ring-2 focus:ring-rose-500/40"
                      >
                        Request Revision
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDashboard;