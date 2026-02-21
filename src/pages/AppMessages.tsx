import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mail, MessageSquare, Search, Filter, X, CalendarIcon, Eye, Clock, User, Zap, CreditCard, Server, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

type MessageLog = {
  id: string;
  timestamp: Date;
  leadName: string;
  leadEmail: string;
  channel: "email" | "sms";
  automation: string;
  status: "delivered" | "opened" | "clicked" | "bounced" | "failed" | "pending";
  credits: number;
  subject?: string;
  body: string;
  provider: string;
  providerMessageId: string;
  duration: string;
};

const LOGS: MessageLog[] = [
  { id: "1", timestamp: new Date(2026, 1, 21, 14, 32), leadName: "Jane Doe", leadEmail: "jane@acme.co", channel: "email", automation: "Welcome Email", status: "opened", credits: 1, subject: "Welcome aboard, Jane!", body: "Hi Jane,\n\nThank you for joining Acme! We're excited to have you on board.\n\nHere's what you can do next:\n• Explore your dashboard\n• Set up your first automation\n\nBest,\nThe Acme Team", provider: "SendGrid", providerMessageId: "sg_abc123xyz", duration: "1.2s" },
  { id: "2", timestamp: new Date(2026, 1, 21, 13, 18), leadName: "Carlos Rivera", leadEmail: "carlos@startup.io", channel: "sms", automation: "Quick Reminder", status: "delivered", credits: 1, body: "Hi Carlos, friendly reminder about your demo call tomorrow at 2 PM. Reply STOP to opt out.", provider: "Twilio", providerMessageId: "tw_sms_98765", duration: "0.8s" },
  { id: "3", timestamp: new Date(2026, 1, 21, 11, 5), leadName: "Aisha Patel", leadEmail: "aisha@enterprise.com", channel: "email", automation: "Follow-Up Nudge", status: "clicked", credits: 1, subject: "Quick follow-up", body: "Hey Aisha,\n\nJust wanted to check in and see how things are going with our platform.\n\nWould you be open to a quick 15-minute call?\n\nCheers", provider: "SendGrid", providerMessageId: "sg_def456uvw", duration: "1.1s" },
  { id: "4", timestamp: new Date(2026, 1, 20, 17, 45), leadName: "Marcus Johnson", leadEmail: "marcus@corp.net", channel: "email", automation: "Re-engagement", status: "bounced", credits: 0, subject: "We miss you, Marcus", body: "Hi Marcus,\n\nIt's been a while since we last connected. We have some great updates that I think you'll love.", provider: "SendGrid", providerMessageId: "sg_ghi789rst", duration: "0.3s" },
  { id: "5", timestamp: new Date(2026, 1, 20, 15, 22), leadName: "Sophie Laurent", leadEmail: "sophie@design.fr", channel: "sms", automation: "Promo Blast", status: "delivered", credits: 2, body: "Sophie, grab 25% off this weekend only! Shop now at https://acme.co/sale. Reply STOP to opt out.", provider: "MessageBird", providerMessageId: "mb_promo_112", duration: "0.9s" },
  { id: "6", timestamp: new Date(2026, 1, 20, 10, 8), leadName: "Li Wei", leadEmail: "wei@tech.cn", channel: "email", automation: "Welcome Email", status: "delivered", credits: 1, subject: "Welcome aboard, Wei!", body: "Hi Wei,\n\nThank you for joining us! We're excited to have you.\n\nBest,\nThe Team", provider: "SendGrid", providerMessageId: "sg_jkl012mno", duration: "1.4s" },
  { id: "7", timestamp: new Date(2026, 1, 19, 9, 30), leadName: "Emma Wilson", leadEmail: "emma@agency.co.uk", channel: "email", automation: "Follow-Up Nudge", status: "failed", credits: 0, subject: "Quick follow-up", body: "Hey Emma, just checking in…", provider: "SendGrid", providerMessageId: "sg_pqr345stu", duration: "0.2s" },
  { id: "8", timestamp: new Date(2026, 1, 19, 8, 12), leadName: "Omar Hassan", leadEmail: "omar@ventures.ae", channel: "sms", automation: "Confirmation", status: "delivered", credits: 1, body: "Omar, your request #4821 has been confirmed. Reply HELP for support.", provider: "Twilio", providerMessageId: "tw_sms_55432", duration: "0.7s" },
  { id: "9", timestamp: new Date(2026, 1, 18, 16, 55), leadName: "Ana García", leadEmail: "ana@retail.mx", channel: "email", automation: "Re-engagement", status: "opened", credits: 1, subject: "We miss you, Ana", body: "Hi Ana,\n\nIt's been a while! Here's a special offer just for you.", provider: "SendGrid", providerMessageId: "sg_vwx678yza", duration: "1.0s" },
  { id: "10", timestamp: new Date(2026, 1, 18, 14, 40), leadName: "Yuki Tanaka", leadEmail: "yuki@saas.jp", channel: "sms", automation: "Quick Reminder", status: "pending", credits: 1, body: "Hi Yuki, your trial expires in 3 days. Upgrade now to keep your data.", provider: "Twilio", providerMessageId: "tw_sms_pending_01", duration: "—" },
];

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  delivered: { label: "Delivered", className: "bg-primary/10 text-primary border-primary/20" },
  opened: { label: "Opened", className: "bg-accent/80 text-accent-foreground border-accent" },
  clicked: { label: "Clicked", className: "bg-primary/20 text-primary border-primary/30" },
  bounced: { label: "Bounced", className: "bg-destructive/10 text-destructive border-destructive/20" },
  failed: { label: "Failed", className: "bg-destructive/10 text-destructive border-destructive/20" },
  pending: { label: "Pending", className: "bg-muted text-muted-foreground border-border" },
};

export default function AppMessages() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [channelFilter, setChannelFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();
  const [selectedLog, setSelectedLog] = useState<MessageLog | null>(null);

  const filtered = useMemo(() => {
    return LOGS.filter((l) => {
      if (search && !l.leadName.toLowerCase().includes(search.toLowerCase()) && !l.automation.toLowerCase().includes(search.toLowerCase())) return false;
      if (statusFilter !== "all" && l.status !== statusFilter) return false;
      if (channelFilter !== "all" && l.channel !== channelFilter) return false;
      if (dateFrom && l.timestamp < dateFrom) return false;
      if (dateTo) {
        const end = new Date(dateTo);
        end.setHours(23, 59, 59);
        if (l.timestamp > end) return false;
      }
      return true;
    });
  }, [search, statusFilter, channelFilter, dateFrom, dateTo]);

  const totalCredits = filtered.reduce((s, l) => s + l.credits, 0);
  const hasFilters = statusFilter !== "all" || channelFilter !== "all" || !!dateFrom || !!dateTo;

  const clearFilters = () => {
    setStatusFilter("all");
    setChannelFilter("all");
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/app/automations")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Message Logs</h1>
            <p className="text-sm text-muted-foreground">{filtered.length} messages · {totalCredits} credits used</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search lead or automation…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>

          <Select value={channelFilter} onValueChange={setChannelFilter}>
            <SelectTrigger className="w-[130px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Channels</SelectItem>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="sms">SMS</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="opened">Opened</SelectItem>
              <SelectItem value="clicked">Clicked</SelectItem>
              <SelectItem value="bounced">Bounced</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("gap-1.5 text-xs", dateFrom && "text-primary border-primary/40")}>
                <CalendarIcon className="h-3.5 w-3.5" />
                {dateFrom ? format(dateFrom, "MMM d") : "From"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>

          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm" className={cn("gap-1.5 text-xs", dateTo && "text-primary border-primary/40")}>
                <CalendarIcon className="h-3.5 w-3.5" />
                {dateTo ? format(dateTo, "MMM d") : "To"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar mode="single" selected={dateTo} onSelect={setDateTo} initialFocus className="p-3 pointer-events-auto" />
            </PopoverContent>
          </Popover>

          {hasFilters && (
            <Button variant="ghost" size="sm" className="gap-1 text-xs text-muted-foreground" onClick={clearFilters}>
              <X className="h-3.5 w-3.5" /> Clear
            </Button>
          )}
        </div>

        {/* Table */}
        <div className="rounded-lg border overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Timestamp</TableHead>
                <TableHead>Lead</TableHead>
                <TableHead>Channel</TableHead>
                <TableHead>Automation</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Credits</TableHead>
                <TableHead className="w-10" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">No messages found.</TableCell>
                </TableRow>
              ) : (
                filtered.map((log) => {
                  const sc = STATUS_CONFIG[log.status];
                  return (
                    <TableRow key={log.id} className="cursor-pointer hover:bg-muted/50" onClick={() => setSelectedLog(log)}>
                      <TableCell className="text-sm whitespace-nowrap">{format(log.timestamp, "MMM d, HH:mm")}</TableCell>
                      <TableCell>
                        <p className="text-sm font-medium text-foreground">{log.leadName}</p>
                        <p className="text-xs text-muted-foreground">{log.leadEmail}</p>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="gap-1 text-xs">
                          {log.channel === "email" ? <Mail className="h-3 w-3" /> : <MessageSquare className="h-3 w-3" />}
                          {log.channel === "email" ? "Email" : "SMS"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-sm">{log.automation}</TableCell>
                      <TableCell>
                        <span className={cn("inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold", sc.className)}>
                          {sc.label}
                        </span>
                      </TableCell>
                      <TableCell className="text-right text-sm font-medium">{log.credits}</TableCell>
                      <TableCell>
                        <Eye className="h-4 w-4 text-muted-foreground" />
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Detail Drawer */}
      <Sheet open={!!selectedLog} onOpenChange={(open) => !open && setSelectedLog(null)}>
        <SheetContent className="sm:max-w-md overflow-y-auto">
          {selectedLog && (
            <>
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  {selectedLog.channel === "email" ? <Mail className="h-5 w-5 text-primary" /> : <MessageSquare className="h-5 w-5 text-primary" />}
                  Message Detail
                </SheetTitle>
              </SheetHeader>

              <div className="space-y-5 pt-6">
                {/* Status */}
                <div className="flex items-center justify-between">
                  <span className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold", STATUS_CONFIG[selectedLog.status].className)}>
                    {STATUS_CONFIG[selectedLog.status].label}
                  </span>
                  <span className="text-xs text-muted-foreground">{format(selectedLog.timestamp, "PPp")}</span>
                </div>

                {/* Recipient */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Recipient</h4>
                  <div className="flex items-center gap-3 rounded-lg border p-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{selectedLog.leadName}</p>
                      <p className="text-xs text-muted-foreground">{selectedLog.leadEmail}</p>
                    </div>
                  </div>
                </div>

                {/* Message preview */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Message</h4>
                  <div className="rounded-lg border p-4 space-y-2">
                    {selectedLog.subject && <p className="text-sm font-semibold text-foreground">{selectedLog.subject}</p>}
                    <p className="text-sm text-muted-foreground whitespace-pre-line">{selectedLog.body}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <h4 className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Provider Metadata</h4>
                  <div className="rounded-lg border divide-y text-sm">
                    <MetaRow icon={<Zap className="h-3.5 w-3.5" />} label="Automation" value={selectedLog.automation} />
                    <MetaRow icon={<Server className="h-3.5 w-3.5" />} label="Provider" value={selectedLog.provider} />
                    <MetaRow icon={<CreditCard className="h-3.5 w-3.5" />} label="Credits" value={String(selectedLog.credits)} />
                    <MetaRow icon={<Clock className="h-3.5 w-3.5" />} label="Duration" value={selectedLog.duration} />
                    <div className="px-4 py-2.5">
                      <p className="text-xs text-muted-foreground">Message ID</p>
                      <code className="text-xs text-foreground break-all">{selectedLog.providerMessageId}</code>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}

function MetaRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between px-4 py-2.5">
      <span className="flex items-center gap-2 text-muted-foreground">{icon} {label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}
