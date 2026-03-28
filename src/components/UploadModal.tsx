import { useState } from "react";
import { X, Upload, FileIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadModal = ({ open, onClose }: UploadModalProps) => {
  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  if (!open) return null;

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files.length) setFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = () => {
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      toast.success(`"${file.name}" uploaded successfully!`);
      setFile(null);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-card-hover border border-border w-full max-w-md mx-4 p-6 animate-fade-in-up"
        style={{ animationDelay: "0.05s", opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-lg font-bold text-foreground">Upload Deliverable</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer ${
            dragOver ? "border-primary bg-accent" : "border-border hover:border-primary/40 hover:bg-accent/50"
          }`}
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <Upload className="w-8 h-8 mx-auto mb-3 text-muted-foreground" />
          <p className="text-sm text-foreground font-medium mb-1">
            {file ? file.name : "Drop file here or click to browse"}
          </p>
          <p className="text-xs text-muted-foreground">
            {file ? `${(file.size / 1024 / 1024).toFixed(1)} MB` : "PDF, AI, FIG, PSD, ZIP up to 50MB"}
          </p>
          <input id="file-input" type="file" className="hidden" onChange={(e) => e.target.files?.length && setFile(e.target.files[0])} />
        </div>

        {file && (
          <div className="mt-4 flex items-center gap-3 p-3 bg-muted rounded-lg">
            <FileIcon className="w-5 h-5 text-primary shrink-0" />
            <span className="text-sm text-foreground truncate flex-1">{file.name}</span>
            <button onClick={() => setFile(null)} className="text-muted-foreground hover:text-destructive transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="flex gap-3 mt-6">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!file || uploading}
            className="flex-1 py-2.5 rounded-lg bg-brand text-brand-foreground text-sm font-semibold hover:bg-brand-light transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {uploading ? <><Loader2 className="w-4 h-4 animate-spin" /> Uploading…</> : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadModal;
