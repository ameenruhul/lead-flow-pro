import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft, Mail, Phone, Calendar, Clock, Tag, Send, MessageSquare,
  Plus, X, MoreHorizontal, User, Globe, Zap, FileText, CheckCircle2,
  AlertCircle, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const mockLeads: Record<string, {
  id: string; name: string; email: string; phone: string; status: string;
  source: string; lastContacted: string | null; createdDate: string;
  company: string; location: string;
}> = {
  "1": { id: "1", name: "Sarah Chen", email: "sarah@techcorp.com", phone: "+1 (555) 123-4567", status: "Active", source: "Google Sheets", lastContacted: "2024-01-15T10:30:00", createdDate: "2024-01-02T09:00:00", company: "TechCorp", location: "San Francisco, CA" },
  "2": { id: "2", name: "James Wilson", email: "james@startup.io", phone: "+1 (555) 234-5678", status: "New", source: "CSV Import", lastContacted: null, createdDate: "2024-01-14T14:20:00", company: "Startup.io", location: "Austin, TX" },
  "3": { id: "3", name: "Maria Garcia", email: "maria@enterprise.co", phone: "+1 (555) 345-6789", status: "Contacted", source: "Google Sheets", lastContacted: "2024-01-13T16:45:00", createdDate: "2024-01-05T11:30:00", company: "Enterprise Co", location: "New York, NY" },
};

const statusColors: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Responded: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Unsubscribed: "bg-red-500/10 text-red-400 border-red-500/20",
};

const timelineEvents = [
  { id: "t1", type: "detected", icon: FileText, label: "Row detected in Google Sheets", detail: "Row #42 — \"New signup from landing page\"", time: "Jan 15, 2024 · 10:30 AM" },
  { id: "t2", type: "automation", icon: Zap, label: "Automation triggered", detail: "\"Welcome Sequence\" started", time: "Jan 15, 2024 · 10:31 AM" },
  { id: "t3", type: "message", icon: Mail, label: "Email sent", detail: "Subject: Welcome to TechCorp — Delivered", time: "Jan 15, 2024 · 10:32 AM" },
  { id: "t4", type: "message", icon: MessageSquare, label: "SMS sent", detail: "\"Hi Sarah, thanks for signing up!\" — Delivered", time: "Jan 15, 2024 · 10:33 AM" },
  { id: "t5", type: "status", icon: CheckCircle2, label: "Status changed to Active", detail: "Triggered by automation rule", time: "Jan 15, 2024 · 10:35 AM" },
];

const typeColors: Record<string, string> = {
  detected: "bg-blue-500/10 text-blue-400",
  automation: "bg-amber-500/10 text-amber-400",
  message: "bg-emerald-500/10 text-emerald-400",
  status: "bg-violet-500/10 text-violet-400",
};

const formatDate = (iso: string) => new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

const AppLeadProfile = () => {
  const { leadId } = useParams<{ leadId: string }>();
  const { toast } = useToast();
  const lead = mockLeads[leadId || "1"] || mockLeads["1"];

  const [tags, setTags] = useState<string[]>(["VIP", "Onboarding"]);
  const [tagInput, setTagInput] = useState("");
  const [notes, setNotes] = useState([
    { id: "n1", text: "Interested in enterprise plan. Follow up next week.", date: "Jan 14, 2024" },
  ]);
  const [noteInput, setNoteInput] = useState("");
  const [sendDialog, setSendDialog] = useState<"email" | "sms" | null>(null);
  const [msgSubject, setMsgSubject] = useState("");
  const [msgBody, setMsgBody] = useState("");

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t)) {
      setTags([...tags, t]);
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => setTags(tags.filter((t) => t !== tag));

  const addNote = () => {
    if (!noteInput.trim()) return;
    setNotes([{ id: `n${Date.now()}`, text: noteInput.trim(), date: "Just now" }, ...notes]);
    setNoteInput("");
  };

  const handleSend = () => {
    toast({ title: `${sendDialog === "email" ? "Email" : "SMS"} sent`, description: `Message sent to ${lead.name}.` });
    setSendDialog(null);
    setMsgSubject("");
    setMsgBody("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <Link to="/app/leads">
            <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{lead.name}</h1>
            <p className="text-sm text-muted-foreground">{lead.company}</p>
          </div>
          <Badge variant="outline" className={statusColors[lead.status]}>{lead.status}</Badge>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column — Info + Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Lead Info Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="h-14 w-14 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <User className="h-7 w-7 text-primary" />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 flex-1">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                        <span className="text-foreground">{lead.location}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Source:</span>
                        <span className="text-foreground">{lead.source}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Created:</span>
                        <span className="text-foreground">{formatDate(lead.createdDate)}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Last contact:</span>
                        <span className="text-foreground">{lead.lastContacted ? formatDate(lead.lastContacted) : "Never"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Activity Timeline</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="relative space-y-0">
                  {timelineEvents.map((ev, i) => (
                    <div key={ev.id} className="relative flex gap-4 pb-6 last:pb-0">
                      {i < timelineEvents.length - 1 && (
                        <div className="absolute left-[17px] top-9 bottom-0 w-px bg-border" />
                      )}
                      <div className={`h-9 w-9 rounded-full flex items-center justify-center shrink-0 ${typeColors[ev.type]}`}>
                        <ev.icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground">{ev.label}</p>
                        <p className="text-sm text-muted-foreground truncate">{ev.detail}</p>
                        <p className="text-xs text-muted-foreground/60 mt-1">{ev.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right panel */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-2">
                <Button className="w-full justify-start" variant="outline" onClick={() => setSendDialog("email")}>
                  <Mail className="h-4 w-4 mr-2" /> Send Email
                </Button>
                <Button className="w-full justify-start" variant="outline" onClick={() => setSendDialog("sms")}>
                  <MessageSquare className="h-4 w-4 mr-2" /> Send SMS
                </Button>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Tags</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0">
                <div className="flex flex-wrap gap-2 mb-3">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="gap-1 pr-1">
                      {tag}
                      <button onClick={() => removeTag(tag)} className="ml-0.5 hover:text-destructive transition-colors">
                        <X className="h-3 w-3" />
                      </button>
                    </Badge>
                  ))}
                  {tags.length === 0 && <p className="text-sm text-muted-foreground">No tags yet.</p>}
                </div>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add tag…"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && addTag()}
                    className="h-9 text-sm"
                  />
                  <Button size="sm" variant="secondary" onClick={addTag}>
                    <Plus className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Notes</CardTitle>
              </CardHeader>
              <CardContent className="p-6 pt-0 space-y-3">
                <div className="flex gap-2">
                  <Textarea
                    placeholder="Add a note…"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    className="min-h-[60px] text-sm"
                  />
                </div>
                <Button size="sm" onClick={addNote} disabled={!noteInput.trim()} className="w-full">
                  <Plus className="h-3.5 w-3.5 mr-1.5" /> Add Note
                </Button>
                <Separator />
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {notes.map((note) => (
                    <div key={note.id} className="text-sm">
                      <p className="text-foreground">{note.text}</p>
                      <p className="text-xs text-muted-foreground/60 mt-1">{note.date}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Send Message Dialog */}
      <Dialog open={!!sendDialog} onOpenChange={() => setSendDialog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Send {sendDialog === "email" ? "Email" : "SMS"} to {lead.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            {sendDialog === "email" && (
              <Input placeholder="Subject" value={msgSubject} onChange={(e) => setMsgSubject(e.target.value)} />
            )}
            <Textarea
              placeholder={sendDialog === "email" ? "Write your email…" : "Write your message…"}
              value={msgBody}
              onChange={(e) => setMsgBody(e.target.value)}
              className="min-h-[120px]"
            />
            {sendDialog === "sms" && (
              <p className="text-xs text-muted-foreground text-right">{msgBody.length}/160 characters</p>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSendDialog(null)}>Cancel</Button>
            <Button onClick={handleSend} disabled={!msgBody.trim() || (sendDialog === "email" && !msgSubject.trim())}>
              <Send className="h-4 w-4 mr-1.5" /> Send
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppLeadProfile;
