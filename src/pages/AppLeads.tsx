import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Search, Filter, Users, Tag, Download, ChevronDown, MoreHorizontal, Mail, Phone, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";

const mockLeads = [
  { id: "1", name: "Sarah Chen", email: "sarah@techcorp.com", phone: "+1 (555) 123-4567", status: "Active", source: "Google Sheets", lastContacted: "2024-01-15T10:30:00", createdDate: "2024-01-02T09:00:00" },
  { id: "2", name: "James Wilson", email: "james@startup.io", phone: "+1 (555) 234-5678", status: "New", source: "CSV Import", lastContacted: null, createdDate: "2024-01-14T14:20:00" },
  { id: "3", name: "Maria Garcia", email: "maria@enterprise.co", phone: "+1 (555) 345-6789", status: "Contacted", source: "Google Sheets", lastContacted: "2024-01-13T16:45:00", createdDate: "2024-01-05T11:30:00" },
  { id: "4", name: "David Kim", email: "david@agency.com", phone: "+1 (555) 456-7890", status: "Responded", source: "Manual", lastContacted: "2024-01-14T09:15:00", createdDate: "2024-01-08T08:00:00" },
  { id: "5", name: "Emily Brown", email: "emily@consulting.net", phone: "+1 (555) 567-8901", status: "Unsubscribed", source: "CSV Import", lastContacted: "2024-01-10T12:00:00", createdDate: "2024-01-03T15:45:00" },
  { id: "6", name: "Alex Thompson", email: "alex@saas.dev", phone: "+1 (555) 678-9012", status: "Active", source: "Google Sheets", lastContacted: "2024-01-15T08:00:00", createdDate: "2024-01-01T10:00:00" },
  { id: "7", name: "Lisa Wang", email: "lisa@fintech.com", phone: "+1 (555) 789-0123", status: "New", source: "Manual", lastContacted: null, createdDate: "2024-01-15T11:30:00" },
  { id: "8", name: "Ryan Patel", email: "ryan@ecomm.shop", phone: "+1 (555) 890-1234", status: "Contacted", source: "CSV Import", lastContacted: "2024-01-12T14:30:00", createdDate: "2024-01-06T09:15:00" },
  { id: "9", name: "Nina Johnson", email: "nina@healthcare.org", phone: "+1 (555) 901-2345", status: "Responded", source: "Google Sheets", lastContacted: "2024-01-14T17:00:00", createdDate: "2024-01-09T13:00:00" },
  { id: "10", name: "Tom Martinez", email: "tom@realestate.co", phone: "+1 (555) 012-3456", status: "Active", source: "Manual", lastContacted: "2024-01-15T07:45:00", createdDate: "2024-01-04T16:30:00" },
];

const statusColors: Record<string, string> = {
  New: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  Contacted: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Responded: "bg-violet-500/10 text-violet-400 border-violet-500/20",
  Unsubscribed: "bg-red-500/10 text-red-400 border-red-500/20",
};

const formatDate = (iso: string | null) => {
  if (!iso) return "—";
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
};

const formatTime = (iso: string | null) => {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
};

const AppLeads = () => {
  const { toast } = useToast();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const filtered = useMemo(() => {
    return mockLeads.filter((lead) => {
      const matchesSearch =
        !search ||
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase()) ||
        lead.phone.includes(search);
      const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
      const matchesSource = sourceFilter === "all" || lead.source === sourceFilter;
      return matchesSearch && matchesStatus && matchesSource;
    });
  }, [search, statusFilter, sourceFilter]);

  const allSelected = filtered.length > 0 && filtered.every((l) => selectedIds.has(l.id));

  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(filtered.map((l) => l.id)));
    }
  };

  const toggleOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleBulkTag = () => {
    toast({ title: "Tags applied", description: `Tagged ${selectedIds.size} lead(s).` });
    setSelectedIds(new Set());
  };

  const handleBulkExport = () => {
    toast({ title: "Export started", description: `Exporting ${selectedIds.size} lead(s) to CSV.` });
    setSelectedIds(new Set());
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/app/dashboard">
              <Button variant="ghost" size="icon"><ArrowLeft className="h-4 w-4" /></Button>
            </Link>
            <div>
              <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" /> Leads
              </h1>
              <p className="text-sm text-muted-foreground">{filtered.length} leads</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-6">
        {/* Search & Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, email, or phone…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[140px]">
                <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Responded">Responded</SelectItem>
                <SelectItem value="Unsubscribed">Unsubscribed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={sourceFilter} onValueChange={setSourceFilter}>
              <SelectTrigger className="w-[160px]">
                <Filter className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                <SelectValue placeholder="Source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Sources</SelectItem>
                <SelectItem value="Google Sheets">Google Sheets</SelectItem>
                <SelectItem value="CSV Import">CSV Import</SelectItem>
                <SelectItem value="Manual">Manual</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedIds.size > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/20">
            <span className="text-sm font-medium text-foreground">{selectedIds.size} selected</span>
            <Button variant="outline" size="sm" onClick={handleBulkTag}>
              <Tag className="h-3.5 w-3.5 mr-1.5" /> Tag
            </Button>
            <Button variant="outline" size="sm" onClick={handleBulkExport}>
              <Download className="h-3.5 w-3.5 mr-1.5" /> Export CSV
            </Button>
          </div>
        )}

        {/* Table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead className="w-12">
                  <Checkbox checked={allSelected} onCheckedChange={toggleAll} />
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Source</TableHead>
                <TableHead>Last Contacted</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="w-12" />
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((lead) => (
                <TableRow key={lead.id} className="group cursor-pointer">
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={selectedIds.has(lead.id)}
                      onCheckedChange={() => toggleOne(lead.id)}
                    />
                  </TableCell>
                  <TableCell className="font-medium text-foreground">{lead.name}</TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Mail className="h-3.5 w-3.5" /> {lead.email}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Phone className="h-3.5 w-3.5" /> {lead.phone}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={statusColors[lead.status]}>
                      {lead.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{lead.source}</TableCell>
                  <TableCell>
                    {lead.lastContacted ? (
                      <span className="flex items-center gap-1.5 text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{formatDate(lead.lastContacted)}</span>
                        <span className="text-xs opacity-60">{formatTime(lead.lastContacted)}</span>
                      </span>
                    ) : (
                      <span className="text-muted-foreground/50">Never</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="flex items-center gap-1.5 text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" /> {formatDate(lead.createdDate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Send Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filtered.length === 0 && (
                <TableRow>
                  <TableCell colSpan={9} className="h-32 text-center text-muted-foreground">
                    No leads found matching your filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </main>
    </div>
  );
};

export default AppLeads;
