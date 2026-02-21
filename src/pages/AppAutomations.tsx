import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search, Zap, Mail, MessageSquare, Clock, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";

type Automation = {
  id: string;
  name: string;
  trigger: string;
  action: string;
  sheet: string;
  enabled: boolean;
  lastRun: string;
  successRate: number;
  runs: number;
};

const AUTOMATIONS: Automation[] = [
  { id: "1", name: "Welcome Email – New Leads", trigger: "New Row", action: "Send Email", sheet: "Q1 Leads Master", enabled: true, lastRun: "2 min ago", successRate: 98.2, runs: 1243 },
  { id: "2", name: "SMS Follow-Up After 24h", trigger: "Time Delay", action: "Send SMS", sheet: "Q1 Leads Master", enabled: true, lastRun: "18 min ago", successRate: 95.7, runs: 876 },
  { id: "3", name: "Notify on Qualified Lead", trigger: "Status Change", action: "Send Email", sheet: "Webinar Signups", enabled: true, lastRun: "1 hr ago", successRate: 99.1, runs: 412 },
  { id: "4", name: "Re-engage Cold Leads", trigger: "Time Delay", action: "Send Email", sheet: "Q1 Leads Master", enabled: false, lastRun: "3 days ago", successRate: 87.4, runs: 2301 },
  { id: "5", name: "Webinar Reminder SMS", trigger: "Scheduled", action: "Send SMS", sheet: "Webinar Signups", enabled: true, lastRun: "6 hr ago", successRate: 96.8, runs: 534 },
  { id: "6", name: "Partner Intro Email", trigger: "New Row", action: "Send Email", sheet: "Partner Referrals", enabled: true, lastRun: "12 hr ago", successRate: 100, runs: 89 },
  { id: "7", name: "Disqualified Lead Archive", trigger: "Status Change", action: "Send Email", sheet: "Partner Referrals", enabled: false, lastRun: "5 days ago", successRate: 91.3, runs: 156 },
  { id: "8", name: "Daily Digest SMS", trigger: "Scheduled", action: "Send SMS", sheet: "Q1 Leads Master", enabled: true, lastRun: "22 hr ago", successRate: 94.5, runs: 60 },
];

const TRIGGERS = ["New Row", "Status Change", "Time Delay", "Scheduled"];
const SHEETS = ["Q1 Leads Master", "Webinar Signups", "Partner Referrals"];

const triggerIcon = (trigger: string) => {
  switch (trigger) {
    case "New Row": return <Plus className="h-3.5 w-3.5" />;
    case "Status Change": return <Zap className="h-3.5 w-3.5" />;
    case "Time Delay": return <Clock className="h-3.5 w-3.5" />;
    case "Scheduled": return <Clock className="h-3.5 w-3.5" />;
    default: return null;
  }
};

const actionIcon = (action: string) => {
  if (action === "Send SMS") return <MessageSquare className="h-3.5 w-3.5" />;
  return <Mail className="h-3.5 w-3.5" />;
};

const rateColor = (rate: number) => {
  if (rate >= 97) return "text-green-500";
  if (rate >= 90) return "text-yellow-500";
  return "text-destructive";
};

export default function AppAutomations() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [sheetFilter, setSheetFilter] = useState("all");
  const [triggerFilter, setTriggerFilter] = useState("all");
  const [automations, setAutomations] = useState(AUTOMATIONS);
  const [showNewModal, setShowNewModal] = useState(false);

  const filtered = useMemo(() => {
    return automations.filter((a) => {
      if (search && !a.name.toLowerCase().includes(search.toLowerCase())) return false;
      if (sheetFilter !== "all" && a.sheet !== sheetFilter) return false;
      if (triggerFilter !== "all" && a.trigger !== triggerFilter) return false;
      return true;
    });
  }, [automations, search, sheetFilter, triggerFilter]);

  const toggleEnabled = (id: string) => {
    setAutomations((prev) =>
      prev.map((a) => (a.id === id ? { ...a, enabled: !a.enabled } : a))
    );
    const auto = automations.find((a) => a.id === id);
    toast({
      title: auto?.enabled ? "Automation Paused" : "Automation Activated",
      description: auto?.name,
    });
  };

  const activeCount = automations.filter((a) => a.enabled).length;

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Automations</h1>
            <p className="text-muted-foreground text-sm">
              {activeCount} active · {automations.length} total
            </p>
          </div>
          <Button onClick={() => setShowNewModal(true)}>
            <Plus className="h-4 w-4 mr-1" /> New Automation
          </Button>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search automations…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
              <Select value={sheetFilter} onValueChange={setSheetFilter}>
                <SelectTrigger className="w-full sm:w-[200px]">
                  <Filter className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="All Sheets" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Sheets</SelectItem>
                  {SHEETS.map((s) => (
                    <SelectItem key={s} value={s}>{s}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={triggerFilter} onValueChange={setTriggerFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <Zap className="h-4 w-4 mr-1.5 text-muted-foreground" />
                  <SelectValue placeholder="All Triggers" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Triggers</SelectItem>
                  {TRIGGERS.map((t) => (
                    <SelectItem key={t} value={t}>{t}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Automation</TableHead>
                    <TableHead>Trigger</TableHead>
                    <TableHead>Action</TableHead>
                    <TableHead>Sheet</TableHead>
                    <TableHead className="text-center">Status</TableHead>
                    <TableHead>Last Run</TableHead>
                    <TableHead className="text-right">Success Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filtered.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                        No automations match your filters.
                      </TableCell>
                    </TableRow>
                  )}
                  {filtered.map((a) => (
                    <TableRow key={a.id}>
                      <TableCell className="font-medium text-foreground max-w-[220px] truncate">
                        {a.name}
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1 font-normal">
                          {triggerIcon(a.trigger)} {a.trigger}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary" className="gap-1 font-normal">
                          {actionIcon(a.action)} {a.action}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{a.sheet}</TableCell>
                      <TableCell className="text-center">
                        <Switch checked={a.enabled} onCheckedChange={() => toggleEnabled(a.id)} />
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{a.lastRun}</TableCell>
                      <TableCell className="text-right">
                        <span className={`font-semibold ${rateColor(a.successRate)}`}>
                          {a.successRate}%
                        </span>
                        <span className="text-muted-foreground text-xs ml-1">({a.runs})</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Automation Modal */}
      <Dialog open={showNewModal} onOpenChange={setShowNewModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Automation</DialogTitle>
            <DialogDescription>Set up a trigger and action for your leads.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Automation Name</label>
              <Input placeholder="e.g. Welcome Email – New Signups" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Trigger</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select trigger…" /></SelectTrigger>
                  <SelectContent>
                    {TRIGGERS.map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-foreground">Action</label>
                <Select>
                  <SelectTrigger><SelectValue placeholder="Select action…" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Send Email">Send Email</SelectItem>
                    <SelectItem value="Send SMS">Send SMS</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Sheet</label>
              <Select>
                <SelectTrigger><SelectValue placeholder="Select sheet…" /></SelectTrigger>
                <SelectContent>
                  {SHEETS.map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full" onClick={() => { setShowNewModal(false); toast({ title: "Automation Created", description: "Your new automation is ready." }); }}>
              Create Automation
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
