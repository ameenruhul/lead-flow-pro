import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Plus, Sparkles, Bold, Italic, Underline, List, ListOrdered, Link2, Variable, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const VARIABLES = ["name", "email", "company", "product", "date", "link", "offer", "ref", "phone"];

const CATEGORIES: Record<string, string[]> = {
  email: ["Onboarding", "Nurture", "Win-back", "Sales", "Transactional"],
  sms: ["Reminder", "Transactional", "Marketing", "Confirmation"],
};

const AI_SUGGESTIONS: Record<string, { subject?: string; body: string }[]> = {
  email: [
    { subject: "Welcome aboard, {{name}}!", body: "Hi {{name}},\n\nThank you for joining {{company}}! We're excited to have you.\n\nHere's what you can do next:\n• Explore your dashboard\n• Set up your first automation\n• Connect your tools\n\nIf you need anything, just reply to this email.\n\nBest,\nThe {{company}} Team" },
    { subject: "Quick follow-up", body: "Hey {{name}},\n\nJust wanted to check in and see how things are going with {{product}}.\n\nWould you be open to a quick 15-minute call on {{date}}? Here's my calendar link: {{link}}\n\nLooking forward to hearing from you!\n\nCheers" },
    { subject: "We miss you, {{name}}", body: "Hi {{name}},\n\nIt's been a while since we last connected. We've made some great updates to {{product}} that I think you'll love.\n\nAs a special thank you, here's {{offer}} just for you.\n\nHope to see you back soon!" },
  ],
  sms: [
    { body: "Hi {{name}}, your appointment is confirmed for {{date}}. Reply STOP to opt out." },
    { body: "{{name}}, don't miss out! {{offer}} ends tonight. Shop now at {{link}}. Reply STOP to unsubscribe." },
    { body: "Hi {{name}}, thanks for your order #{{ref}}. We'll notify you when it ships. Reply HELP for support." },
  ],
};

const SMS_MAX = 160;

export default function AppTemplateEditor() {
  const navigate = useNavigate();
  const { toast } = useToast();

  const [type, setType] = useState<"email" | "sms">("email");
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const [aiOpen, setAiOpen] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResults, setAiResults] = useState<{ subject?: string; body: string }[]>([]);

  const charCount = body.length;
  const smsSegments = Math.max(1, Math.ceil(charCount / SMS_MAX));

  const detectedVars = useMemo(() => {
    const combined = subject + " " + body;
    const matches = combined.match(/\{\{(\w+)\}\}/g) || [];
    return [...new Set(matches.map((v) => v.replace(/[{}]/g, "")))];
  }, [subject, body]);

  const insertVariable = (v: string) => {
    setBody((prev) => prev + `{{${v}}}`);
  };

  const insertFormat = (tag: string) => {
    setBody((prev) => prev + tag);
  };

  const handleAiAssist = async () => {
    setAiOpen(true);
    setAiLoading(true);
    setAiResults([]);
    await new Promise((r) => setTimeout(r, 1500));
    setAiResults(AI_SUGGESTIONS[type]);
    setAiLoading(false);
  };

  const applySuggestion = (s: { subject?: string; body: string }) => {
    if (s.subject && type === "email") setSubject(s.subject);
    setBody(s.body);
    setAiOpen(false);
    toast({ title: "Suggestion Applied", description: "You can edit the content further before saving." });
  };

  const handleSave = () => {
    if (!title.trim()) {
      toast({ title: "Title Required", description: "Please enter a template title.", variant: "destructive" });
      return;
    }
    if (type === "email" && !subject.trim()) {
      toast({ title: "Subject Required", description: "Please enter an email subject line.", variant: "destructive" });
      return;
    }
    if (!body.trim()) {
      toast({ title: "Body Required", description: "Please enter the message body.", variant: "destructive" });
      return;
    }
    toast({ title: "Template Saved ✓", description: `"${title}" saved with ${detectedVars.length} variable(s).` });
    navigate("/app/templates");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate("/app/templates")}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-2xl font-bold text-foreground">New Template</h1>
          </div>
          <Button onClick={handleSave}>Save Template</Button>
        </div>

        {/* Type selector */}
        <div className="flex gap-3">
          {([
            { id: "email" as const, label: "Email", icon: <Mail className="h-4 w-4" /> },
            { id: "sms" as const, label: "SMS", icon: <MessageSquare className="h-4 w-4" /> },
          ]).map((opt) => (
            <button
              key={opt.id}
              onClick={() => { setType(opt.id); setCategory(""); setSubject(""); }}
              className={cn(
                "flex items-center gap-2 rounded-lg border px-5 py-3 text-sm font-medium transition-colors",
                type === opt.id ? "border-primary bg-primary/5 text-primary" : "border-border text-muted-foreground hover:border-primary/40"
              )}
            >
              {opt.icon} {opt.label}
            </button>
          ))}
        </div>

        {/* Details */}
        <Card>
          <CardContent className="p-6 space-y-5">
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label>Title</Label>
                <Input placeholder="e.g. Welcome Email" value={title} onChange={(e) => setTitle(e.target.value)} />
              </div>
              <div className="space-y-1.5">
                <Label>Category</Label>
                <Select value={category} onValueChange={setCategory}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>
                    {CATEGORIES[type].map((c) => (
                      <SelectItem key={c} value={c}>{c}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Email subject */}
            {type === "email" && (
              <div className="space-y-1.5">
                <Label>Subject Line</Label>
                <Input placeholder="e.g. Welcome aboard, {{name}}!" value={subject} onChange={(e) => setSubject(e.target.value)} />
              </div>
            )}

            {/* Toolbar */}
            <div className="space-y-1.5">
              <Label>Body</Label>
              <div className="flex items-center gap-1 flex-wrap">
                {type === "email" && (
                  <>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat("**bold**")}>
                      <Bold className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat("_italic_")}>
                      <Italic className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat("__underline__")}>
                      <Underline className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat("\n• ")}>
                      <List className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat("\n1. ")}>
                      <ListOrdered className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat("[text](url)")}>
                      <Link2 className="h-4 w-4" />
                    </Button>
                    <div className="w-px h-5 bg-border mx-1" />
                  </>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1 text-xs">
                      <Variable className="h-3.5 w-3.5" /> Insert Variable
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {VARIABLES.map((v) => (
                      <DropdownMenuItem key={v} onClick={() => insertVariable(v)}>
                        <code className="text-xs">{`{{${v}}}`}</code>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <Button variant="outline" size="sm" className="h-8 gap-1 text-xs ml-auto" onClick={handleAiAssist}>
                  <Sparkles className="h-3.5 w-3.5" /> AI Assist
                </Button>
              </div>
              <Textarea
                rows={type === "email" ? 10 : 4}
                placeholder={type === "email" ? "Hi {{name}},\n\nWrite your email body here…" : "Hi {{name}}, your message here…"}
                value={body}
                onChange={(e) => setBody(e.target.value)}
                className="font-mono text-sm"
              />
              {type === "sms" && (
                <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
                  <span>{charCount} / {SMS_MAX} characters</span>
                  <span className={cn(smsSegments > 1 && "text-destructive font-medium")}>
                    {smsSegments} SMS segment{smsSegments > 1 ? "s" : ""}
                  </span>
                </div>
              )}
            </div>

            {/* Variables detected */}
            {detectedVars.length > 0 && (
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Variables Detected</Label>
                <div className="flex flex-wrap gap-1.5">
                  {detectedVars.map((v) => (
                    <Badge key={v} variant="secondary" className="text-[10px] gap-1">
                      <Variable className="h-3 w-3" /> {v}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* AI Assist Dialog */}
      <Dialog open={aiOpen} onOpenChange={setAiOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" /> AI Suggestions
            </DialogTitle>
          </DialogHeader>
          {aiLoading ? (
            <div className="flex flex-col items-center gap-3 py-10">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm text-muted-foreground">Generating suggestions…</p>
            </div>
          ) : (
            <div className="space-y-3 max-h-[60vh] overflow-y-auto">
              {aiResults.map((s, i) => (
                <button
                  key={i}
                  onClick={() => applySuggestion(s)}
                  className="w-full text-left rounded-lg border border-border p-4 hover:border-primary/40 transition-colors space-y-1.5"
                >
                  {s.subject && <p className="text-sm font-semibold text-foreground">{s.subject}</p>}
                  <p className="text-xs text-muted-foreground whitespace-pre-line line-clamp-4">{s.body}</p>
                  <p className="text-[10px] text-primary font-medium pt-1">Click to apply →</p>
                </button>
              ))}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setAiOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
