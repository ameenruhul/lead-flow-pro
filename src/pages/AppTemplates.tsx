import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Copy, Archive, Mail, MessageSquare, Clock, Tag, Variable, Search, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type Template = {
  id: string;
  title: string;
  type: "email" | "sms";
  category: string;
  variables: string[];
  lastEdited: string;
  preview: string;
  archived: boolean;
};

const INITIAL_TEMPLATES: Template[] = [
  { id: "1", title: "Welcome Email", type: "email", category: "Onboarding", variables: ["name", "company"], lastEdited: "2 hours ago", preview: "Hi {{name}}, welcome to {{company}}! We're thrilled to have you on board…", archived: false },
  { id: "2", title: "Follow-Up Nudge", type: "email", category: "Nurture", variables: ["name", "product"], lastEdited: "1 day ago", preview: "Hey {{name}}, just checking in – did you get a chance to explore {{product}}?", archived: false },
  { id: "3", title: "Re-engagement", type: "email", category: "Win-back", variables: ["name", "offer"], lastEdited: "3 days ago", preview: "Hi {{name}}, it's been a while! Here's an exclusive {{offer}} just for you…", archived: false },
  { id: "4", title: "Meeting Invite", type: "email", category: "Sales", variables: ["name", "date", "link"], lastEdited: "5 days ago", preview: "Hi {{name}}, I'd love to schedule a quick call on {{date}}. Here's my link: {{link}}", archived: false },
  { id: "5", title: "Quick Reminder", type: "sms", category: "Reminder", variables: ["name", "event"], lastEdited: "4 hours ago", preview: "Hi {{name}}, friendly reminder about {{event}} tomorrow. Reply STOP to opt out.", archived: false },
  { id: "6", title: "Confirmation", type: "sms", category: "Transactional", variables: ["name", "ref"], lastEdited: "1 day ago", preview: "{{name}}, your request #{{ref}} has been confirmed. Reply STOP to unsubscribe.", archived: false },
  { id: "7", title: "Promo Blast", type: "sms", category: "Marketing", variables: ["name", "discount"], lastEdited: "2 days ago", preview: "{{name}}, grab {{discount}}% off this weekend only! Shop now. Reply STOP to opt out.", archived: false },
];

const CATEGORIES_EMAIL = ["All", "Onboarding", "Nurture", "Win-back", "Sales"];
const CATEGORIES_SMS = ["All", "Reminder", "Transactional", "Marketing"];

export default function AppTemplates() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [templates, setTemplates] = useState(INITIAL_TEMPLATES);
  const [search, setSearch] = useState("");
  const [tab, setTab] = useState<"email" | "sms">("email");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ title: "", category: "", body: "" });

  const categories = tab === "email" ? CATEGORIES_EMAIL : CATEGORIES_SMS;

  const filtered = templates.filter(
    (t) =>
      t.type === tab &&
      !t.archived &&
      (categoryFilter === "All" || t.category === categoryFilter) &&
      (search === "" || t.title.toLowerCase().includes(search.toLowerCase()))
  );

  const handleDuplicate = (t: Template) => {
    const dup: Template = {
      ...t,
      id: Date.now().toString(),
      title: `${t.title} (Copy)`,
      lastEdited: "Just now",
    };
    setTemplates((prev) => [dup, ...prev]);
    toast({ title: "Template Duplicated", description: `"${dup.title}" created.` });
  };

  const handleArchive = (t: Template) => {
    setTemplates((prev) => prev.map((x) => (x.id === t.id ? { ...x, archived: true } : x)));
    toast({ title: "Template Archived", description: `"${t.title}" moved to archive.` });
  };

  const handleCreate = () => {
    if (!newTemplate.title.trim()) return;
    const vars = (newTemplate.body.match(/\{\{(\w+)\}\}/g) || []).map((v) => v.replace(/[{}]/g, ""));
    const created: Template = {
      id: Date.now().toString(),
      title: newTemplate.title,
      type: tab,
      category: newTemplate.category || (tab === "email" ? "Nurture" : "Marketing"),
      variables: [...new Set(vars)],
      lastEdited: "Just now",
      preview: newTemplate.body || "No content yet.",
      archived: false,
    };
    setTemplates((prev) => [created, ...prev]);
    setNewTemplate({ title: "", category: "", body: "" });
    setDialogOpen(false);
    toast({ title: "Template Created", description: `"${created.title}" is ready to use.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/app/automations")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Templates</h1>
              <p className="text-sm text-muted-foreground">Manage your email and SMS message templates.</p>
            </div>
          </div>
          <Button className="gap-1.5" onClick={() => setDialogOpen(true)}>
            <Plus className="h-4 w-4" /> New Template
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={(v) => { setTab(v as "email" | "sms"); setCategoryFilter("All"); }}>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <TabsList>
              <TabsTrigger value="email" className="gap-1.5">
                <Mail className="h-4 w-4" /> Email Templates
              </TabsTrigger>
              <TabsTrigger value="sms" className="gap-1.5">
                <MessageSquare className="h-4 w-4" /> SMS Templates
              </TabsTrigger>
            </TabsList>
            <div className="relative flex-1 max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search templates…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
            </div>
          </div>

          {/* Category chips */}
          <div className="flex flex-wrap gap-2 pt-4">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setCategoryFilter(c)}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                  categoryFilter === c
                    ? "bg-primary text-primary-foreground border-primary"
                    : "bg-background text-muted-foreground border-border hover:border-primary/40"
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <TabsContent value="email" className="mt-4">
            <TemplateGrid templates={filtered} onDuplicate={handleDuplicate} onArchive={handleArchive} />
          </TabsContent>
          <TabsContent value="sms" className="mt-4">
            <TemplateGrid templates={filtered} onDuplicate={handleDuplicate} onArchive={handleArchive} />
          </TabsContent>
        </Tabs>

        {/* New Template Dialog */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>New {tab === "email" ? "Email" : "SMS"} Template</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input placeholder="e.g. Webinar Invite" value={newTemplate.title} onChange={(e) => setNewTemplate((p) => ({ ...p, title: e.target.value }))} />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={newTemplate.category} onValueChange={(v) => setNewTemplate((p) => ({ ...p, category: v }))}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {categories.filter((c) => c !== "All").map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label>Body <span className="text-muted-foreground font-normal">(use {"{{variable}}"} for merge fields)</span></Label>
                <Textarea rows={4} placeholder="Hi {{name}}, ..." value={newTemplate.body} onChange={(e) => setNewTemplate((p) => ({ ...p, body: e.target.value }))} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
              <Button onClick={handleCreate} disabled={!newTemplate.title.trim()}>Create Template</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

function TemplateGrid({ templates, onDuplicate, onArchive }: { templates: Template[]; onDuplicate: (t: Template) => void; onArchive: (t: Template) => void }) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-muted-foreground">No templates found.</p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {templates.map((t) => (
        <Card key={t.id} className="group relative hover:shadow-md transition-shadow">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1 min-w-0">
                <p className="font-semibold text-foreground truncate">{t.title}</p>
                <Badge variant="secondary" className="text-[10px]">
                  <Tag className="h-3 w-3 mr-1" /> {t.category}
                </Badge>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onDuplicate(t)}>
                    <Copy className="h-4 w-4 mr-2" /> Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onArchive(t)} className="text-destructive">
                    <Archive className="h-4 w-4 mr-2" /> Archive
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 italic">"{t.preview}"</p>

            <div className="flex flex-wrap gap-1">
              {t.variables.map((v) => (
                <span key={v} className="inline-flex items-center gap-0.5 rounded bg-primary/10 text-primary px-1.5 py-0.5 text-[10px] font-medium">
                  <Variable className="h-3 w-3" /> {v}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-1 text-xs text-muted-foreground pt-1">
              <Clock className="h-3 w-3" /> Edited {t.lastEdited}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
