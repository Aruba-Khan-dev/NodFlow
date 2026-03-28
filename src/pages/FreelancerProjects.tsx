import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Filter, ArrowUpRight, Plus, X } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { freelancerProjects, type ProjectStatus } from "@/data/sampleData";
import { toast } from "sonner";

const filters: { label: string; value: ProjectStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "In Progress", value: "in-progress" },
  { label: "Pending Approval", value: "pending-approval" },
  { label: "Approved", value: "approved" },
  { label: "Revision Requested", value: "revision-requested" },
];

const FreelancerProjects = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<ProjectStatus | "all">("all");
  const [createOpen, setCreateOpen] = useState(false);
  const [newName, setNewName] = useState("");
  const [newClient, setNewClient] = useState("");

  const filtered = freelancerProjects.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = () => {
    if (!newName.trim()) return;
    toast.success(`Project "${newName}" created successfully`);
    setCreateOpen(false);
    setNewName("");
    setNewClient("");
  };

  return (
    <DashboardLayout role="freelancer">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="font-display text-2xl md:text-3xl font-bold text-brand">Projects</h1>
          <button
            onClick={() => setCreateOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all self-start"
          >
            <Plus className="w-4 h-4" />
            Create Project
          </button>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-lg border border-border bg-card text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {filters.map((f) => (
              <button
                key={f.value}
                onClick={() => setStatusFilter(f.value)}
                className={`px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  statusFilter === f.value
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-card text-muted-foreground border-border hover:bg-accent"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Table */}
        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Client</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Deliverables</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Updated</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {filtered.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => navigate(`/freelancer/project/${project.id}`)}
                    className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{project.name}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{project.client}</td>
                    <td className="px-5 py-4"><StatusBadge status={project.status} /></td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{project.deliverables.length}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{project.lastActivity}</td>
                    <td className="px-5 py-4"><ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /></td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr><td colSpan={6} className="px-5 py-12 text-center text-sm text-muted-foreground">No projects found</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Mobile */}
          <div className="md:hidden divide-y divide-border">
            {filtered.map((project) => (
              <div key={project.id} onClick={() => navigate(`/freelancer/project/${project.id}`)} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{project.name}</p>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">{project.client} · {project.deliverables.length} deliverables</p>
                <div className="flex items-center justify-between">
                  <StatusBadge status={project.status} />
                  <span className="text-xs text-muted-foreground">{project.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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

export default FreelancerProjects;
