import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, FileIcon, Upload, ArrowUpRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import StatusBadge from "@/components/StatusBadge";
import UploadModal from "@/components/UploadModal";
import ActivityTimeline from "@/components/ActivityTimeline";
import { freelancerProjects, type Deliverable } from "@/data/sampleData";

const ProjectDetails = ({ role }: { role: "freelancer" | "client" }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [uploadOpen, setUploadOpen] = useState(false);

  const project = freelancerProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <DashboardLayout role={role}>
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Project not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  const fileTypeIcon = (d: Deliverable) => {
    const colors: Record<string, string> = {
      image: "text-primary bg-primary/10",
      pdf: "text-rose-600 bg-rose-500/10",
      doc: "text-amber-600 bg-amber-500/10",
      other: "text-muted-foreground bg-muted",
    };
    return colors[d.previewType] || colors.other;
  };

  return (
    <DashboardLayout role={role}>
      <div className="max-w-5xl mx-auto space-y-6">
        <button
          onClick={() => navigate(`/${role}`)}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          Back to Dashboard
        </button>

        {/* Project Header */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-card">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <h1 className="font-display text-2xl font-bold text-brand mb-1">{project.name}</h1>
              <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
              <div className="flex items-center gap-3 flex-wrap">
                <StatusBadge status={project.status} />
                <span className="text-xs text-muted-foreground">Client: {project.client}</span>
                <span className="text-xs text-muted-foreground">Freelancer: {project.freelancer}</span>
                <span className="text-xs text-muted-foreground">Last activity: {project.lastActivity}</span>
              </div>
            </div>
            {role === "freelancer" && (
              <button
                onClick={() => setUploadOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all shrink-0"
              >
                <Upload className="w-4 h-4" />
                Upload Deliverable
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Deliverables list */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="font-display text-lg font-bold text-brand">
              Deliverables ({project.deliverables.length})
            </h2>
            <div className="space-y-3">
              {project.deliverables.map((d) => (
                <div
                  key={d.id}
                  onClick={() => navigate(`/${role}/project/${project.id}/deliverable/${d.id}`)}
                  className="bg-card border border-border rounded-xl p-4 shadow-card hover:shadow-card-hover transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 ${fileTypeIcon(d)}`}>
                      <FileIcon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <p className="text-sm font-medium text-foreground truncate">{d.name}</p>
                        <ArrowUpRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {d.size} · {d.uploadedAt} · {d.versions.length} version{d.versions.length !== 1 ? "s" : ""} · {d.comments.length} comment{d.comments.length !== 1 ? "s" : ""}
                      </p>
                    </div>
                    <StatusBadge status={d.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="space-y-4">
            <h2 className="font-display text-lg font-bold text-brand">Activity</h2>
            <div className="bg-card border border-border rounded-xl p-5 shadow-card">
              <ActivityTimeline items={project.activity} />
            </div>
          </div>
        </div>
      </div>
      <UploadModal open={uploadOpen} onClose={() => setUploadOpen(false)} />
    </DashboardLayout>
  );
};

export default ProjectDetails;