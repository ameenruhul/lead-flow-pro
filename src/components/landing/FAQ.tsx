import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Do I need any technical skills?",
    answer:
      "Not at all! QuantLeads is designed for non-technical business owners. If you can use Google Sheets, you can use QuantLeads. Our AI helps with column mapping and even suggests email/SMS content for you.",
  },
  {
    question: "How does QuantLeads connect to my Google Sheets?",
    answer:
      "Simply sign in with your Google account, select the sheet you want to use, and QuantLeads will automatically detect your columns. You can map them to lead fields like name, email, and phone with a few clicks.",
  },
  {
    question: "Will my clients see that I'm using automation?",
    answer:
      "No. Emails are sent from your email address and SMS from a professional sender ID. Your clients will see personalized messages that look like you wrote them yourself.",
  },
  {
    question: "How do credits work?",
    answer:
      "Each email or SMS you send uses 1 credit. You get credits included with your plan, and can purchase additional credits as needed. We show your credit usage in real-time on your dashboard.",
  },
  {
    question: "What happens when my credits run out?",
    answer:
      "Your automations will pause until you top up. You'll receive notifications before running low, and you can set up auto-refill to never run out.",
  },
  {
    question: "Which regions do SMS support?",
    answer:
      "We support SMS in over 200 countries including the US, Canada, UK, Australia, and most of Europe. Check our documentation for the full list of supported countries and carrier networks.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 md:py-32 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-sm font-semibold text-primary uppercase tracking-wider">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-foreground mt-2 mb-4">
            Common questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
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
  );
}
