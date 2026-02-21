import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Badge } from "@/components/ui/badge";
import { Shield, Lock, UserCheck, Key } from "lucide-react";

const integrations = [
  {
    name: "Google Sheets",
    description: "Sync leads from your spreadsheets in real-time. Trigger automations on new rows or status changes.",
    status: "available" as const,
    emoji: "📊",
  },
  {
    name: "SendGrid",
    description: "Send transactional and marketing emails at scale with delivery tracking and analytics.",
    status: "available" as const,
    emoji: "📧",
  },
  {
    name: "Postmark",
    description: "Reliable transactional email delivery with industry-leading inbox placement rates.",
    status: "available" as const,
    emoji: "✉️",
  },
  {
    name: "Twilio",
    description: "Send SMS messages globally with delivery receipts and two-way messaging support.",
    status: "available" as const,
    emoji: "💬",
  },
  {
    name: "ClickSend",
    description: "Multi-channel messaging — SMS, MMS, and voice — with Australian-optimised routing.",
    status: "available" as const,
    emoji: "📱",
  },
  {
    name: "MessageMedia AU",
    description: "Enterprise SMS gateway built for Australian businesses with local number support.",
    status: "available" as const,
    emoji: "🇦🇺",
  },
  {
    name: "Airtable",
    description: "Connect your Airtable bases to trigger automations and sync lead data bi-directionally.",
    status: "coming" as const,
    emoji: "🗂️",
  },
  {
    name: "HubSpot",
    description: "Sync contacts, deals, and lifecycle stages between QuantLeads and HubSpot CRM.",
    status: "coming" as const,
    emoji: "🟠",
  },
  {
    name: "Notion",
    description: "Turn Notion databases into lead sources and log automation activity directly in your workspace.",
    status: "coming" as const,
    emoji: "📝",
  },
  {
    name: "Zapier",
    description: "Connect QuantLeads to 6,000+ apps with no-code Zaps for limitless workflow possibilities.",
    status: "coming" as const,
    emoji: "⚡",
  },
  {
    name: "Webhooks API",
    description: "Build custom integrations with inbound and outbound webhooks for any event in QuantLeads.",
    status: "coming" as const,
    emoji: "🔗",
  },
];

const securityPoints = [
  {
    icon: Lock,
    title: "OAuth 2.0 Per-User",
    description: "Every user authenticates with their own OAuth tokens. We never store raw passwords or shared API keys.",
  },
  {
    icon: UserCheck,
    title: "Granular Permissions",
    description: "Each connection requests only the minimum scopes needed. You control exactly what QuantLeads can access.",
  },
  {
    icon: Shield,
    title: "Encrypted at Rest",
    description: "All tokens and credentials are encrypted with AES-256 and stored in isolated, audited vaults.",
  },
  {
    icon: Key,
    title: "Revoke Anytime",
    description: "Disconnect any integration instantly from your dashboard. Tokens are destroyed immediately on revocation.",
  },
];

export default function Integrations() {
  const available = integrations.filter((i) => i.status === "available");
  const coming = integrations.filter((i) => i.status === "coming");

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-28 pb-16 md:pt-36 md:pb-24 gradient-hero">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">
            Integrations
          </Badge>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
            Connect your <span className="gradient-text">favourite tools</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            QuantLeads plugs into the platforms you already use — spreadsheets, email providers, SMS gateways, and more.
          </p>
        </div>
      </section>

      {/* Available Now */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">Available Now</h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            These integrations are live and ready to connect from your dashboard today.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {available.map((item) => (
              <div key={item.name} className="glass-card p-6 hover-lift flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="text-4xl">{item.emoji}</span>
                  <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/10">
                    Available
                  </Badge>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section className="py-20 md:py-28 bg-secondary/30">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-2">Coming Soon</h2>
          <p className="text-muted-foreground mb-10 max-w-xl">
            We're actively building these integrations. Join the waitlist to get notified.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coming.map((item) => (
              <div key={item.name} className="glass-card p-6 opacity-80 flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="text-4xl grayscale">{item.emoji}</span>
                  <Badge variant="outline" className="text-muted-foreground">
                    Coming Soon
                  </Badge>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Secure OAuth */}
      <section className="py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <Badge variant="secondary" className="mb-4 text-sm px-4 py-1">Security</Badge>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Secure, per-user OAuth connections
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Your credentials are never shared across accounts. Every integration uses isolated OAuth 2.0 flows
              with encrypted token storage and instant revocation.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {securityPoints.map((point) => (
              <div key={point.title} className="glass-card p-6 text-center hover-lift">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <point.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{point.title}</h3>
                <p className="text-sm text-muted-foreground">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
