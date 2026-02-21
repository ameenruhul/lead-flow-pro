import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Zap, Mail, MessageSquare, ArrowRight, Sparkles,
  Search, User, Clock, BarChart3, TrendingUp, DollarSign,
  CreditCard, PauseCircle, FileText, Phone, ChevronRight,
  Activity, Send, CheckCircle2, AlertCircle, Settings,
  Table, Filter, Eye
} from "lucide-react";

/* ───── Section wrapper with alternating bg ───── */
const Section = ({
  id, children, alt = false,
}: { id: string; children: React.ReactNode; alt?: boolean }) => (
  <section
    id={id}
    className={`py-20 md:py-28 ${alt ? "bg-secondary/50" : "bg-background"}`}
  >
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

const SectionHeader = ({ badge, title, description }: { badge: string; title: string; description: string }) => (
  <div className="max-w-2xl mx-auto text-center mb-16">
    <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
      {badge}
    </span>
    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">{title}</h2>
    <p className="text-muted-foreground text-lg">{description}</p>
  </div>
);

/* ═══════════════════════════════════════════════════
   1. Automation Engine
   ═══════════════════════════════════════════════════ */
function AutomationEngine() {
  const triggers = [
    { icon: Table, label: "New row added", desc: "When a lead appears in your sheet" },
    { icon: Activity, label: "Status change", desc: "Column value updates to target" },
    { icon: AlertCircle, label: "Condition met", desc: "Custom formula evaluates true" },
  ];

  const actions = [
    { icon: Mail, label: "Send email", desc: "Personalized with template vars" },
    { icon: Phone, label: "Send SMS", desc: "Via Twilio / built-in gateway" },
  ];

  return (
    <Section id="automation-engine">
      <SectionHeader
        badge="Automation Engine"
        title="Set it. Forget it. Close deals."
        description="Build powerful workflows that react to your Google Sheet data in real time — no code required."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Triggers & Actions cards */}
        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Triggers</h3>
            <div className="space-y-3">
              {triggers.map((t) => (
                <Card key={t.label} className="border-border hover-lift">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <t.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{t.label}</p>
                      <p className="text-sm text-muted-foreground">{t.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">Actions</h3>
            <div className="space-y-3">
              {actions.map((a) => (
                <Card key={a.label} className="border-border hover-lift">
                  <CardContent className="flex items-center gap-4 p-4">
                    <div className="h-10 w-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <a.icon className="h-5 w-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{a.label}</p>
                      <p className="text-sm text-muted-foreground">{a.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Static workflow diagram */}
        <div className="glass-card p-6 md:p-8">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-6">Workflow Preview</h3>
          <div className="space-y-4">
            {/* Step 1 */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <div className="flex-1 rounded-xl border border-border bg-card p-3">
                <p className="text-sm font-medium text-foreground">Trigger: New row in "Leads" sheet</p>
                <p className="text-xs text-muted-foreground mt-0.5">Column A ≠ empty</p>
              </div>
            </div>
            <div className="flex justify-center"><ChevronRight className="h-5 w-5 text-muted-foreground rotate-90" /></div>

            {/* Step 2 */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
              <div className="flex-1 rounded-xl border border-border bg-card p-3">
                <p className="text-sm font-medium text-foreground">Condition: Status = "New"</p>
                <p className="text-xs text-muted-foreground mt-0.5">Check column D value</p>
              </div>
            </div>
            <div className="flex justify-center"><ChevronRight className="h-5 w-5 text-muted-foreground rotate-90" /></div>

            {/* Step 3 */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">3</div>
              <div className="flex-1 rounded-xl border border-accent/30 bg-accent/5 p-3">
                <p className="text-sm font-medium text-foreground">Action: Send welcome email</p>
                <p className="text-xs text-muted-foreground mt-0.5">Template: "intro_sequence_v2"</p>
              </div>
            </div>
            <div className="flex justify-center"><ChevronRight className="h-5 w-5 text-muted-foreground rotate-90" /></div>

            {/* Step 4 */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-accent text-accent-foreground flex items-center justify-center text-sm font-bold">4</div>
              <div className="flex-1 rounded-xl border border-accent/30 bg-accent/5 p-3">
                <p className="text-sm font-medium text-foreground">Action: Update status → "Contacted"</p>
                <p className="text-xs text-muted-foreground mt-0.5">Write back to column D</p>
              </div>
            </div>

            {/* Status bar */}
            <div className="mt-6 flex items-center gap-2 rounded-lg bg-primary/5 p-3">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span className="text-sm text-foreground font-medium">Workflow active</span>
              <span className="ml-auto text-xs text-muted-foreground">Last run 2 min ago</span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   2. Smart Templates
   ═══════════════════════════════════════════════════ */
function SmartTemplates() {
  return (
    <Section id="smart-templates" alt>
      <SectionHeader
        badge="Smart Templates"
        title="Write once. Personalize infinitely."
        description="Create email & SMS templates with dynamic variables pulled straight from your sheet columns."
      />

      <div className="grid lg:grid-cols-2 gap-12 items-start">
        {/* Email template mock */}
        <div className="glass-card p-6 md:p-8 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-foreground">Email Template</span>
            <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Active</span>
          </div>
          <div className="rounded-xl border border-border bg-card p-4 space-y-3">
            <div>
              <label className="text-xs text-muted-foreground">Subject</label>
              <div className="mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                Hey <span className="bg-primary/10 text-primary px-1 rounded">{"{{name}}"}</span>, quick question about <span className="bg-primary/10 text-primary px-1 rounded">{"{{company}}"}</span>
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground">Body</label>
              <div className="mt-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground space-y-2">
                <p>Hi <span className="bg-primary/10 text-primary px-1 rounded">{"{{name}}"}</span>,</p>
                <p>I noticed <span className="bg-primary/10 text-primary px-1 rounded">{"{{company}}"}</span> is scaling fast. We helped similar teams cut outreach time by 60%.</p>
                <p>Worth a 15-min call this <span className="bg-primary/10 text-primary px-1 rounded">{"{{day}}"}</span>?</p>
                <p className="text-muted-foreground">— <span className="bg-primary/10 text-primary px-1 rounded">{"{{sender_name}}"}</span></p>
              </div>
            </div>
          </div>
          <Button variant="outline" className="w-full gap-2" disabled>
            <Sparkles className="h-4 w-4" />
            AI: Suggest improvements
          </Button>
        </div>

        {/* SMS template mock */}
        <div className="space-y-6">
          <div className="glass-card p-6 md:p-8 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <MessageSquare className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-foreground">SMS Template</span>
              <span className="ml-auto text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">Draft</span>
            </div>
            <div className="rounded-xl border border-border bg-card p-4">
              <div className="rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground">
                Hi <span className="bg-accent/10 text-accent px-1 rounded">{"{{name}}"}</span>! Saw your interest in <span className="bg-accent/10 text-accent px-1 rounded">{"{{product}}"}</span>. Reply YES for a quick walkthrough or visit <span className="bg-accent/10 text-accent px-1 rounded">{"{{link}}"}</span>
              </div>
              <div className="flex items-center justify-between mt-3 text-xs text-muted-foreground">
                <span>148 / 160 characters</span>
                <span>1 credit per send</span>
              </div>
            </div>
          </div>

          {/* Variable reference */}
          <Card className="border-border">
            <CardContent className="p-4">
              <h4 className="text-sm font-medium text-foreground mb-3">Available Variables</h4>
              <div className="flex flex-wrap gap-2">
                {["name", "email", "company", "phone", "product", "day", "sender_name", "link"].map((v) => (
                  <span key={v} className="px-2.5 py-1 rounded-lg bg-secondary text-secondary-foreground text-xs font-mono">
                    {`{{${v}}}`}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   3. Lead Search (Mini CRM)
   ═══════════════════════════════════════════════════ */
function LeadSearch() {
  const leads = [
    { name: "Sarah Chen", company: "Acme Corp", email: "sarah@acme.co", status: "Contacted", score: 92 },
    { name: "James Wilson", company: "NovaTech", email: "james@novatech.io", status: "New", score: 78 },
    { name: "Maria Garcia", company: "BlueSky AI", email: "maria@bluesky.ai", status: "Replied", score: 95 },
    { name: "David Kim", company: "StartupXYZ", email: "david@startupxyz.com", status: "New", score: 64 },
  ];

  const timeline = [
    { time: "2 hours ago", event: "Email opened", icon: Eye },
    { time: "1 day ago", event: "Welcome email sent", icon: Send },
    { time: "2 days ago", event: "Added from Sheet", icon: Table },
  ];

  const statusColor: Record<string, string> = {
    New: "bg-primary/10 text-primary",
    Contacted: "bg-accent/10 text-accent",
    Replied: "bg-emerald-500/10 text-emerald-600",
  };

  return (
    <Section id="lead-search">
      <SectionHeader
        badge="Lead Search"
        title="Your leads. Organized. Actionable."
        description="A searchable mini-CRM that syncs with your sheets — see every lead's journey at a glance."
      />

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Leads table */}
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 flex items-center gap-2 rounded-xl border border-input bg-background px-3 py-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Search leads…</span>
            </div>
            <Button variant="outline" size="sm" className="gap-1.5">
              <Filter className="h-3.5 w-3.5" /> Filters
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase text-muted-foreground">Name</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase text-muted-foreground">Company</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase text-muted-foreground hidden md:table-cell">Email</th>
                  <th className="text-left py-3 px-2 text-xs font-semibold uppercase text-muted-foreground">Status</th>
                  <th className="text-right py-3 px-2 text-xs font-semibold uppercase text-muted-foreground">Score</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((l) => (
                  <tr key={l.email} className="border-b border-border/50 hover:bg-secondary/50 transition-colors">
                    <td className="py-3 px-2 font-medium text-foreground">{l.name}</td>
                    <td className="py-3 px-2 text-muted-foreground">{l.company}</td>
                    <td className="py-3 px-2 text-muted-foreground hidden md:table-cell">{l.email}</td>
                    <td className="py-3 px-2">
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${statusColor[l.status]}`}>
                        {l.status}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-mono text-foreground">{l.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Lead profile timeline */}
        <div className="glass-card p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground">Sarah Chen</p>
              <p className="text-sm text-muted-foreground">Acme Corp</p>
            </div>
          </div>

          <div className="space-y-1 mb-6">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Lead score</span>
              <span className="font-mono font-medium text-foreground">92 / 100</span>
            </div>
            <div className="h-2 rounded-full bg-secondary overflow-hidden">
              <div className="h-full w-[92%] rounded-full bg-primary" />
            </div>
          </div>

          <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Activity Timeline</h4>
          <div className="space-y-4">
            {timeline.map((t, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center shrink-0 mt-0.5">
                  <t.icon className="h-3.5 w-3.5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm text-foreground">{t.event}</p>
                  <p className="text-xs text-muted-foreground">{t.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   4. Analytics Dashboard
   ═══════════════════════════════════════════════════ */
function AnalyticsDashboard() {
  const kpis = [
    { label: "Emails Sent", value: "12,847", change: "+18%", icon: Mail, color: "text-primary" },
    { label: "SMS Delivered", value: "3,291", change: "+24%", icon: MessageSquare, color: "text-accent" },
    { label: "Open Rate", value: "62.4%", change: "+5.2%", icon: TrendingUp, color: "text-emerald-500" },
    { label: "Monthly Spend", value: "$284", change: "-12%", icon: DollarSign, color: "text-amber-500" },
  ];

  const chartBars = [
    { month: "Sep", email: 65, sms: 30 },
    { month: "Oct", email: 75, sms: 40 },
    { month: "Nov", email: 60, sms: 35 },
    { month: "Dec", email: 85, sms: 50 },
    { month: "Jan", email: 95, sms: 55 },
    { month: "Feb", email: 100, sms: 60 },
  ];

  return (
    <Section id="analytics-dashboard" alt>
      <SectionHeader
        badge="Analytics"
        title="Know what's working. In real time."
        description="Track every email, SMS, open, and reply — with spend insights to keep your budget tight."
      />

      {/* KPI cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {kpis.map((k) => (
          <Card key={k.label} className="border-border hover-lift">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <k.icon className={`h-5 w-5 ${k.color}`} />
                <span className={`text-xs font-medium ${k.change.startsWith("+") ? "text-emerald-500" : "text-amber-500"}`}>
                  {k.change}
                </span>
              </div>
              <p className="text-2xl font-bold font-display text-foreground">{k.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{k.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart mock */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-medium text-foreground">Messages Over Time</h3>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary" /> Email</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-accent" /> SMS</span>
            </div>
          </div>
          {/* Simple bar chart */}
          <div className="flex items-end gap-3 h-48">
            {chartBars.map((b) => (
              <div key={b.month} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex gap-1 items-end justify-center h-40">
                  <div
                    className="w-[40%] bg-primary rounded-t-md transition-all"
                    style={{ height: `${b.email}%` }}
                  />
                  <div
                    className="w-[40%] bg-accent rounded-t-md transition-all"
                    style={{ height: `${b.sms}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground">{b.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Spend tracking */}
        <div className="glass-card p-6">
          <h3 className="font-medium text-foreground mb-4">Spend Breakdown</h3>
          <div className="space-y-4">
            {[
              { label: "Email sends", amount: "$142.00", pct: 50 },
              { label: "SMS sends", amount: "$98.40", pct: 35 },
              { label: "AI suggestions", amount: "$43.60", pct: 15 },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-medium text-foreground">{s.amount}</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className="h-full rounded-full bg-primary/70" style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 pt-4 border-t border-border flex justify-between text-sm">
            <span className="text-muted-foreground font-medium">Total this month</span>
            <span className="font-bold text-foreground">$284.00</span>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   5. Credit-Based Billing
   ═══════════════════════════════════════════════════ */
function CreditBilling() {
  const tiers = [
    { credits: "500", price: "$29", perCredit: "$0.058", popular: false },
    { credits: "2,000", price: "$79", perCredit: "$0.040", popular: true },
    { credits: "10,000", price: "$249", perCredit: "$0.025", popular: false },
  ];

  return (
    <Section id="credit-billing">
      <SectionHeader
        badge="Credit-Based Billing"
        title="Pay for what you use. Nothing more."
        description="Transparent credit pricing with auto-pause when credits run out — no surprise invoices."
      />

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        {tiers.map((t) => (
          <Card
            key={t.credits}
            className={`border-border hover-lift relative ${t.popular ? "ring-2 ring-primary shadow-glow" : ""}`}
          >
            {t.popular && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                Most Popular
              </span>
            )}
            <CardContent className="p-6 text-center space-y-4 pt-8">
              <p className="text-4xl font-display font-bold text-foreground">{t.credits}</p>
              <p className="text-sm text-muted-foreground">credits / month</p>
              <p className="text-2xl font-bold text-foreground">{t.price}<span className="text-base font-normal text-muted-foreground">/mo</span></p>
              <p className="text-xs text-muted-foreground">{t.perCredit} per credit</p>
              <Button variant={t.popular ? "hero" : "outline"} className="w-full" asChild>
                <Link to="/signup">Get started</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Auto-pause explainer */}
      <div className="max-w-2xl mx-auto glass-card p-6 md:p-8">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-2xl bg-amber-500/10 flex items-center justify-center shrink-0">
            <PauseCircle className="h-6 w-6 text-amber-500" />
          </div>
          <div>
            <h3 className="font-medium text-foreground text-lg mb-2">Auto-pause when credits run out</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              When your monthly credits hit zero, all automations pause automatically.
              No hidden charges, no overage fees. Upgrade or wait for the next cycle to resume — you're always in control.
            </p>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> No overage fees
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Instant resume
              </span>
              <span className="flex items-center gap-1.5 text-muted-foreground">
                <CheckCircle2 className="h-4 w-4 text-primary" /> Rollover option
              </span>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════
   Page
   ═══════════════════════════════════════════════════ */
const Features = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-28 pb-16 md:pt-36 md:pb-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6">
              Every feature, <span className="gradient-text">explained</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              A deep dive into everything LeadX does — from automation triggers to credit billing. 
              See exactly how each piece works before you sign up.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {["Automation", "Templates", "Lead Search", "Analytics", "Billing"].map((s, i) => (
                <Button
                  key={s}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const ids = ["automation-engine", "smart-templates", "lead-search", "analytics-dashboard", "credit-billing"];
                    document.getElementById(ids[i])?.scrollIntoView({ behavior: "smooth" });
                  }}
                >
                  {s}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <AutomationEngine />
        <SmartTemplates />
        <LeadSearch />
        <AnalyticsDashboard />
        <CreditBilling />

        {/* Bottom CTA */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to automate your outreach?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join the waitlist and be the first to turn your Google Sheets into a lead machine.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">Get early access <ArrowRight className="ml-1 h-4 w-4" /></Link>
              </Button>
              <Button variant="hero-outline" size="lg" asChild>
                <Link to="/demo">Try the demo</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Features;
