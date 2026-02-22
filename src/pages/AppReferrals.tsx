import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, Copy, Check, Users, Gift, Mail, MessageSquare, Share2, Twitter, Linkedin, Facebook, Link } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const referralLink = "https://quantleads.app/ref/USR-7X92K";

const referralHistory = [
  { name: "Alex Johnson", date: "2025-02-18", status: "Active", creditsEarned: "500 Email + 100 SMS" },
  { name: "Maria Chen", date: "2025-02-10", status: "Active", creditsEarned: "500 Email + 100 SMS" },
  { name: "James Park", date: "2025-01-28", status: "Pending", creditsEarned: "—" },
  { name: "Sara Williams", date: "2025-01-15", status: "Active", creditsEarned: "500 Email + 100 SMS" },
];

const AppReferrals = () => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    toast.success("Referral link copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    toast.info(`Opening ${platform} share dialog...`);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Referral Program</h1>
            <p className="text-sm text-muted-foreground">Invite friends and earn free credits</p>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Referral Link */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Link className="h-5 w-5 text-primary" />
              Your Referral Link
            </CardTitle>
            <CardDescription>Share this link to earn credits for every new user who signs up</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3">
              <div className="flex-1 bg-muted rounded-xl px-4 py-3 font-mono text-sm text-foreground truncate border border-border">
                {referralLink}
              </div>
              <Button onClick={handleCopy} variant={copied ? "default" : "outline"} className="shrink-0">
                {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
                {copied ? "Copied" : "Copy"}
              </Button>
            </div>

            <div className="flex items-center gap-3 mt-5">
              <span className="text-sm text-muted-foreground">Share via:</span>
              <Button variant="outline" size="sm" onClick={() => handleShare("Twitter")} className="gap-2">
                <Twitter className="h-4 w-4" /> Twitter
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("LinkedIn")} className="gap-2">
                <Linkedin className="h-4 w-4" /> LinkedIn
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("Facebook")} className="gap-2">
                <Facebook className="h-4 w-4" /> Facebook
              </Button>
              <Button variant="outline" size="sm" onClick={() => handleShare("Email")} className="gap-2">
                <Share2 className="h-4 w-4" /> Email
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Friends Invited</p>
                <p className="text-3xl font-bold text-foreground">4</p>
                <p className="text-xs text-muted-foreground">3 active · 1 pending</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center">
                <Mail className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email Credits Earned</p>
                <p className="text-3xl font-bold text-foreground">1,500</p>
                <p className="text-xs text-muted-foreground">From 3 active referrals</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6 flex items-center gap-4">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">SMS Credits Earned</p>
                <p className="text-3xl font-bold text-foreground">300</p>
                <p className="text-xs text-muted-foreground">From 3 active referrals</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reward Structure */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-accent" />
              How It Works
            </CardTitle>
            <CardDescription>Earn credits every time someone signs up with your link</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 rounded-xl bg-muted/50 border border-border">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-lg font-bold">1</div>
                <h3 className="mt-3 font-semibold text-foreground">Share Your Link</h3>
                <p className="text-sm text-muted-foreground mt-1">Send your unique referral link to friends or colleagues</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-muted/50 border border-border">
                <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center mx-auto text-lg font-bold">2</div>
                <h3 className="mt-3 font-semibold text-foreground">They Sign Up</h3>
                <p className="text-sm text-muted-foreground mt-1">Your friend creates an account and activates their workspace</p>
              </div>
              <div className="text-center p-6 rounded-xl bg-muted/50 border border-border">
                <div className="h-10 w-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center mx-auto text-lg font-bold">3</div>
                <h3 className="mt-3 font-semibold text-foreground">You Both Earn</h3>
                <p className="text-sm text-muted-foreground mt-1">You get <strong>500 email + 100 SMS credits</strong> per referral</p>
              </div>
            </div>

            <div className="mt-6 p-4 rounded-xl bg-accent/5 border border-accent/20 text-center">
              <p className="text-sm text-foreground">
                <strong>Reward per referral:</strong>{" "}
                <Badge variant="secondary" className="mx-1">500 Email Credits</Badge>
                +
                <Badge variant="secondary" className="mx-1">100 SMS Credits</Badge>
              </p>
              <p className="text-xs text-muted-foreground mt-1">Credits are added once the referred user activates their account</p>
            </div>
          </CardContent>
        </Card>

        {/* Referral History */}
        <Card>
          <CardHeader>
            <CardTitle>Referral History</CardTitle>
            <CardDescription>Track who signed up through your link</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Date Referred</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Credits Earned</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {referralHistory.map((ref, i) => (
                  <TableRow key={i}>
                    <TableCell className="font-medium">{ref.name}</TableCell>
                    <TableCell>{ref.date}</TableCell>
                    <TableCell>
                      <Badge variant={ref.status === "Active" ? "default" : "secondary"}>
                        {ref.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{ref.creditsEarned}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AppReferrals;
