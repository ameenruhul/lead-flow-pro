import { Link2, Workflow, Sparkles, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Link2,
    step: "01",
    title: "Connect your sheet",
    description:
      "Sign in with Google, pick the sheet or tab, and map columns like name, email, phone. Takes under 2 minutes.",
  },
  {
    icon: Workflow,
    step: "02",
    title: "Create an automation",
    description:
      'Choose a trigger: new row, status changes, or a condition like status = "new". Add actions: send email, send SMS, notify your team.',
  },
  {
    icon: Sparkles,
    step: "03",
    title: "Sit back and let LeadX work",
    description:
      "New leads get instant messages, your team gets alerts, and you see everything in your dashboard. It just works.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Simple Process
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            How it works in 3 steps
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From new row to follow-up in seconds. No technical skills required.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.step} className="relative">
              {/* Connector arrow (hidden on last item and mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-16 -right-4 z-10">
                  <ArrowRight className="h-8 w-8 text-primary/30" />
                </div>
              )}

              <div className="glass-card p-8 h-full hover-lift text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <span className="text-5xl font-display font-bold text-primary/20">
                  {step.step}
                </span>
                <h3 className="text-xl font-display font-semibold text-foreground mt-2 mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
