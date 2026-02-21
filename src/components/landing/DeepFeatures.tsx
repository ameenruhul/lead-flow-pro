import { 
  Workflow, 
  FileText, 
  History, 
  Search,
  Sparkles,
  Mail,
  MessageSquare,
  Bell
} from "lucide-react";

const features = [
  {
    icon: Workflow,
    title: "Automation Builder",
    description: "Create powerful automations with triggers and actions",
    items: [
      { icon: Sparkles, text: "Triggers: new row added, column changes, row conditions" },
      { icon: Mail, text: "Send emails from customizable templates" },
      { icon: MessageSquare, text: "Send SMS with personalized content" },
      { icon: Bell, text: "Notify team via email or push notifications" },
    ],
    highlight: "AI assistant suggests email/SMS copy based on your business",
  },
  {
    icon: FileText,
    title: "Templates Library",
    description: "Professional email & SMS templates ready to use",
    items: [
      { text: "Variables like {{name}}, {{service}}, {{appointment_time}}" },
      { text: "Stored per user for easy reuse" },
      { text: "AI-powered content suggestions" },
    ],
  },
  {
    icon: History,
    title: "Logs & History",
    description: "Complete visibility into your automation activity",
    items: [
      { text: "Timeline of all automation runs" },
      { text: "See which leads received which messages" },
      { text: "Track success/failure status and credits used" },
    ],
  },
  {
    icon: Search,
    title: "Lead Search & Manual Actions",
    description: "Quick access to any lead with full control",
    items: [
      { text: "Search leads instantly from dashboard" },
      { text: "View complete message history per lead" },
      { text: "Manually trigger emails/SMS with AI suggestions" },
    ],
  },
];

export function DeepFeatures() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Powerful Features
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            What QuantLeads Can Do
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to automate your lead follow-ups
          </p>
        </div>

        <div className="space-y-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`glass-card p-8 md:p-10 hover-lift ${
                index % 2 === 1 ? "md:ml-12" : "md:mr-12"
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                <div className="shrink-0">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <feature.icon className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-display font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {feature.description}
                  </p>
                  <ul className="space-y-2">
                    {feature.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        {'icon' in item && item.icon ? (
                          <item.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        ) : (
                          <div className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-2" />
                        )}
                        <span className="text-muted-foreground">
                          {'text' in item ? item.text : ''}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {feature.highlight && (
                    <div className="mt-4 p-3 rounded-lg bg-accent/10 border border-accent/20">
                      <p className="text-sm text-accent font-medium flex items-center gap-2">
                        <Sparkles className="h-4 w-4" />
                        {feature.highlight}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
