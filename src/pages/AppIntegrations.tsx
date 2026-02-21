import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import {
  LogOut,
  Table2,
  Mail,
  MessageSquare,
  Settings2,
  Unplug,
  CheckCircle2,
  Clock,
  BarChart3,
  Blocks,
  StickyNote,
  Zap,
  Webhook,
} from "lucide-react";

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: React.ElementType;
  status: "connected" | "coming_soon";
  detail?: string;
}

const connectedIntegrations: Integration[] = [
  {
    id: "google-sheets",
    name: "Google Sheets",
    description: "Sync leads from your spreadsheets automatically.",
    icon: Table2,
    status: "connected",
    detail: "Connected as workspace@company.com · 3 sheets synced · Last sync 4 min ago",
  },
  {
    id: "email-provider",
    name: "Email Provider",
    description: "Send transactional and campaign emails via SendGrid.",
    icon: Mail,
    status: "connected",
    detail: "SendGrid · API key ending in …x4f2 · 3,892 emails sent this month",
  },
  {
    id: "sms-provider",
    name: "SMS Provider",
    description: "Send SMS messages via Twilio to your leads.",
    icon: MessageSquare,
    status: "connected",
    detail: "Twilio · From: +61 400 XXX XXX · 1,045 messages sent this month",
  },
];

const comingSoonIntegrations: Integration[] = [
  { id: "airtable", name: "Airtable", description: "Sync records from Airtable bases.", icon: Blocks, status: "coming_soon" },
  { id: "hubspot", name: "HubSpot", description: "Two-way CRM sync with HubSpot.", icon: BarChart3, status: "coming_soon" },
  { id: "notion", name: "Notion", description: "Pull leads from Notion databases.", icon: StickyNote, status: "coming_soon" },
  { id: "zapier", name: "Zapier", description: "Connect 5,000+ apps via Zapier.", icon: Zap, status: "coming_soon" },
  { id: "webhooks", name: "Webhooks API", description: "Push & receive data via custom webhooks.", icon: Webhook, status: "coming_soon" },
];

export default function AppIntegrations() {
  const { toast } = useToast();
  const [configModal, setConfigModal] = useState<Integration | null>(null);

  const handleDisconnect = (name: string) => {
    toast({
      title: `${name} disconnected`,
      description: "You can reconnect anytime from this page.",
    });
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-display font-bold gradient-text">
              QuantLeads
            </Link>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="sm" asChild>
                <Link to="/app/dashboard">Dashboard</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/">
                  <LogOut className="h-4 w-4 mr-2" />
                  Log out
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-8">
          <h1 className="text-2xl font-display font-bold text-foreground">Integrations</h1>
          <p className="text-muted-foreground mt-1">Manage your connected services and data sources.</p>
        </div>

        {/* Connected */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Active Connections</h2>
        <div className="grid gap-4 mb-10">
          {connectedIntegrations.map((int) => (
            <Card key={int.id} className="hover-lift">
              <CardContent className="p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <int.icon className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display font-semibold text-foreground">{int.name}</span>
                    <Badge variant="default" className="gap-1 text-[10px]">
                      <CheckCircle2 className="h-3 w-3" /> Connected
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{int.description}</p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="outline" size="sm" onClick={() => setConfigModal(int)}>
                    <Settings2 className="h-4 w-4 mr-1.5" /> Configure
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDisconnect(int.name)}>
                    <Unplug className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Coming Soon */}
        <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Coming Soon</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {comingSoonIntegrations.map((int) => (
            <Card key={int.id} className="opacity-70">
              <CardContent className="p-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center shrink-0">
                  <int.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-display font-semibold text-foreground">{int.name}</span>
                    <Badge variant="secondary" className="gap-1 text-[10px]">
                      <Clock className="h-3 w-3" /> Soon
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{int.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Configure Modal */}
      <Dialog open={!!configModal} onOpenChange={() => setConfigModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-display">Configure {configModal?.name}</DialogTitle>
            <DialogDescription>Connection details and settings.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="glass-card p-4 text-sm text-foreground">{configModal?.detail}</div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" size="sm" onClick={() => setConfigModal(null)}>
                Close
              </Button>
              <Button variant="default" size="sm" onClick={() => {
                toast({ title: "Settings saved", description: `${configModal?.name} configuration updated.` });
                setConfigModal(null);
              }}>
                Save Changes
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
