import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ChevronRight, FileSpreadsheet, Zap, Mail, MessageSquare, Layout, Play, Clock, Filter, RefreshCw, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

const STEPS = ["Sheet", "Trigger", "Action", "Template", "Review"] as const;

const SHEETS = [
  { id: "1", name: "Q1 Leads Master", tab: "Main", rows: 1247 },
  { id: "2", name: "Webinar Signups", tab: "Responses", rows: 534 },
  { id: "3", name: "Partner Referrals", tab: "Referrals", rows: 89 },
];

const TRIGGERS = [
  { id: "new-row", label: "New Row Added", desc: "Fires when a new lead appears in the sheet", icon: <RefreshCw className="h-5 w-5" /> },
  { id: "status-change", label: "Status Change", desc: "Fires when a lead's status column changes", icon: <Zap className="h-5 w-5" /> },
  { id: "condition-met", label: "Condition Met", desc: "Fires when a custom condition evaluates to true", icon: <Filter className="h-5 w-5" /> },
  { id: "scheduled", label: "Scheduled Follow-Up", desc: "Fires after a configurable time delay", icon: <Clock className="h-5 w-5" /> },
];

const ACTIONS = [
  { id: "email", label: "Send Email", desc: "Send a personalised email via your connected provider", icon: <Mail className="h-5 w-5" /> },
  { id: "sms", label: "Send SMS", desc: "Send an SMS through Twilio or MessageBird", icon: <MessageSquare className="h-5 w-5" /> },
];

const TEMPLATES: Record<string, { id: string; name: string; preview: string }[]> = {
  email: [
    { id: "welcome", name: "Welcome Email", preview: "Hi {{name}}, thanks for signing up! We're excited to have you…" },
    { id: "follow-up", name: "Follow-Up Nudge", preview: "Hey {{name}}, just checking in – did you get a chance to…" },
    { id: "re-engage", name: "Re-engagement", preview: "Hi {{name}}, it's been a while! We have some updates…" },
  ],
  sms: [
    { id: "reminder", name: "Quick Reminder", preview: "Hi {{name}}, friendly reminder about your upcoming…" },
    { id: "confirm", name: "Confirmation", preview: "{{name}}, your request has been confirmed. Reply STOP to…" },
  ],
};

type Selection = {
  sheetId: string | null;
  triggerId: string | null;
  actionId: string | null;
  templateId: string | null;
  name: string;
};

export default function AppAutomationBuilder() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [testing, setTesting] = useState(false);
  const [sel, setSel] = useState<Selection>({ sheetId: null, triggerId: null, actionId: null, templateId: null, name: "" });

  const canNext = () => {
    if (step === 0) return !!sel.sheetId;
    if (step === 1) return !!sel.triggerId;
    if (step === 2) return !!sel.actionId;
    if (step === 3) return !!sel.templateId;
    return true;
  };

  const selectedSheet = SHEETS.find((s) => s.id === sel.sheetId);
  const selectedTrigger = TRIGGERS.find((t) => t.id === sel.triggerId);
  const selectedAction = ACTIONS.find((a) => a.id === sel.actionId);
  const templates = sel.actionId ? TEMPLATES[sel.actionId] ?? [] : [];
  const selectedTemplate = templates.find((t) => t.id === sel.templateId);

  const handleTestRun = async () => {
    setTesting(true);
    await new Promise((r) => setTimeout(r, 1800));
    setTesting(false);
    toast({
      title: "Test Run Complete",
      description: `✅ Trigger fired → ${selectedAction?.label} sent to "Jane Doe (jane@example.com)" using "${selectedTemplate?.name}" template. Completed in 1.2s.`,
    });
  };

  const handleActivate = () => {
    toast({ title: "Automation Activated 🚀", description: sel.name || selectedTemplate?.name || "New Automation" });
    navigate("/app/automations");
  };

  const pick = (key: keyof Selection, value: string) => setSel((p) => ({ ...p, [key]: value }));

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/app/automations")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-2xl font-bold text-foreground">New Automation</h1>
        </div>

        {/* Stepper */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1">
          {STEPS.map((label, i) => (
            <div key={label} className="flex items-center gap-1">
              <button
                onClick={() => i < step && setStep(i)}
                className={cn(
                  "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                  i === step && "bg-primary text-primary-foreground",
                  i < step && "bg-primary/10 text-primary cursor-pointer",
                  i > step && "bg-muted text-muted-foreground"
                )}
              >
                {i < step ? <Check className="h-3.5 w-3.5" /> : <span className="w-4 text-center">{i + 1}</span>}
                {label}
              </button>
              {i < STEPS.length - 1 && <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <Card>
          <CardContent className="p-6 space-y-4">
            {/* Step 1 – Sheet */}
            {step === 0 && (
              <>
                <h2 className="text-lg font-semibold text-foreground">Choose a Sheet</h2>
                <p className="text-sm text-muted-foreground">Select the Google Sheet this automation will watch.</p>
                <div className="grid gap-3 pt-2">
                  {SHEETS.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => pick("sheetId", s.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                        sel.sheetId === s.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <FileSpreadsheet className="h-5 w-5 text-primary shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{s.name}</p>
                        <p className="text-xs text-muted-foreground">Tab: {s.tab} · {s.rows.toLocaleString()} rows</p>
                      </div>
                      {sel.sheetId === s.id && <Check className="h-4 w-4 text-primary shrink-0" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 2 – Trigger */}
            {step === 1 && (
              <>
                <h2 className="text-lg font-semibold text-foreground">Choose a Trigger</h2>
                <p className="text-sm text-muted-foreground">When should this automation fire?</p>
                <div className="grid gap-3 pt-2">
                  {TRIGGERS.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => pick("triggerId", t.id)}
                      className={cn(
                        "flex items-center gap-3 rounded-lg border p-4 text-left transition-colors",
                        sel.triggerId === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className={cn("p-2 rounded-md", sel.triggerId === t.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{t.icon}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground">{t.label}</p>
                        <p className="text-xs text-muted-foreground">{t.desc}</p>
                      </div>
                      {sel.triggerId === t.id && <Check className="h-4 w-4 text-primary shrink-0" />}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 3 – Action */}
            {step === 2 && (
              <>
                <h2 className="text-lg font-semibold text-foreground">Choose an Action</h2>
                <p className="text-sm text-muted-foreground">What should happen when the trigger fires?</p>
                <div className="grid sm:grid-cols-2 gap-3 pt-2">
                  {ACTIONS.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => { pick("actionId", a.id); setSel((p) => ({ ...p, templateId: null })); }}
                      className={cn(
                        "flex flex-col items-center gap-2 rounded-lg border p-6 text-center transition-colors",
                        sel.actionId === a.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className={cn("p-3 rounded-full", sel.actionId === a.id ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground")}>{a.icon}</div>
                      <p className="font-medium text-foreground">{a.label}</p>
                      <p className="text-xs text-muted-foreground">{a.desc}</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 4 – Template */}
            {step === 3 && (
              <>
                <h2 className="text-lg font-semibold text-foreground">Select a Template</h2>
                <p className="text-sm text-muted-foreground">Pick a message template to customise later.</p>
                <div className="grid gap-3 pt-2">
                  {templates.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => pick("templateId", t.id)}
                      className={cn(
                        "flex flex-col gap-1.5 rounded-lg border p-4 text-left transition-colors",
                        sel.templateId === t.id ? "border-primary bg-primary/5" : "border-border hover:border-primary/40"
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Layout className="h-4 w-4 text-primary" />
                        <p className="font-medium text-foreground">{t.name}</p>
                        {sel.templateId === t.id && <Check className="h-4 w-4 text-primary ml-auto" />}
                      </div>
                      <p className="text-sm text-muted-foreground italic">"{t.preview}"</p>
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Step 5 – Review */}
            {step === 4 && (
              <>
                <h2 className="text-lg font-semibold text-foreground">Review &amp; Activate</h2>
                <div className="space-y-1.5 pt-1">
                  <Label>Automation Name</Label>
                  <Input
                    placeholder={selectedTemplate?.name || "My Automation"}
                    value={sel.name}
                    onChange={(e) => setSel((p) => ({ ...p, name: e.target.value }))}
                  />
                </div>
                <div className="rounded-lg border divide-y">
                  <ReviewRow label="Sheet" value={selectedSheet?.name} />
                  <ReviewRow label="Trigger" value={selectedTrigger?.label} />
                  <ReviewRow label="Action" value={selectedAction?.label} />
                  <ReviewRow label="Template" value={selectedTemplate?.name} />
                </div>
                {selectedTemplate && (
                  <div className="rounded-lg bg-muted/50 p-4">
                    <p className="text-xs font-medium text-muted-foreground mb-1">Preview</p>
                    <p className="text-sm text-foreground italic">"{selectedTemplate.preview}"</p>
                  </div>
                )}
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Button variant="outline" className="gap-1.5" onClick={handleTestRun} disabled={testing}>
                    {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                    {testing ? "Running…" : "Test Run"}
                  </Button>
                  <Button className="gap-1.5 flex-1" onClick={handleActivate}>
                    <Zap className="h-4 w-4" /> Activate Automation
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        {step < 4 && (
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setStep((s) => s - 1)} disabled={step === 0}>
              <ArrowLeft className="h-4 w-4 mr-1" /> Back
            </Button>
            <Button onClick={() => setStep((s) => s + 1)} disabled={!canNext()}>
              Next <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

function ReviewRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <Badge variant="secondary">{value ?? "—"}</Badge>
    </div>
  );
}
