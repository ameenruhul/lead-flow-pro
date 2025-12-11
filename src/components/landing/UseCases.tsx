import { Wrench, Building2, GraduationCap, Store } from "lucide-react";

const useCases = [
  {
    icon: Wrench,
    title: "Local Service Businesses",
    description:
      "Plumbers, electricians, HVAC, home automation – instantly follow up on quote requests and job inquiries from your lead sheet.",
  },
  {
    icon: Building2,
    title: "Agencies",
    description:
      "Managing leads for multiple clients? Connect each client's sheet and automate their follow-ups without complex CRM setups.",
  },
  {
    icon: GraduationCap,
    title: "Coaching & Education",
    description:
      "Course creators and coaches collecting leads via forms – send welcome sequences and schedule calls automatically.",
  },
  {
    icon: Store,
    title: "Small Businesses",
    description:
      "Any business that lives in Google Sheets but wants the power of automation without the complexity of enterprise tools.",
  },
];

export function UseCases() {
  return (
    <section id="use-cases" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Perfect For
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Who it's for
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            LeadX is built for businesses that already use Google Sheets and want
            simple, powerful automation
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {useCases.map((useCase, index) => (
            <div
              key={useCase.title}
              className="glass-card p-6 hover-lift group text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                <useCase.icon className="h-7 w-7 text-primary" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                {useCase.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
