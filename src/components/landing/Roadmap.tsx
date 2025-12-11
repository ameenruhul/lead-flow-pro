import { 
  MessageCircle, 
  Phone, 
  Library, 
  Clock, 
  Puzzle,
  Sparkles
} from "lucide-react";

const roadmapItems = [
  {
    icon: MessageCircle,
    title: "Multi-Channel Messaging",
    description: "WhatsApp, Facebook Messenger, Telegram, Viber",
  },
  {
    icon: Phone,
    title: "Voice Call Reminders",
    description: "Automated voice calls via Twilio Voice",
  },
  {
    icon: Library,
    title: "Automation Library",
    description: "Pre-built recipes like 'Facebook Lead Ads → Welcome SMS'",
  },
  {
    icon: Clock,
    title: "Scheduled Automations",
    description: "Timer-based runs, e.g., reminder 24 hours after lead creation",
  },
  {
    icon: Puzzle,
    title: "More Integrations",
    description: "Airtable, Notion, popular CRMs, and more",
  },
];

export function Roadmap() {
  return (
    <section className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-accent uppercase tracking-wider flex items-center justify-center gap-2">
            <Sparkles className="h-4 w-4" />
            Coming Soon
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            What's on the roadmap
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We're building LeadX to be your complete lead automation platform.
            Here's what's coming next.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
          {roadmapItems.map((item) => (
            <div
              key={item.title}
              className="glass-card px-6 py-4 hover-lift flex items-center gap-4"
            >
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                <item.icon className="h-5 w-5 text-accent" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
