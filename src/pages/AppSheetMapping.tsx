import { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Sparkles, Save, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

const SHEET_COLUMNS = [
  "Column A – Full Name",
  "Column B – Email Address",
  "Column C – Mobile",
  "Column D – Lead Status",
  "Column E – Campaign",
  "Column F – Date Added",
  "Column G – Notes",
  "Column H – Company",
];

const LEAD_FIELDS = [
  { key: "name", label: "Name", required: false },
  { key: "email", label: "Email", required: true },
  { key: "phone", label: "Phone", required: true },
  { key: "status", label: "Status", required: false },
  { key: "source", label: "Source", required: false },
];

const PREVIEW_DATA = [
  { A: "Sarah Chen", B: "sarah@acme.co", C: "+1 555-0101", D: "New", E: "Google Ads", F: "2026-02-18", G: "Interested in Pro plan", H: "Acme Corp" },
  { A: "James Miller", B: "james.m@corp.io", C: "+1 555-0102", D: "Contacted", E: "Organic", F: "2026-02-17", G: "", H: "CorpIO" },
  { A: "Priya Patel", B: "priya@startup.dev", C: "+44 7700 900", D: "Qualified", E: "Referral", F: "2026-02-17", G: "Follow up next week", H: "StartupDev" },
  { A: "Tom Wright", B: "", C: "+1 555-0104", D: "New", E: "Facebook", F: "2026-02-16", G: "", H: "" },
  { A: "Lisa Zhang", B: "lisa.z@bigco.com", C: "", D: "New", E: "Google Ads", F: "2026-02-16", G: "Needs demo", H: "BigCo" },
  { A: "Carlos Rivera", B: "carlos@firma.mx", C: "+52 55 1234", D: "Contacted", E: "LinkedIn", F: "2026-02-15", G: "", H: "Firma MX" },
  { A: "Emily Johnson", B: "emily.j@mail.com", C: "+1 555-0107", D: "Qualified", E: "Organic", F: "2026-02-15", G: "Ready for proposal", H: "Freelance" },
  { A: "Raj Gupta", B: "raj@techies.in", C: "+91 98765 43", D: "New", E: "Referral", F: "2026-02-14", G: "", H: "Techies" },
  { A: "Anna Kowalski", B: "anna.k@euro.pl", C: "+48 501 234", D: "New", E: "Facebook", F: "2026-02-14", G: "Polish market", H: "EuroPL" },
  { A: "David Kim", B: "d.kim@seoultech.kr", C: "+82 10 5678", D: "Contacted", E: "Google Ads", F: "2026-02-13", G: "", H: "SeoulTech" },
];

const COL_KEYS = ["A", "B", "C", "D", "E", "F", "G", "H"] as const;

const SHEET_INFO: Record<string, { name: string; tab: string }> = {
  "1": { name: "Q1 Leads Master", tab: "Active Leads" },
  "2": { name: "Webinar Signups", tab: "Feb 2026" },
  "3": { name: "Partner Referrals", tab: "Sheet1" },
};

export default function AppSheetMapping() {
  const { sheetId } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const sheet = SHEET_INFO[sheetId || "1"] || SHEET_INFO["1"];

  const [mapping, setMapping] = useState<Record<string, string>>({
    name: "",
    email: "",
    phone: "",
    status: "",
    source: "",
  });

  const [aiLoading, setAiLoading] = useState(false);

  const warnings = useMemo(() => {
    const w: string[] = [];
    if (!mapping.email) w.push("Email is not mapped — leads won't receive email automations.");
    if (!mapping.phone) w.push("Phone is not mapped — SMS automations will be skipped.");
    return w;
  }, [mapping]);

  const mappedCount = Object.values(mapping).filter(Boolean).length;

  const handleAiSuggest = () => {
    setAiLoading(true);
    setTimeout(() => {
      setMapping({
        name: SHEET_COLUMNS[0],
        email: SHEET_COLUMNS[1],
        phone: SHEET_COLUMNS[2],
        status: SHEET_COLUMNS[3],
        source: SHEET_COLUMNS[4],
      });
      setAiLoading(false);
      toast({ title: "AI Mapping Applied", description: "All 5 fields matched automatically." });
    }, 1200);
  };

  const handleSave = () => {
    if (!mapping.email && !mapping.phone) {
      toast({ title: "Mapping incomplete", description: "Map at least Email or Phone to continue.", variant: "destructive" });
      return;
    }
    toast({ title: "Mapping Saved", description: `${mappedCount} fields mapped for "${sheet.name}".` });
  };

  const getPreviewValue = (row: typeof PREVIEW_DATA[0], sheetCol: string) => {
    const idx = SHEET_COLUMNS.indexOf(sheetCol);
    if (idx === -1) return "—";
    return row[COL_KEYS[idx] as keyof typeof row] || "—";
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/app/sheets")} className="self-start">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Sheets
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">{sheet.name}</h1>
            <p className="text-muted-foreground text-sm">Tab: {sheet.tab} · Map sheet columns to LeadX fields</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleAiSuggest} disabled={aiLoading}>
              <Sparkles className="h-4 w-4 mr-1" />
              {aiLoading ? "Analyzing…" : "AI Suggest Mapping"}
            </Button>
            <Button onClick={handleSave}>
              <Save className="h-4 w-4 mr-1" /> Save Mapping
            </Button>
          </div>
        </div>

        {/* Warnings */}
        {warnings.length > 0 && (
          <div className="space-y-2">
            {warnings.map((w, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg border border-yellow-500/30 bg-yellow-500/5 p-3 text-sm text-yellow-600 dark:text-yellow-400">
                <AlertTriangle className="h-4 w-4 mt-0.5 shrink-0" />
                {w}
              </div>
            ))}
          </div>
        )}

        {/* Mapping Cards */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Field Mapping</CardTitle>
            <CardDescription>
              {mappedCount} of {LEAD_FIELDS.length} fields mapped
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {LEAD_FIELDS.map((field) => (
                <div key={field.key} className="space-y-1.5">
                  <label className="text-sm font-medium text-foreground flex items-center gap-1.5">
                    {field.label}
                    {field.required && (
                      <Badge variant="outline" className="text-[10px] px-1.5 py-0 font-normal border-yellow-500/40 text-yellow-600 dark:text-yellow-400">
                        recommended
                      </Badge>
                    )}
                    {mapping[field.key] && <CheckCircle2 className="h-3.5 w-3.5 text-green-500" />}
                  </label>
                  <Select
                    value={mapping[field.key]}
                    onValueChange={(val) => setMapping((prev) => ({ ...prev, [field.key]: val }))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select column…" />
                    </SelectTrigger>
                    <SelectContent>
                      {SHEET_COLUMNS.map((col) => (
                        <SelectItem key={col} value={col}>
                          {col}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Preview Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Preview — First 10 Rows</CardTitle>
            <CardDescription>Showing mapped values from your sheet data</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-10 text-center">#</TableHead>
                    {LEAD_FIELDS.map((f) => (
                      <TableHead key={f.key}>
                        {f.label}
                        {!mapping[f.key] && (
                          <span className="ml-1 text-muted-foreground/60 text-xs font-normal">unmapped</span>
                        )}
                      </TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {PREVIEW_DATA.map((row, i) => (
                    <TableRow key={i}>
                      <TableCell className="text-center text-muted-foreground text-xs">{i + 1}</TableCell>
                      {LEAD_FIELDS.map((f) => (
                        <TableCell key={f.key} className={!mapping[f.key] ? "text-muted-foreground/40 italic" : ""}>
                          {mapping[f.key] ? getPreviewValue(row, mapping[f.key]) : "—"}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
