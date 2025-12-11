import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, MessageSquare, Bell, Check } from "lucide-react";

export function HeroSection() {
  const scrollToHowItWorks = () => {
    const element = document.querySelector("#how-it-works");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen gradient-hero overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              Now in Early Access
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
              Automated follow-ups from the moment a lead hits your{" "}
              <span className="gradient-text">sheet</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 animate-fade-up" style={{ animationDelay: "0.2s" }}>
              Connect Google Sheets. Detect new rows with AI. Auto-send emails, SMS, and notifications – without touching a CRM or writing code.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <Button variant="hero" size="lg" asChild>
                <Link to="/signup">
                  Get early access
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                variant="hero-outline"
                size="lg"
                onClick={scrollToHowItWorks}
              >
                View how it works
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mt-6 animate-fade-up" style={{ animationDelay: "0.4s" }}>
              Free to start • No credit card required
            </p>
          </div>

          {/* Right Content - Product Mockup */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative">
              {/* Main mockup card */}
              <div className="glass-card p-6 animate-float">
                {/* Google Sheets Preview */}
                <div className="rounded-xl bg-secondary/50 p-4 mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-6 h-6 rounded bg-green-500/20 flex items-center justify-center">
                      <span className="text-green-600 text-xs font-bold">G</span>
                    </div>
                    <span className="text-sm font-medium">Leads Sheet</span>
                  </div>
                  <div className="space-y-2">
                    <div className="grid grid-cols-4 gap-2 text-xs font-medium text-muted-foreground border-b border-border pb-2">
                      <span>Name</span>
                      <span>Email</span>
                      <span>Phone</span>
                      <span>Status</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground">
                      <span>John D.</span>
                      <span>john@...</span>
                      <span>+1 555...</span>
                      <span className="text-muted-foreground/50">sent</span>
                    </div>
                    <div className="grid grid-cols-4 gap-2 text-xs bg-primary/10 rounded px-1 py-1 border border-primary/20">
                      <span className="text-foreground font-medium">Sarah M.</span>
                      <span>sarah@...</span>
                      <span>+1 555...</span>
                      <span className="text-primary font-medium">new ✨</span>
                    </div>
                  </div>
                </div>

                {/* Action Log */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-green-500/10 border border-green-500/20">
                    <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Mail className="h-4 w-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Welcome email sent</p>
                      <p className="text-xs text-muted-foreground">to Sarah M. • just now</p>
                    </div>
                    <Check className="h-4 w-4 text-green-600" />
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">SMS confirmation sent</p>
                      <p className="text-xs text-muted-foreground">to Sarah M. • just now</p>
                    </div>
                    <Check className="h-4 w-4 text-blue-600" />
                  </div>
                </div>
              </div>

              {/* Floating notification */}
              <div className="absolute -top-4 -right-4 glass-card p-3 animate-float shadow-glow" style={{ animationDelay: "1s" }}>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                    <Bell className="h-4 w-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-xs font-medium">New lead!</p>
                    <p className="text-[10px] text-muted-foreground">Automation triggered</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
