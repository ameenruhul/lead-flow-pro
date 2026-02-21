import { useState } from "react";
import { Check, Zap, Mail, MessageSquare, Package, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const plans = [
  {
    name: "Free",
    badge: "Beta",
    monthly: 0,
    yearly: 0,
    description: "Perfect for testing QuantLeads with your first sheet",
    features: [
      "100 email credits",
      "20 SMS credits",
      "1 Google Sheet connection",
      "1 automation",
      "Basic activity logs",
      "Community support",
    ],
    cta: "Start free",
    variant: "outline" as const,
  },
  {
    name: "Pro",
    badge: "Popular",
    monthly: 49,
    yearly: 39,
    description: "For businesses ready to scale their lead automation",
    features: [
      "2,000 email credits / mo",
      "500 SMS credits / mo",
      "Unlimited sheets",
      "Unlimited automations",
      "Smart templates with AI",
      "Detailed analytics",
      "Priority email support",
    ],
    cta: "Get started",
    variant: "hero" as const,
    highlighted: true,
  },
  {
    name: "Business",
    monthly: 129,
    yearly: 99,
    description: "For teams with high-volume outreach needs",
    features: [
      "10,000 email credits / mo",
      "2,500 SMS credits / mo",
      "Everything in Pro",
      "Team access & roles",
      "Priority support (chat + email)",
      "Custom integrations",
      "Dedicated account manager",
    ],
    cta: "Contact sales",
    variant: "outline" as const,
  },
];

const bundles = [
  {
    icon: Mail,
    name: "Email Bundle",
    credits: "5,000 emails",
    price: "$25",
    perUnit: "$0.005 / email",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    name: "SMS Bundle",
    credits: "1,000 SMS",
    price: "$40",
    perUnit: "$0.04 / SMS",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Package,
    name: "Combo Bundle",
    credits: "3,000 emails + 500 SMS",
    price: "$45",
    perUnit: "Best value",
    color: "text-primary",
    bg: "bg-gradient-to-br from-primary/10 to-accent/10",
    highlighted: true,
  },
];

const faqs = [
  {
    question: "What happens when credits run out?",
    answer:
      "Your automations will automatically pause — no surprise charges. You'll get email notifications when your balance is running low. You can top up with a credit bundle or upgrade your plan anytime to resume instantly.",
  },
  {
    question: "Can I upgrade or downgrade anytime?",
    answer:
      "Yes. You can switch plans at any time from your dashboard. When upgrading, you'll be prorated for the remainder of the billing period. When downgrading, the change takes effect at the start of your next billing cycle.",
  },
  {
    question: "Are unused credits rolled over?",
    answer:
      "Plan credits reset each billing cycle and do not roll over. However, credits purchased through bundles never expire and remain in your account until used.",
  },
  {
    question: "Is there a contract or commitment?",
    answer:
      "No contracts. All plans are month-to-month (or year-to-year if you choose annual billing). Cancel anytime — your account stays active until the end of the paid period.",
  },
  {
    question: "Do you charge per-message fees on top of the plan?",
    answer:
      "No hidden fees. Each email or SMS simply uses 1 credit from your balance. The only additional cost is a 2.5% processing fee on payments handled through Quantiv, our billing backend.",
  },
];

export default function PricingPage() {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero */}
        <section className="gradient-hero pt-32 pb-16 md:pt-40 md:pb-20">
          <div className="container mx-auto px-4 text-center">
            <Badge variant="secondary" className="mb-4">
              Simple & Transparent
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-4">
              Pricing that <span className="gradient-text">scales with you</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
              Start free, pay only for what you use. No hidden fees, no surprises.
            </p>

            {/* Toggle */}
            <div className="flex items-center justify-center gap-3">
              <span className={`text-sm font-medium ${!yearly ? "text-foreground" : "text-muted-foreground"}`}>
                Monthly
              </span>
              <Switch checked={yearly} onCheckedChange={setYearly} />
              <span className={`text-sm font-medium ${yearly ? "text-foreground" : "text-muted-foreground"}`}>
                Yearly
              </span>
              {yearly && (
                <Badge className="bg-primary/10 text-primary border-primary/20 ml-1">
                  Save 20%
                </Badge>
              )}
            </div>
          </div>
        </section>

        {/* Plans */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {plans.map((plan) => (
                <div
                  key={plan.name}
                  className={`glass-card p-8 hover-lift relative flex flex-col ${
                    plan.highlighted ? "border-2 border-primary shadow-glow" : ""
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
                        ${yearly ? plan.yearly : plan.monthly}
                      </span>
                      {plan.monthly > 0 && (
                        <span className="text-muted-foreground">
                          /{yearly ? "mo, billed yearly" : "month"}
                        </span>
                      )}
                      {plan.monthly === 0 && (
                        <span className="text-muted-foreground">forever</span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      {plan.description}
                    </p>
                  </div>

                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button variant={plan.variant} className="w-full" asChild>
                    <Link to="/signup">{plan.cta}</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Credit Bundles */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                Top-Up Anytime
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
                Credit bundles
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Need more credits? Purchase bundles that never expire and stack on top of
                your plan.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {bundles.map((bundle) => (
                <div
                  key={bundle.name}
                  className={`glass-card p-8 hover-lift text-center relative ${
                    bundle.highlighted ? "border-2 border-primary shadow-glow" : ""
                  }`}
                >
                  {bundle.highlighted && (
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                      Best Value
                    </span>
                  )}
                  <div
                    className={`w-14 h-14 rounded-2xl ${bundle.bg} flex items-center justify-center mx-auto mb-4`}
                  >
                    <bundle.icon className={`h-7 w-7 ${bundle.color}`} />
                  </div>
                  <h3 className="text-lg font-display font-semibold text-foreground mb-1">
                    {bundle.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{bundle.credits}</p>
                  <p className="text-3xl font-display font-bold text-foreground mb-1">
                    {bundle.price}
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">{bundle.perUnit}</p>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to="/signup">
                      Buy bundle <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                FAQ
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mt-2 mb-4">
                Billing questions
              </h2>
            </div>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    value={`faq-${i}`}
                    className="glass-card px-6 border-none"
                  >
                    <AccordionTrigger className="text-left font-display font-semibold text-foreground hover:no-underline py-5">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground pb-5">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-24 bg-secondary/30">
          <div className="container mx-auto px-4 text-center">
            <Zap className="h-10 w-10 text-primary mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
              Ready to automate your leads?
            </h2>
            <p className="text-muted-foreground max-w-lg mx-auto mb-8">
              Start with the Free plan — no credit card required.
            </p>
            <Button variant="hero" size="lg" asChild>
              <Link to="/signup">Get started free</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
