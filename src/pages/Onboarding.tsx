import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Check,
  LogOut,
  Sparkles,
  Table2,
  Columns3,
  FileText,
  Workflow,
  PlayCircle,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Connect Google",
    description: "Link your Google account to access Sheets securely via OAuth.",
    icon: ShieldCheck,
  },
  {
    id: 2,
    title: "Add Sheet",
    description: "Select which Google Sheet contains your leads or contacts.",
    icon: Table2,
  },
  {
    id: 3,
    title: "Map Columns",
    description: "Map columns like Name, Email, Phone to QuantLeads fields.",
    icon: Columns3,
  },
  {
    id: 4,
    title: "Create Template",
    description: "Write your first email or SMS template with merge tags.",
    icon: FileText,
  },
  {
    id: 5,
    title: "Create Automation",
    description: "Set up triggers and actions for automatic outreach.",
    icon: Workflow,
  },
  {
    id: 6,
    title: "Test Run",
    description: "Send a test message to yourself and confirm everything works.",
    icon: PlayCircle,
  },
];

export default function Onboarding() {
  const [completed, setCompleted] = useState<number[]>([]);

  const toggleStep = (id: number) => {
    setCompleted((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const progress = Math.round((completed.length / steps.length) * 100);

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Header */}
      <header className="bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-2xl font-display font-bold gradient-text">
              QuantLeads
            </Link>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">
                <LogOut className="h-4 w-4 mr-2" />
                Log out
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10 max-w-3xl">
        {/* Hero */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">
            Let's get you set up 🚀
          </h1>
          <p className="text-muted-foreground mt-3 max-w-lg mx-auto">
            Complete each step below to start automating your lead outreach.
            It only takes a few minutes.
          </p>
        </div>

        {/* Progress */}
        <div className="glass-card p-5 mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              {completed.length} of {steps.length} steps complete
            </span>
            <span className="text-sm font-semibold text-primary">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2.5" />
          {progress === 100 && (
            <p className="text-sm text-green-600 dark:text-green-400 mt-3 font-medium flex items-center gap-1.5">
              <Sparkles className="h-4 w-4" /> All done — you're ready to launch!
            </p>
          )}
        </div>

        {/* Steps */}
        <div className="space-y-4 mb-10">
          {steps.map((step) => {
            const done = completed.includes(step.id);
            return (
              <button
                key={step.id}
                onClick={() => toggleStep(step.id)}
                className={`glass-card w-full text-left p-5 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow ${
                  done ? "border-primary/30 bg-primary/5" : ""
                }`}
              >
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors duration-300 ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {done ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <step.icon className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-display font-semibold text-foreground ${
                      done ? "line-through opacity-60" : ""
                    }`}
                  >
                    Step {step.id}: {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-0.5">
                    {step.description}
                  </p>
                </div>
                <span className="text-xs font-medium text-muted-foreground shrink-0">
                  {done ? "Done" : `${step.id}/${steps.length}`}
                </span>
              </button>
            );
          })}
        </div>

        {/* Demo CTA */}
        <div className="glass-card p-8 text-center border-2 border-primary/20 bg-primary/5">
          <Sparkles className="h-8 w-8 text-primary mx-auto mb-3" />
          <h2 className="text-xl font-display font-semibold text-foreground mb-2">
            Not ready to connect yet?
          </h2>
          <p className="text-muted-foreground mb-5 max-w-md mx-auto">
            Explore QuantLeads with sample data — no account linking required.
          </p>
          <Button variant="hero" size="lg" asChild>
            <Link to="/demo">Load Demo Workspace</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
