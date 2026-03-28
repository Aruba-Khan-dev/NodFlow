import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { clientProjects } from "@/data/sampleData";

const ClientProjects = () => {
  const navigate = useNavigate();

  return (
    <DashboardLayout role="client">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand">My Projects</h1>

        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Freelancer</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Deliverables</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Last Updated</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {clientProjects.map((project) => (
                  <tr
                    key={project.id}
                    onClick={() => navigate(`/client/project/${project.id}`)}
                    className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer group"
                  >
                    <td className="px-5 py-4 text-sm font-medium text-foreground">{project.name}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{project.freelancer}</td>
                    <td className="px-5 py-4"><StatusBadge status={project.status} /></td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{project.deliverables.length}</td>
                    <td className="px-5 py-4 text-sm text-muted-foreground">{project.lastActivity}</td>
                    <td className="px-5 py-4"><ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-border">
            {clientProjects.map((project) => (
              <div key={project.id} onClick={() => navigate(`/client/project/${project.id}`)} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <div className="flex items-start justify-between mb-2">
                  <p className="text-sm font-medium text-foreground">{project.name}</p>
                  <ArrowUpRight className="w-4 h-4 text-muted-foreground shrink-0 ml-2" />
                </div>
                <p className="text-xs text-muted-foreground mb-2">by {project.freelancer} · {project.deliverables.length} deliverables</p>
                <div className="flex items-center justify-between">
                  <StatusBadge status={project.status} />
                  <span className="text-xs text-muted-foreground">{project.lastActivity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientProjects;