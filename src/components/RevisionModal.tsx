import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface RevisionModalProps {
  open: boolean;
  onClose: () => void;
  deliverableName: string;
  onSubmit: (comment: string) => void;
}

const RevisionModal = ({ open, onClose, deliverableName, onSubmit }: RevisionModalProps) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  if (!open) return null;

  const handleSubmit = () => {
    if (!comment.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onSubmit(comment);
      toast.info("Revision requested with feedback.");
      setComment("");
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="bg-card rounded-2xl shadow-card-hover border border-border w-full max-w-md mx-4 p-6 animate-fade-in-up"
        style={{ animationDelay: "0.05s", opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-bold text-foreground">Request Revision</h3>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 hover:bg-muted">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-muted-foreground mb-4">
          Provide feedback for <span className="font-medium text-foreground">{deliverableName}</span>
        </p>

        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Describe what changes are needed…"
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent hover:border-primary/40 resize-none"
          autoFocus
        />

        <div className="flex gap-3 mt-5">
          <button onClick={onClose} className="flex-1 py-2.5 rounded-lg border border-border text-sm font-medium text-foreground hover:bg-muted transition-all">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={!comment.trim() || loading}
            className="flex-1 py-2.5 rounded-lg bg-rose-500/10 text-rose-600 border border-rose-500/20 text-sm font-semibold hover:bg-rose-500/20 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Sending…</> : "Request Revision"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RevisionModal;