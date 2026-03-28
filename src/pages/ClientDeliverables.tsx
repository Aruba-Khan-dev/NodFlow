import { useNavigate } from "react-router-dom";
import { ArrowUpRight, FileText, Image, FileCode, Package } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import { clientProjects } from "@/data/sampleData";

const typeIcons: Record<string, typeof FileText> = {
  image: Image,
  pdf: FileText,
  doc: FileCode,
  other: Package,
};

const ClientDeliverables = () => {
  const navigate = useNavigate();

  const allDeliverables = clientProjects.flatMap((project) =>
    project.deliverables.map((d) => ({
      ...d,
      projectId: project.id,
      projectName: project.name,
      freelancer: project.freelancer,
      latestVersion: d.versions.length,
    }))
  );

  return (
    <DashboardLayout role="client">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="font-display text-2xl md:text-3xl font-bold text-brand">Deliverables</h1>

        <div className="bg-card border border-border rounded-xl shadow-card overflow-hidden">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">File</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Version</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Uploaded</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {allDeliverables.map((d) => {
                  const Icon = typeIcons[d.previewType] || FileText;
                  return (
                    <tr
                      key={d.id}
                      onClick={() => navigate(`/client/project/${d.projectId}/deliverable/${d.id}`)}
                      className="border-b border-border last:border-0 hover:bg-accent/50 transition-colors cursor-pointer group"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-muted-foreground shrink-0" />
                          <span className="text-sm font-medium text-foreground">{d.name}</span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{d.projectName}</td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">v{d.latestVersion}</td>
                      <td className="px-5 py-4"><StatusBadge status={d.status} /></td>
                      <td className="px-5 py-4 text-sm text-muted-foreground">{d.uploadedAt}</td>
                      <td className="px-5 py-4"><ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" /></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="md:hidden divide-y divide-border">
            {allDeliverables.map((d) => {
              const Icon = typeIcons[d.previewType] || FileText;
              return (
                <div key={d.id} onClick={() => navigate(`/client/project/${d.projectId}/deliverable/${d.id}`)} className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                  <div className="flex items-center gap-2 mb-1">
                    <Icon className="w-4 h-4 text-muted-foreground" />
                    <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">{d.projectName} · v{d.latestVersion}</p>
                  <div className="flex items-center justify-between">
                    <StatusBadge status={d.status} />
                    <span className="text-xs text-muted-foreground">{d.uploadedAt}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ClientDeliverables;