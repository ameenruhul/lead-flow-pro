import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, MessageSquare, CheckCircle, XCircle, TrendingUp, TrendingDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

// Mock KPI data
const kpiData = {
  totalLeads: { value: 2847, change: 12.5, trend: "up" as const },
  totalMessages: { value: 18432, change: 8.3, trend: "up" as const },
  deliveryRate: { value: 96.7, change: 1.2, trend: "up" as const },
  failures: { value: 612, change: -4.1, trend: "down" as const },
};

// Mock messages over time
const messagesOverTime = [
  { date: "Jan", email: 1200, sms: 800 },
  { date: "Feb", email: 1400, sms: 950 },
  { date: "Mar", email: 1100, sms: 1100 },
  { date: "Apr", email: 1600, sms: 1200 },
  { date: "May", email: 1900, sms: 1350 },
  { date: "Jun", email: 2100, sms: 1500 },
  { date: "Jul", email: 2400, sms: 1700 },
];

// Mock credit spend
const creditSpend = [
  { date: "Jan", credits: 320 },
  { date: "Feb", credits: 410 },
  { date: "Mar", credits: 380 },
  { date: "Apr", credits: 520 },
  { date: "May", credits: 610 },
  { date: "Jun", credits: 680 },
  { date: "Jul", credits: 750 },
];

// Mock lead sources
const leadSources = [
  { name: "Google Sheets", value: 42, fill: "hsl(221, 83%, 53%)" },
  { name: "CSV Import", value: 28, fill: "hsl(252, 94%, 67%)" },
  { name: "Manual Entry", value: 18, fill: "hsl(160, 60%, 45%)" },
  { name: "API", value: 12, fill: "hsl(35, 92%, 55%)" },
];

// Mock automation performance
const automationPerformance = [
  { name: "Welcome Sequence", sent: 4820, delivered: 4690, opened: 3210, replied: 890, rate: 97.3 },
  { name: "Follow-up Reminder", sent: 3150, delivered: 3020, opened: 1840, replied: 420, rate: 95.9 },
  { name: "Re-engagement", sent: 2680, delivered: 2540, opened: 1120, replied: 280, rate: 94.8 },
  { name: "New Lead Intro", sent: 1920, delivered: 1880, opened: 1450, replied: 610, rate: 97.9 },
  { name: "Payment Reminder", sent: 1340, delivered: 1290, opened: 980, replied: 340, rate: 96.3 },
];

const messagesChartConfig = {
  email: { label: "Email", color: "hsl(221, 83%, 53%)" },
  sms: { label: "SMS", color: "hsl(252, 94%, 67%)" },
};

const creditChartConfig = {
  credits: { label: "Credits", color: "hsl(221, 83%, 53%)" },
};

const AppAnalytics = () => {
  const navigate = useNavigate();
  const [timeRange, setTimeRange] = useState("7d");

  const kpis = [
    {
      title: "Total Leads",
      value: kpiData.totalLeads.value.toLocaleString(),
      change: kpiData.totalLeads.change,
      trend: kpiData.totalLeads.trend,
      icon: Users,
    },
    {
      title: "Total Messages",
      value: kpiData.totalMessages.value.toLocaleString(),
      change: kpiData.totalMessages.change,
      trend: kpiData.totalMessages.trend,
      icon: MessageSquare,
    },
    {
      title: "Delivery Rate",
      value: `${kpiData.deliveryRate.value}%`,
      change: kpiData.deliveryRate.change,
      trend: kpiData.deliveryRate.trend,
      icon: CheckCircle,
    },
    {
      title: "Failures",
      value: kpiData.failures.value.toLocaleString(),
      change: kpiData.failures.change,
      trend: kpiData.failures.trend,
      icon: XCircle,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => navigate("/app/dashboard")}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground font-display">Analytics</h1>
              <p className="text-sm text-muted-foreground">Performance overview and insights</p>
            </div>
          </div>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {kpis.map((kpi) => (
            <Card key={kpi.title} className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-muted-foreground">{kpi.title}</span>
                  <kpi.icon className="h-5 w-5 text-muted-foreground" />
                </div>
                <div className="text-3xl font-bold text-foreground font-display">{kpi.value}</div>
                <div className="flex items-center gap-1 mt-2">
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-emerald-500" />
                  )}
                  <span className="text-sm font-medium text-emerald-500">
                    {Math.abs(kpi.change)}%
                  </span>
                  <span className="text-sm text-muted-foreground">vs last period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Messages Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Messages Over Time</CardTitle>
              <CardDescription>Email and SMS volume by month</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={messagesChartConfig} className="h-[300px] w-full">
                <AreaChart data={messagesOverTime} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-muted-foreground" tick={{ fontSize: 12 }} />
                  <YAxis className="text-muted-foreground" tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Area
                    type="monotone"
                    dataKey="email"
                    stackId="1"
                    stroke="hsl(221, 83%, 53%)"
                    fill="hsl(221, 83%, 53%)"
                    fillOpacity={0.3}
                  />
                  <Area
                    type="monotone"
                    dataKey="sms"
                    stackId="1"
                    stroke="hsl(252, 94%, 67%)"
                    fill="hsl(252, 94%, 67%)"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* Credit Spend Over Time */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Credit Spend</CardTitle>
              <CardDescription>Monthly credit consumption</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={creditChartConfig} className="h-[300px] w-full">
                <BarChart data={creditSpend} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                  <XAxis dataKey="date" className="text-muted-foreground" tick={{ fontSize: 12 }} />
                  <YAxis className="text-muted-foreground" tick={{ fontSize: 12 }} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="credits" fill="hsl(221, 83%, 53%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Lead Sources + Automation Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Top Lead Sources */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Top Lead Sources</CardTitle>
              <CardDescription>Where your leads come from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={leadSources}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={4}
                      dataKey="value"
                    >
                      {leadSources.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))}
                    </Pie>
                    <ChartTooltip
                      content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        const data = payload[0].payload;
                        return (
                          <div className="rounded-lg border border-border/50 bg-background px-3 py-2 text-xs shadow-xl">
                            <div className="font-medium">{data.name}</div>
                            <div className="text-muted-foreground">{data.value}%</div>
                          </div>
                        );
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-2 mt-2">
                {leadSources.map((source) => (
                  <div key={source.name} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: source.fill }} />
                      <span className="text-foreground">{source.name}</span>
                    </div>
                    <span className="font-medium text-foreground">{source.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Automation Performance Table */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Automation Performance</CardTitle>
              <CardDescription>Delivery and engagement metrics per automation</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Automation</TableHead>
                    <TableHead className="text-right">Sent</TableHead>
                    <TableHead className="text-right">Delivered</TableHead>
                    <TableHead className="text-right">Opened</TableHead>
                    <TableHead className="text-right">Replied</TableHead>
                    <TableHead className="text-right">Rate</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {automationPerformance.map((auto) => (
                    <TableRow key={auto.name}>
                      <TableCell className="font-medium">{auto.name}</TableCell>
                      <TableCell className="text-right">{auto.sent.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{auto.delivered.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{auto.opened.toLocaleString()}</TableCell>
                      <TableCell className="text-right">{auto.replied.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge
                          variant={auto.rate >= 97 ? "default" : "secondary"}
                          className={auto.rate >= 97 ? "bg-emerald-500/10 text-emerald-600 border-emerald-500/20" : ""}
                        >
                          {auto.rate}%
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default AppAnalytics;
