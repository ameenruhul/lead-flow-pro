import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="py-12 bg-background border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <Link to="/" className="text-2xl font-display font-bold gradient-text">
              LeadX
            </Link>
            <p className="text-sm text-muted-foreground mt-1">
              Turn Google Sheets into an automated lead engine
            </p>
          </div>

          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link to="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
            <a href="mailto:hello@leadx.io" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LeadX. Early Access Beta.
          </p>
        </div>
      </div>
    </footer>
  );
}
