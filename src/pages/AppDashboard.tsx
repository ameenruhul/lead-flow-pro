import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  LogOut,
  Users,
  Mail,
  MessageSquare,
  CheckCircle2,
  Coins,
  Plus,
  Table2,
  ShoppingCart,
  Workflow,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// --- Mock Data ---

const kpis = [
  { label: "Leads Captured", value: "1,247", change: "+12%", up: true, icon: Users },
  { label: "Emails Sent", value: "3,892", change: "+8%", up: true, icon: Mail },
  { label: "SMS Sent", value: "1,045", change: "+15%", up: true, icon: MessageSquare },
  { label: "Delivery Rate", value: "97.3%", change: "+0.4%", up: true, icon: CheckCircle2 },
  { label: "Credits Left", value: "4,210", change: "-18%", up: false, icon: Coins },
];

const messagesData = [
  { date: "Jan", emails: 420, sms: 110 },
  { date: "Feb", emails: 510, sms: 140 },
  { date: "Mar", emails: 480, sms: 125 },
  { date: "Apr", emails: 620, sms: 180 },
  { date: "May", emails: 750, sms: 210 },
  { date: "Jun", emails: 690, sms: 195 },
  { date: "Jul", emails: 820, sms: 240 },
];

const creditData = [
  { date: "Jan", used: 530, remaining: 9470 },
  { date: "Feb", used: 650, remaining: 8820 },
  { date: "Mar", used: 605, remaining: 8215 },
  { date: "Apr", used: 800, remaining: 7415 },
  { date: "May", used: 960, remaining: 6455 },
  { date: "Jun", used: 885, remaining: 5570 },
  { date: "Jul", used: 1060, remaining: 4510 },
];

const recentLeads = [
  { name: "Sarah Chen", email: "sarah@example.com", source: "Google Sheet", date: "2 min ago" },
  { name: "Marcus Webb", email: "marcus@biz.co", source: "CSV Import", date: "18 min ago" },
  { name: "Priya Sharma", email: "priya@startup.io", source: "Google Sheet", date: "1 hr ago" },
  { name: "Jake Miller", email: "jake@agency.com", source: "Google Sheet", date: "3 hrs ago" },
  { name: "Emily Torres", email: "emily@shop.net", source: "CSV Import", date: "5 hrs ago" },
];

const recentActivity = [
  { automation: "Welcome Sequence", event: "Email sent to sarah@example.com", status: "success", time: "2 min ago" },
  { automation: "Follow-up SMS", event: "SMS sent to +61 412 XXX", status: "success", time: "15 min ago" },
  { automation: "Welcome Sequence", event: "Email sent to marcus@biz.co", status: "success", time: "18 min ago" },
  { automation: "Re-engage Campaign", event: "Email bounced — jake@old.com", status: "failed", time: "1 hr ago" },
  { automation: "Follow-up SMS", event: "SMS sent to +61 438 XXX", status: "success", time: "2 hrs ago" },
];

// --- Component ---

export default function AppDashboard() {
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
                <Link to="/app/onboarding">Setup Guide</Link>
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

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 min-w-0 space-y-8">
            {/* KPI Cards */}
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground mb-5">Dashboard</h1>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4">
                {kpis.map((kpi) => (
                  <Card key={kpi.label} className="hover-lift">
                    <CardContent className="p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                          <kpi.icon className="h-4 w-4 text-primary" />
                        </div>
                      </div>
                      <p className="text-2xl font-display font-bold text-foreground">{kpi.value}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs text-muted-foreground">{kpi.label}</span>
                        <span
                          className={`text-xs font-medium flex items-center gap-0.5 ${
                            kpi.up ? "text-green-600 dark:text-green-400" : "text-destructive"
                          }`}
                        >
                          {kpi.up ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {kpi.change}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Charts */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Messages Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Messages Sent Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={messagesData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "0.5rem",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Line type="monotone" dataKey="emails" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                        <Line type="monotone" dataKey="sms" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Emails
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" /> SMS
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Credit Usage Chart */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Credit Usage Over Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={creditData}>
                        <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                        <XAxis dataKey="date" className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <YAxis className="text-xs" tick={{ fill: "hsl(var(--muted-foreground))" }} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "hsl(var(--card))",
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "0.5rem",
                            color: "hsl(var(--foreground))",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="used"
                          stackId="1"
                          stroke="hsl(var(--accent))"
                          fill="hsl(var(--accent) / 0.2)"
                        />
                        <Area
                          type="monotone"
                          dataKey="remaining"
                          stackId="1"
                          stroke="hsl(var(--primary))"
                          fill="hsl(var(--primary) / 0.15)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-accent" /> Used
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-primary" /> Remaining
                    </span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Recent Leads */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recent Leads</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {recentLeads.map((lead, i) => (
                      <div key={i} className="px-6 py-3 flex items-center justify-between">
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">{lead.name}</p>
                          <p className="text-xs text-muted-foreground truncate">{lead.email}</p>
                        </div>
                        <div className="text-right shrink-0 ml-4">
                          <Badge variant="secondary" className="text-[10px]">{lead.source}</Badge>
                          <p className="text-[10px] text-muted-foreground mt-1">{lead.date}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-base">Recent Automation Activity</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="divide-y divide-border">
                    {recentActivity.map((act, i) => (
                      <div key={i} className="px-6 py-3">
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-sm font-medium text-foreground">{act.automation}</span>
                          <Badge
                            variant={act.status === "success" ? "default" : "destructive"}
                            className="text-[10px]"
                          >
                            {act.status}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground">{act.event}</p>
                        <p className="text-[10px] text-muted-foreground mt-0.5">{act.time}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="w-full lg:w-72 shrink-0 space-y-6">
            {/* Credit Wallet */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Credit Wallet</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">Email Credits</span>
                    <span className="font-medium text-foreground">3,210 / 5,000</span>
                  </div>
                  <Progress value={64} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1.5">
                    <span className="text-muted-foreground">SMS Credits</span>
                    <span className="font-medium text-foreground">1,000 / 2,500</span>
                  </div>
                  <Progress value={40} className="h-2" />
                </div>
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/pricing">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Buy Credits
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="default" size="sm" className="w-full justify-start">
                  <Workflow className="h-4 w-4 mr-2" />
                  New Automation
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Table2 className="h-4 w-4 mr-2" />
                  Add Sheet
                </Button>
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Template
                </Button>
              </CardContent>
            </Card>

            {/* Plan Badge */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-5 text-center">
                <Badge className="mb-2">Pro Plan</Badge>
                <p className="text-xs text-muted-foreground">
                  Renews Feb 28, 2026
                </p>
                <Button variant="link" size="sm" className="mt-1 h-auto p-0 text-xs" asChild>
                  <Link to="/pricing">Manage plan →</Link>
                </Button>
              </CardContent>
            </Card>
          </aside>
        </div>
      </div>
    </div>
  );
}
