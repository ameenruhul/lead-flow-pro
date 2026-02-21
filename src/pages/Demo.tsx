import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Sheet, 
  Zap, 
  Mail, 
  MessageSquare, 
  History, 
  Search, 
  Settings, 
  BarChart3, 
  Plus, 
  ChevronRight,
  Check,
  X,
  Clock,
  User,
  Phone,
  Bell,
  LogOut,
  CreditCard,
  FileText,
  Play,
  Pause,
  MoreVertical,
  Filter,
  RefreshCw,
  Send,
  Sparkles,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

type TabType = "dashboard" | "sheets" | "automations" | "templates" | "logs" | "leads";

const Demo = () => {
  const [activeTab, setActiveTab] = useState<TabType>("dashboard");
  const [selectedAutomation, setSelectedAutomation] = useState<number | null>(null);

  const sidebarItems = [
    { id: "dashboard" as TabType, label: "Dashboard", icon: BarChart3 },
    { id: "sheets" as TabType, label: "Connected Sheets", icon: Sheet },
    { id: "automations" as TabType, label: "Automations", icon: Zap },
    { id: "templates" as TabType, label: "Templates", icon: FileText },
    { id: "logs" as TabType, label: "Logs & History", icon: History },
    { id: "leads" as TabType, label: "Lead Search", icon: Search },
  ];

  const mockSheets = [
    { id: 1, name: "Facebook Leads - Q4", rows: 1247, lastSync: "2 mins ago", status: "active" },
    { id: 2, name: "Website Contact Form", rows: 892, lastSync: "5 mins ago", status: "active" },
    { id: 3, name: "Google Ads Leads", rows: 456, lastSync: "1 hour ago", status: "paused" },
  ];

  const mockAutomations = [
    { id: 1, name: "Welcome Email - New Facebook Leads", trigger: "New row added", actions: ["Send Email", "Update Status"], status: "active", runs: 234 },
    { id: 2, name: "SMS Follow-up - Hot Leads", trigger: "Status = 'Hot'", actions: ["Send SMS", "Notify Team"], status: "active", runs: 89 },
    { id: 3, name: "Appointment Reminder", trigger: "24h before appointment", actions: ["Send Email", "Send SMS"], status: "active", runs: 156 },
    { id: 4, name: "Cold Lead Re-engagement", trigger: "No response in 7 days", actions: ["Send Email"], status: "paused", runs: 45 },
  ];

  const mockTemplates = [
    { id: 1, name: "Welcome Email", type: "email", subject: "Welcome to {{company}}!", preview: "Hi {{name}}, thank you for your interest..." },
    { id: 2, name: "Quick Follow-up SMS", type: "sms", preview: "Hi {{name}}! Thanks for reaching out. We'll..." },
    { id: 3, name: "Appointment Confirmation", type: "email", subject: "Your appointment is confirmed", preview: "Dear {{name}}, your appointment on {{date}}..." },
    { id: 4, name: "Quote Reminder", type: "sms", preview: "Hi {{name}}, just checking in about the quote..." },
  ];

  const mockLogs = [
    { id: 1, lead: "John Smith", action: "Welcome Email Sent", status: "success", time: "2 mins ago", automation: "Welcome Email - New Facebook Leads" },
    { id: 2, lead: "Sarah Johnson", action: "SMS Sent", status: "success", time: "5 mins ago", automation: "SMS Follow-up - Hot Leads" },
    { id: 3, lead: "Mike Brown", action: "Email Sent", status: "failed", time: "12 mins ago", automation: "Appointment Reminder" },
    { id: 4, lead: "Emily Davis", action: "Status Updated", status: "success", time: "15 mins ago", automation: "Welcome Email - New Facebook Leads" },
    { id: 5, lead: "Chris Wilson", action: "Team Notified", status: "success", time: "20 mins ago", automation: "SMS Follow-up - Hot Leads" },
  ];

  const mockLeads = [
    { id: 1, name: "John Smith", email: "john@example.com", phone: "+1 555-0123", source: "Facebook Ads", status: "New", created: "Today" },
    { id: 2, name: "Sarah Johnson", email: "sarah@company.com", phone: "+1 555-0456", source: "Website Form", status: "Hot", created: "Yesterday" },
    { id: 3, name: "Mike Brown", email: "mike@business.com", phone: "+1 555-0789", source: "Google Ads", status: "Contacted", created: "2 days ago" },
    { id: 4, name: "Emily Davis", email: "emily@startup.io", phone: "+1 555-0321", source: "Facebook Ads", status: "Qualified", created: "3 days ago" },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Sheet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground">QuantLeads</h1>
              <span className="text-xs text-muted-foreground">Demo Mode</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-border">
          <div className="glass-card p-4 rounded-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-foreground">Credits</span>
              <CreditCard className="w-4 h-4 text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="text-foreground font-medium">847 / 1000</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-primary rounded-full" style={{ width: "84.7%" }} />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">SMS</span>
                <span className="text-foreground font-medium">123 / 250</span>
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <div className="h-full bg-accent rounded-full" style={{ width: "49.2%" }} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-border">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Demo User</p>
              <p className="text-xs text-muted-foreground">demo@quantleads.io</p>
            </div>
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Settings className="w-4 h-4 text-muted-foreground" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {/* Top Bar */}
        <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-xl border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-display font-bold text-foreground capitalize">{activeTab.replace("-", " ")}</h2>
              <p className="text-sm text-muted-foreground">
                {activeTab === "dashboard" && "Overview of your lead automation"}
                {activeTab === "sheets" && "Manage your connected Google Sheets"}
                {activeTab === "automations" && "Create and manage your automations"}
                {activeTab === "templates" && "Email and SMS templates"}
                {activeTab === "logs" && "View automation history and logs"}
                {activeTab === "leads" && "Search and manage your leads"}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-secondary rounded-xl transition-colors relative">
                <Bell className="w-5 h-5 text-muted-foreground" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
              </button>
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync
              </Button>
              {activeTab === "automations" && (
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Automation
                </Button>
              )}
              {activeTab === "templates" && (
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  New Template
                </Button>
              )}
              {activeTab === "sheets" && (
                <Button size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  Connect Sheet
                </Button>
              )}
            </div>
          </div>
        </header>

        <div className="p-8">
          {/* Dashboard View */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: "Total Leads", value: "2,595", change: "+12%", icon: User, color: "primary" },
                  { label: "Emails Sent", value: "1,847", change: "+8%", icon: Mail, color: "accent" },
                  { label: "SMS Sent", value: "523", change: "+15%", icon: MessageSquare, color: "primary" },
                  { label: "Active Automations", value: "3", change: "0", icon: Zap, color: "accent" },
                ].map((stat, i) => (
                  <div key={i} className="glass-card p-6 rounded-2xl hover-lift">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-${stat.color}/10 flex items-center justify-center`}>
                        <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                      </div>
                      <span className={`text-sm font-medium ${stat.change.startsWith("+") ? "text-green-500" : "text-muted-foreground"}`}>
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-3xl font-bold text-foreground mb-1">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Recent Activity & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 glass-card rounded-2xl p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
                    <Button variant="ghost" size="sm">View All</Button>
                  </div>
                  <div className="space-y-4">
                    {mockLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          log.status === "success" ? "bg-green-500/10" : "bg-red-500/10"
                        }`}>
                          {log.status === "success" ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <X className="w-5 h-5 text-red-500" />
                          )}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{log.lead} - {log.action}</p>
                          <p className="text-xs text-muted-foreground">{log.automation}</p>
                        </div>
                        <span className="text-xs text-muted-foreground">{log.time}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="glass-card rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    {[
                      { label: "Send Quick Email", icon: Mail, desc: "AI-assisted compose" },
                      { label: "Send Quick SMS", icon: MessageSquare, desc: "To any lead" },
                      { label: "Import Leads", icon: Sheet, desc: "From Google Sheets" },
                      { label: "Create Automation", icon: Zap, desc: "No-code builder" },
                    ].map((action, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-4 p-4 rounded-xl border border-border hover:border-primary/50 hover:bg-primary/5 transition-all group"
                      >
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <action.icon className="w-5 h-5 text-primary" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-medium text-foreground">{action.label}</p>
                          <p className="text-xs text-muted-foreground">{action.desc}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Connected Sheets View */}
          {activeTab === "sheets" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockSheets.map((sheet) => (
                  <div key={sheet.id} className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                        <Sheet className="w-6 h-6 text-green-500" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          sheet.status === "active" 
                            ? "bg-green-500/10 text-green-500" 
                            : "bg-yellow-500/10 text-yellow-500"
                        }`}>
                          {sheet.status}
                        </span>
                        <button className="p-1 hover:bg-secondary rounded-lg transition-colors">
                          <MoreVertical className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{sheet.name}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{sheet.rows.toLocaleString()} rows</span>
                      <span>•</span>
                      <span>Synced {sheet.lastSync}</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-border flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Settings className="w-4 h-4 mr-2" />
                        Configure
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Sync
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Add New Sheet Card */}
                <button className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group min-h-[240px]">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                  </div>
                  <div className="text-center">
                    <p className="text-foreground font-medium">Connect New Sheet</p>
                    <p className="text-sm text-muted-foreground">Import leads from Google Sheets</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Automations View */}
          {activeTab === "automations" && (
            <div className="space-y-6">
              {mockAutomations.map((auto) => (
                <div 
                  key={auto.id} 
                  className={`glass-card rounded-2xl p-6 hover-lift cursor-pointer transition-all ${
                    selectedAutomation === auto.id ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setSelectedAutomation(selectedAutomation === auto.id ? null : auto.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        auto.status === "active" ? "bg-primary/10" : "bg-secondary"
                      }`}>
                        <Zap className={`w-6 h-6 ${auto.status === "active" ? "text-primary" : "text-muted-foreground"}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-foreground mb-1">{auto.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>Trigger: {auto.trigger}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        auto.status === "active" 
                          ? "bg-green-500/10 text-green-500" 
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}>
                        {auto.status}
                      </span>
                      <Button variant="ghost" size="sm">
                        {auto.status === "active" ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-6">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Actions:</span>
                      <div className="flex gap-1">
                        {auto.actions.map((action, i) => (
                          <span key={i} className="px-2 py-1 bg-secondary rounded-lg text-xs text-foreground">
                            {action}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <BarChart3 className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{auto.runs} runs</span>
                    </div>
                  </div>

                  {selectedAutomation === auto.id && (
                    <div className="mt-6 pt-6 border-t border-border">
                      <h4 className="text-sm font-medium text-foreground mb-4">Automation Flow</h4>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 p-4 bg-secondary rounded-xl text-center">
                          <p className="text-xs text-muted-foreground mb-1">Trigger</p>
                          <p className="text-sm font-medium text-foreground">{auto.trigger}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                        {auto.actions.map((action, i) => (
                          <div key={i} className="flex items-center gap-4">
                            <div className="flex-1 p-4 bg-primary/10 rounded-xl text-center">
                              <p className="text-xs text-muted-foreground mb-1">Action {i + 1}</p>
                              <p className="text-sm font-medium text-foreground">{action}</p>
                            </div>
                            {i < auto.actions.length - 1 && <ChevronRight className="w-5 h-5 text-muted-foreground" />}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Templates View */}
          {activeTab === "templates" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTemplates.map((template) => (
                <div key={template.id} className="glass-card rounded-2xl p-6 hover-lift">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                        template.type === "email" ? "bg-primary/10" : "bg-accent/10"
                      }`}>
                        {template.type === "email" ? (
                          <Mail className={`w-5 h-5 text-primary`} />
                        ) : (
                          <MessageSquare className={`w-5 h-5 text-accent`} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground">{template.name}</h3>
                        <span className="text-xs text-muted-foreground capitalize">{template.type} template</span>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>

                  {template.subject && (
                    <p className="text-sm font-medium text-foreground mb-2">Subject: {template.subject}</p>
                  )}
                  <p className="text-sm text-muted-foreground line-clamp-2">{template.preview}</p>

                  <div className="mt-4 pt-4 border-t border-border flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI Improve
                    </Button>
                  </div>
                </div>
              ))}

              {/* Create Template Card */}
              <button className="border-2 border-dashed border-border rounded-2xl p-6 flex flex-col items-center justify-center gap-4 hover:border-primary/50 hover:bg-primary/5 transition-all group min-h-[200px]">
                <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Plus className="w-8 h-8 text-muted-foreground group-hover:text-primary" />
                </div>
                <div className="text-center">
                  <p className="text-foreground font-medium">Create New Template</p>
                  <p className="text-sm text-muted-foreground">Email or SMS with AI assistance</p>
                </div>
              </button>
            </div>
          )}

          {/* Logs View */}
          {activeTab === "logs" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="glass-card rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Lead</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Action</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Automation</th>
                      <th className="text-left px-6 py-4 text-sm font-medium text-muted-foreground">Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLogs.map((log) => (
                      <tr key={log.id} className="border-t border-border hover:bg-secondary/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            log.status === "success" ? "bg-green-500/10" : "bg-red-500/10"
                          }`}>
                            {log.status === "success" ? (
                              <Check className="w-4 h-4 text-green-500" />
                            ) : (
                              <X className="w-4 h-4 text-red-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-foreground">{log.lead}</td>
                        <td className="px-6 py-4 text-sm text-foreground">{log.action}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{log.automation}</td>
                        <td className="px-6 py-4 text-sm text-muted-foreground">{log.time}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Leads View */}
          {activeTab === "leads" && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search leads by name, email, or phone..."
                    className="w-full pl-12 pr-4 py-3 bg-secondary rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button variant="outline">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockLeads.map((lead) => (
                  <div key={lead.id} className="glass-card rounded-2xl p-6 hover-lift">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-foreground">{lead.name}</h3>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                            lead.status === "Hot" ? "bg-red-500/10 text-red-500" :
                            lead.status === "New" ? "bg-blue-500/10 text-blue-500" :
                            lead.status === "Qualified" ? "bg-green-500/10 text-green-500" :
                            "bg-yellow-500/10 text-yellow-500"
                          }`}>
                            {lead.status}
                          </span>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{lead.created}</span>
                    </div>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{lead.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{lead.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Sheet className="w-4 h-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Source: {lead.source}</span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Mail className="w-4 h-4 mr-2" />
                        Email
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        SMS
                      </Button>
                      <Button variant="ghost" size="sm">
                        <History className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Demo;
