import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Table2,
  Workflow,
  Mail,
  MessageSquare,
  LogOut,
  Sparkles,
  ArrowRight,
  Send,
} from "lucide-react";

export default function Dashboard() {
  const { toast } = useToast();
  const [waitlistData, setWaitlistData] = useState({
    businessType: "",
    leadsPerMonth: "",
    channels: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedWaitlist, setHasSubmittedWaitlist] = useState(false);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setHasSubmittedWaitlist(true);
      toast({
        title: "You're on the list!",
        description: "We'll reach out soon with early access details.",
      });
    }, 1000);
  };

  const stats = [
    {
      icon: Table2,
      label: "Connected Sheets",
      value: "0",
      note: "Coming soon",
    },
    {
      icon: Workflow,
      label: "Active Automations",
      value: "0",
      note: "Coming soon",
    },
    {
      icon: Mail,
      label: "Email Credits",
      value: "100",
      note: "Free tier",
    },
    {
      icon: MessageSquare,
      label: "SMS Credits",
      value: "25",
      note: "Free tier",
    },
  ];

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

      {/* Main content */}
      <main className="container mx-auto px-4 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-foreground">
            Welcome to QuantLeads! 👋
          </h1>
          <p className="text-muted-foreground mt-2">
            You're in! Here's your early access dashboard preview.
          </p>
        </div>

        {/* Coming soon banner */}
        <div className="glass-card p-6 mb-8 border-2 border-primary/20 bg-primary/5">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-display font-semibold text-foreground">
                Full automation coming soon!
              </h2>
              <p className="text-muted-foreground mt-1">
                Google Sheets integration, automation builder, email/SMS sending,
                and credit tracking will be added in the coming weeks. This
                dashboard is a preview of what's coming.
              </p>
              <Button variant="outline" size="sm" className="mt-4" asChild>
                <a href="mailto:hello@quantleads.io">
                  Get notified on launch
                  <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="glass-card p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <span className="text-sm text-muted-foreground">{stat.label}</span>
              </div>
              <div className="text-3xl font-display font-bold text-foreground">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground mt-1">{stat.note}</p>
            </div>
          ))}
        </div>

        {/* Waitlist form */}
        {!hasSubmittedWaitlist ? (
          <div className="glass-card p-8 max-w-2xl">
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              Help us build for you
            </h2>
            <p className="text-muted-foreground mb-6">
              Tell us about your business so we can prioritize features that
              matter most to you.
            </p>

            <form onSubmit={handleWaitlistSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="businessType">What type of business are you?</Label>
                <Select
                  value={waitlistData.businessType}
                  onValueChange={(value) =>
                    setWaitlistData((prev) => ({ ...prev, businessType: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select your business type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="service">Local service business</SelectItem>
                    <SelectItem value="agency">Agency</SelectItem>
                    <SelectItem value="coaching">Coaching / Education</SelectItem>
                    <SelectItem value="ecommerce">E-commerce</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="leadsPerMonth">
                  Approximately how many leads do you get per month?
                </Label>
                <Select
                  value={waitlistData.leadsPerMonth}
                  onValueChange={(value) =>
                    setWaitlistData((prev) => ({ ...prev, leadsPerMonth: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-50">1-50</SelectItem>
                    <SelectItem value="51-200">51-200</SelectItem>
                    <SelectItem value="201-500">201-500</SelectItem>
                    <SelectItem value="500+">500+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="channels">
                  Which channels are most important to you?
                </Label>
                <Select
                  value={waitlistData.channels}
                  onValueChange={(value) =>
                    setWaitlistData((prev) => ({ ...prev, channels: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select channels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email only</SelectItem>
                    <SelectItem value="sms">SMS only</SelectItem>
                    <SelectItem value="both">Email + SMS</SelectItem>
                    <SelectItem value="multi">
                      Multi-channel (incl. WhatsApp, etc.)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">
                  Anything else you'd like us to know? (optional)
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Tell us about your current workflow, pain points, or feature requests..."
                  value={waitlistData.notes}
                  onChange={(e) =>
                    setWaitlistData((prev) => ({ ...prev, notes: e.target.value }))
                  }
                  rows={3}
                />
              </div>

              <Button
                type="submit"
                variant="hero"
                disabled={isSubmitting}
                className="w-full sm:w-auto"
              >
                {isSubmitting ? "Submitting..." : "Submit & Join Waitlist"}
                <Send className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        ) : (
          <div className="glass-card p-8 max-w-2xl text-center">
            <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-green-500" />
            </div>
            <h2 className="text-xl font-display font-semibold text-foreground mb-2">
              Thanks for sharing!
            </h2>
            <p className="text-muted-foreground">
              We've saved your preferences. We'll reach out soon with updates and
              early access to new features.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
