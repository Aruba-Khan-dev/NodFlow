import type { Comment } from "@/data/sampleData";
import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";

interface ThreadedCommentsProps {
  comments: Comment[];
  onAddComment: (text: string, parentId?: string) => void;
}

const CommentBubble = ({ comment, onReply }: { comment: Comment; onReply: (id: string) => void }) => {
  return (
    <div className="group">
      <div className="flex gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-bold shrink-0">
          {comment.avatar}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline gap-2 mb-0.5">
            <span className="text-sm font-semibold text-foreground">{comment.author}</span>
            <span className="text-xs text-muted-foreground">{comment.time}</span>
          </div>
          <p className="text-sm text-foreground/80 leading-relaxed">{comment.text}</p>
          <button
            onClick={() => onReply(comment.id)}
            className="text-xs text-primary hover:underline underline-offset-2 mt-1 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            Reply
          </button>
        </div>
      </div>
      {comment.replies && comment.replies.length > 0 && (
        <div className="ml-11 mt-3 space-y-3 border-l-2 border-border pl-4">
          {comment.replies.map((reply) => (
            <div key={reply.id} className="flex gap-3">
              <div className="w-7 h-7 rounded-full bg-accent text-accent-foreground flex items-center justify-center text-xs font-bold shrink-0">
                {reply.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2 mb-0.5">
                  <span className="text-sm font-semibold text-foreground">{reply.author}</span>
                  <span className="text-xs text-muted-foreground">{reply.time}</span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{reply.text}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ThreadedComments = ({ comments, onAddComment }: ThreadedCommentsProps) => {
  const [newComment, setNewComment] = useState("");
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    onAddComment(newComment, replyTo || undefined);
    toast.success("Comment added.");
    setNewComment("");
    setReplyTo(null);
  };

  return (
    <div className="space-y-5">
      {comments.map((c) => (
        <CommentBubble key={c.id} comment={c} onReply={(id) => setReplyTo(id)} />
      ))}

      {comments.length === 0 && (
        <p className="text-sm text-muted-foreground text-center py-4">No comments yet.</p>
      )}

      <form onSubmit={handleSubmit} className="flex gap-2 pt-2 border-t border-border">
        <div className="flex-1 relative">
          {replyTo && (
            <div className="text-xs text-primary mb-1 flex items-center gap-1">
              Replying to comment
              <button type="button" onClick={() => setReplyTo(null)} className="text-muted-foreground hover:text-foreground">✕</button>
            </div>
          )}
          <input
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment…"
            className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground text-sm transition-all focus:outline-none focus:ring-2 focus:ring-ring hover:border-primary/40"
          />
        </div>
        <button
          type="submit"
          disabled={!newComment.trim()}
          className="px-3 py-2.5 rounded-lg bg-gradient-primary text-primary-foreground transition-all hover:opacity-90 disabled:opacity-40 shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};

export default ThreadedComments;