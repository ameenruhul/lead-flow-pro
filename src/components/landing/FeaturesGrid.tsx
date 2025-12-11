import { Zap, Code2, Table2, BarChart3 } from "lucide-react";

const features = [
  {
    icon: Zap,
    label: "Lightning Fast",
    title: "Instant follow-ups",
    description:
      "Send welcome emails and SMS the moment a new lead row is added to your sheet. No delays, no manual work.",
  },
  {
    icon: Code2,
    label: "Simple Setup",
    title: "No-code automation",
    description:
      'Build powerful flows using simple conditions like "status = new" or "source = Facebook Ads". Zero coding required.',
  },
  {
    icon: Table2,
    label: "Smart Integration",
    title: "AI-powered sheet mapping",
    description:
      "Our AI automatically detects and maps your columns – name, email, phone, status – so setup takes minutes.",
  },
  {
    icon: BarChart3,
    label: "Full Visibility",
    title: "Live stats & usage",
    description:
      "See messages sent, credit usage, and lead performance at a glance. Know exactly what's happening with your automations.",
  },
];

export function FeaturesGrid() {
  return (
    <section id="features" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mb-4">
            Four ways LeadX helps your business
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to turn your Google Sheets into an automated lead
            engine
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="glass-card p-8 hover-lift group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {feature.label}
                  </span>
                  <h3 className="text-xl font-display font-semibold text-foreground mt-1 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
