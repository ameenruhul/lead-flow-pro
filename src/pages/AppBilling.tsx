import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CreditCard,
  Mail,
  MessageSquare,
  Package,
  ArrowRight,
  AlertTriangle,
  Check,
  Calendar,
  Zap,
  TrendingUp,
  Download,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";

const currentPlan = {
  name: "Pro",
  price: 49,
  period: "month",
  renewalDate: "2025-08-15",
  features: [
    "2,000 email credits / mo",
    "500 SMS credits / mo",
    "Unlimited sheets",
    "Unlimited automations",
    "Smart templates with AI",
  ],
};

const credits = {
  email: { used: 1247, total: 2000 },
  sms: { used: 312, total: 500 },
};

const bundles = [
  {
    icon: Mail,
    name: "Email Bundle",
    credits: "5,000 emails",
    price: 25,
    perUnit: "$0.005 / email",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: MessageSquare,
    name: "SMS Bundle",
    credits: "1,000 SMS",
    price: 40,
    perUnit: "$0.04 / SMS",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Package,
    name: "Combo Bundle",
    credits: "3,000 emails + 500 SMS",
    price: 45,
    perUnit: "Best value",
    color: "text-primary",
    bg: "bg-gradient-to-br from-primary/10 to-accent/10",
    highlighted: true,
  },
];

const usageHistory = [
  { date: "2025-07-14", description: "Pro Plan — Monthly renewal", type: "Subscription", amount: "$49.00", status: "Paid" },
  { date: "2025-07-10", description: "Email Bundle — 5,000 credits", type: "Bundle", amount: "$25.00", status: "Paid" },
  { date: "2025-06-28", description: "Combo Bundle — 3k email + 500 SMS", type: "Bundle", amount: "$45.00", status: "Paid" },
  { date: "2025-06-14", description: "Pro Plan — Monthly renewal", type: "Subscription", amount: "$49.00", status: "Paid" },
  { date: "2025-05-14", description: "Pro Plan — Monthly renewal", type: "Subscription", amount: "$49.00", status: "Paid" },
  { date: "2025-05-02", description: "SMS Bundle — 1,000 credits", type: "Bundle", amount: "$40.00", status: "Paid" },
];

const plans = [
  { name: "Free", price: 0 },
  { name: "Pro", price: 49 },
  { name: "Business", price: 129 },
];

export default function AppBilling() {
  const [changePlanOpen, setChangePlanOpen] = useState(false);
  const [buyBundleOpen, setBuyBundleOpen] = useState(false);
  const [selectedBundle, setSelectedBundle] = useState<typeof bundles[0] | null>(null);

  const emailPercent = Math.round((credits.email.used / credits.email.total) * 100);
  const smsPercent = Math.round((credits.sms.used / credits.sms.total) * 100);

  const handleBuyBundle = (bundle: typeof bundles[0]) => {
    setSelectedBundle(bundle);
    setBuyBundleOpen(true);
  };

  const confirmBuyBundle = () => {
    setBuyBundleOpen(false);
    toast({
      title: "Bundle purchased",
      description: `${selectedBundle?.credits} added to your wallet.`,
    });
  };

  const handleChangePlan = (planName: string) => {
    setChangePlanOpen(false);
    if (planName === currentPlan.name) return;
    toast({
      title: `Switched to ${planName}`,
      description: planName === "Free"
        ? "Downgrade takes effect at end of billing cycle."
        : "Your plan has been upgraded immediately.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-30">
        <div className="container mx-auto px-4 h-16 flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/app/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div>
            <h1 className="text-lg font-display font-semibold text-foreground">Billing</h1>
            <p className="text-xs text-muted-foreground">Manage your plan, credits & payments</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-8 max-w-5xl">
        {/* Alert */}
        <div className="flex items-start gap-3 p-4 rounded-xl border border-accent/30 bg-accent/5">
          <AlertTriangle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-foreground">Credit protection enabled</p>
            <p className="text-sm text-muted-foreground">
              Automations pause automatically when credits reach zero — no surprise charges.
            </p>
          </div>
        </div>

        {/* Current Plan */}
        <Card>
          <CardHeader className="flex-row items-start justify-between space-y-0">
            <div>
              <CardDescription>Current Plan</CardDescription>
              <CardTitle className="flex items-center gap-2 mt-1">
                {currentPlan.name}
                <Badge className="bg-primary/10 text-primary border-primary/20">Active</Badge>
              </CardTitle>
            </div>
            <div className="text-right">
              <p className="text-3xl font-display font-bold text-foreground">
                ${currentPlan.price}
                <span className="text-sm font-normal text-muted-foreground">/{currentPlan.period}</span>
              </p>
              <p className="text-xs text-muted-foreground flex items-center gap-1 justify-end mt-1">
                <Calendar className="h-3 w-3" />
                Renews {new Date(currentPlan.renewalDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {currentPlan.features.map((f) => (
                <span key={f} className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-secondary rounded-full px-3 py-1">
                  <Check className="h-3 w-3 text-primary" />
                  {f}
                </span>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={() => setChangePlanOpen(true)}>
                <TrendingUp className="h-4 w-4 mr-1" /> Change plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Credit Wallet */}
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground mb-4">Credit Wallet</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">Email Credits</p>
                    <p className="text-xs text-muted-foreground">
                      {credits.email.used.toLocaleString()} / {credits.email.total.toLocaleString()} used
                    </p>
                  </div>
                  <span className="text-2xl font-display font-bold text-foreground">
                    {(credits.email.total - credits.email.used).toLocaleString()}
                  </span>
                </div>
                <Progress value={emailPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{emailPercent}% consumed this cycle</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <MessageSquare className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">SMS Credits</p>
                    <p className="text-xs text-muted-foreground">
                      {credits.sms.used.toLocaleString()} / {credits.sms.total.toLocaleString()} used
                    </p>
                  </div>
                  <span className="text-2xl font-display font-bold text-foreground">
                    {(credits.sms.total - credits.sms.used).toLocaleString()}
                  </span>
                </div>
                <Progress value={smsPercent} className="h-2" />
                <p className="text-xs text-muted-foreground mt-2">{smsPercent}% consumed this cycle</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Buy Bundles */}
        <div>
          <h2 className="text-lg font-display font-semibold text-foreground mb-1">Buy Credits</h2>
          <p className="text-sm text-muted-foreground mb-4">Bundle credits never expire and stack on top of your plan.</p>
          <div className="grid sm:grid-cols-3 gap-4">
            {bundles.map((bundle) => (
              <Card
                key={bundle.name}
                className={`relative hover-lift cursor-pointer transition-all ${
                  bundle.highlighted ? "border-2 border-primary shadow-glow" : ""
                }`}
                onClick={() => handleBuyBundle(bundle)}
              >
                {bundle.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold rounded-full bg-primary text-primary-foreground">
                    Best Value
                  </span>
                )}
                <CardContent className="pt-6 text-center">
                  <div className={`w-12 h-12 rounded-2xl ${bundle.bg} flex items-center justify-center mx-auto mb-3`}>
                    <bundle.icon className={`h-6 w-6 ${bundle.color}`} />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{bundle.name}</h3>
                  <p className="text-xs text-muted-foreground mb-3">{bundle.credits}</p>
                  <p className="text-2xl font-display font-bold text-foreground">${bundle.price}</p>
                  <p className="text-xs text-muted-foreground mb-4">{bundle.perUnit}</p>
                  <Button variant="outline" size="sm" className="w-full">
                    Buy <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Usage History */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-display font-semibold text-foreground">Payment History</h2>
            <Button variant="ghost" size="sm">
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageHistory.map((entry, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-muted-foreground text-sm">
                      {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </TableCell>
                    <TableCell className="font-medium text-sm">{entry.description}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="text-xs">{entry.type}</Badge>
                    </TableCell>
                    <TableCell className="text-right font-medium text-sm">{entry.amount}</TableCell>
                    <TableCell>
                      <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                        {entry.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>

        {/* Footer note */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground pb-8">
          <CreditCard className="h-4 w-4" />
          <span>A 2.5% processing fee applies to all payments via Quantiv.</span>
        </div>
      </main>

      {/* Change Plan Dialog */}
      <Dialog open={changePlanOpen} onOpenChange={setChangePlanOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Plan</DialogTitle>
            <DialogDescription>Select a plan. Changes apply at the next billing cycle for downgrades.</DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-4">
            {plans.map((plan) => (
              <button
                key={plan.name}
                onClick={() => handleChangePlan(plan.name)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all ${
                  plan.name === currentPlan.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50 hover:bg-secondary/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Zap className={`h-5 w-5 ${plan.name === currentPlan.name ? "text-primary" : "text-muted-foreground"}`} />
                  <span className="font-medium text-foreground">{plan.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-display font-bold text-foreground">
                    ${plan.price}<span className="text-xs font-normal text-muted-foreground">/mo</span>
                  </span>
                  {plan.name === currentPlan.name && (
                    <Badge variant="secondary" className="text-xs">Current</Badge>
                  )}
                </div>
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Buy Bundle Dialog */}
      <Dialog open={buyBundleOpen} onOpenChange={setBuyBundleOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              {selectedBundle?.credits} for ${selectedBundle?.price}
            </DialogDescription>
          </DialogHeader>
          <p className="text-sm text-muted-foreground py-2">
            Credits will be added to your wallet immediately and never expire.
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setBuyBundleOpen(false)}>Cancel</Button>
            <Button onClick={confirmBuyBundle}>Confirm — ${selectedBundle?.price}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
