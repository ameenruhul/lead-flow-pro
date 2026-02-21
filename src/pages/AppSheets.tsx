import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Plus,
  Search,
  Columns3,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Table2,
} from "lucide-react";

interface Sheet {
  id: string;
  name: string;
  tab: string;
  status: "synced" | "syncing" | "error";
  lastSync: string;
  rows: number;
  automations: number;
}

const mockSheets: Sheet[] = [
  { id: "1", name: "Q1 Lead List", tab: "Active Leads", status: "synced", lastSync: "4 min ago", rows: 342, automations: 2 },
  { id: "2", name: "Q1 Lead List", tab: "Cold Leads", status: "synced", lastSync: "4 min ago", rows: 189, automations: 1 },
  { id: "3", name: "Website Signups", tab: "Sheet1", status: "syncing", lastSync: "Syncing…", rows: 1024, automations: 3 },
  { id: "4", name: "Referral Partners", tab: "Partners", status: "synced", lastSync: "1 hr ago", rows: 57, automations: 1 },
  { id: "5", name: "Old Campaign Data", tab: "2024 Archive", status: "error", lastSync: "Failed 2 hrs ago", rows: 780, automations: 0 },
  { id: "6", name: "Event RSVPs", tab: "Confirmed", status: "synced", lastSync: "30 min ago", rows: 215, automations: 2 },
];

const statusConfig = {
  synced: { label: "Synced", icon: CheckCircle2, variant: "default" as const },
  syncing: { label: "Syncing", icon: Loader2, variant: "secondary" as const },
  error: { label: "Error", icon: AlertCircle, variant: "destructive" as const },
};

export default function AppSheets() {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addOpen, setAddOpen] = useState(false);
  const [sheetUrl, setSheetUrl] = useState("");

  const filtered = mockSheets.filter((s) => {
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.tab.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || s.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div className="min-h-screen bg-secondary/30">
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-display font-bold gradient-text">QuantLeads</Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild><Link to="/app/dashboard">Dashboard</Link></Button>
              <Button variant="ghost" size="sm" asChild><Link to="/"><LogOut className="h-4 w-4 mr-2" />Log out</Link></Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-5xl">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">Sheets</h1>
            <p className="text-muted-foreground text-sm mt-1">{mockSheets.length} sheets connected · {mockSheets.reduce((a, s) => a + s.rows, 0).toLocaleString()} total rows</p>
          </div>
          <Button variant="hero" size="sm" onClick={() => setAddOpen(true)}>
            <Plus className="h-4 w-4 mr-1.5" /> Add Google Sheet
          </Button>
        </div>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search sheets or tabs…" value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="synced">Synced</SelectItem>
              <SelectItem value="syncing">Syncing</SelectItem>
              <SelectItem value="error">Error</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sheet Name</TableHead>
                  <TableHead>Tab</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Rows</TableHead>
                  <TableHead className="text-right">Automations</TableHead>
                  <TableHead>Last Sync</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-12 text-muted-foreground">
                      No sheets match your search.
                    </TableCell>
                  </TableRow>
                ) : (
                  filtered.map((sheet) => {
                    const sc = statusConfig[sheet.status];
                    const StatusIcon = sc.icon;
                    return (
                      <TableRow key={sheet.id}>
                        <TableCell className="font-medium text-foreground">
                          <div className="flex items-center gap-2">
                            <Table2 className="h-4 w-4 text-primary shrink-0" />
                            {sheet.name}
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{sheet.tab}</TableCell>
                        <TableCell>
                          <Badge variant={sc.variant} className="gap-1 text-[10px]">
                            <StatusIcon className={`h-3 w-3 ${sheet.status === "syncing" ? "animate-spin" : ""}`} />
                            {sc.label}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right font-medium text-foreground">{sheet.rows.toLocaleString()}</TableCell>
                        <TableCell className="text-right font-medium text-foreground">{sheet.automations}</TableCell>
                        <TableCell className="text-muted-foreground text-sm">{sheet.lastSync}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast({ title: "Column mapping", description: `Opening mapping for "${sheet.tab}"…` })}
                            >
                              <Columns3 className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => toast({ title: "Sheet removed", description: `"${sheet.name} — ${sheet.tab}" disconnected.` })}
                            >
                              <Trash2 className="h-4 w-4 text-destructive" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>

      {/* Add Sheet Modal */}
      <Dialog open={addOpen} onOpenChange={setAddOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Add Google Sheet</DialogTitle>
            <DialogDescription>Paste a Google Sheets URL to connect and start syncing leads.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label htmlFor="sheetUrl">Sheet URL</Label>
              <Input id="sheetUrl" placeholder="https://docs.google.com/spreadsheets/d/..." value={sheetUrl} onChange={(e) => setSheetUrl(e.target.value)} />
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setAddOpen(false)}>Cancel</Button>
              <Button size="sm" onClick={() => {
                toast({ title: "Sheet added", description: "We're importing your sheet now. This may take a moment." });
                setSheetUrl("");
                setAddOpen(false);
              }}>
                Connect Sheet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
