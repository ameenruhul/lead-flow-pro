import { Clock, Table, Users } from "lucide-react";

const metrics = [
  {
    icon: Clock,
    value: "< 10 min",
    label: "to your first automation",
  },
  {
    icon: Table,
    value: "Any source",
    label: "that ends in a Google Sheet",
  },
  {
    icon: Users,
    value: "Non-technical",
    label: "designed for business owners",
  },
];

export function TrustMetrics() {
  return (
    <section className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {metrics.map((metric) => (
            <div
              key={metric.label}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <metric.icon className="h-7 w-7 text-primary" />
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-foreground mb-1">
                {metric.value}
              </div>
              <p className="text-muted-foreground">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
