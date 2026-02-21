import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Free",
    badge: "Beta",
    price: "$0",
    period: "forever",
    description: "Perfect for testing QuantLeads with your first sheet",
    features: [
      "1 Google Sheet connection",
      "1 automation",
      "100 email credits",
      "25 SMS credits on signup",
      "Basic activity logs",
    ],
    cta: "Start free",
    variant: "outline" as const,
  },
  {
    name: "Grow",
    badge: "Popular",
    price: "$29",
    period: "/month",
    description: "For businesses ready to scale their lead automation",
    features: [
      "Multiple sheets",
      "Unlimited automations",
      "Priority email & SMS throughput",
      "Usage-based credits",
      "Detailed analytics",
      "Bonus credits for referrals",
    ],
    cta: "Get early access",
    variant: "hero" as const,
    highlighted: true,
  },
  {
    name: "Scale",
    price: "Custom",
    period: "",
    description: "For teams with high-volume needs",
    features: [
      "Everything in Grow",
      "Team access & roles",
      "Priority support",
      "Custom limits",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact us",
    variant: "outline" as const,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            Simple Pricing
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Choose your plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Start free, upgrade when you're ready. All plans include core
            automation features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`glass-card p-8 hover-lift relative ${
                plan.highlighted
                  ? "border-2 border-primary shadow-glow"
                  : ""
              }`}
            >
              {plan.badge && (
                <span
                  className={`absolute -top-3 left-6 px-3 py-1 text-xs font-semibold rounded-full ${
                    plan.highlighted
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  }`}
                >
                  {plan.badge}
                </span>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-display font-semibold text-foreground mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-display font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  {plan.description}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.variant}
                className="w-full"
                asChild
              >
                <Link to="/signup">{plan.cta}</Link>
              </Button>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8 max-w-2xl mx-auto">
          Each email/SMS uses 1 credit. Extra per-credit pricing applies plus a
          2.5% processing fee for payments handled by Quantiv (QuantLeads' billing
          backend).
        </p>
      </div>
    </section>
  );
}
