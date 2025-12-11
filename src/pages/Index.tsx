import { Navbar } from "@/components/landing/Navbar";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesGrid } from "@/components/landing/FeaturesGrid";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { DeepFeatures } from "@/components/landing/DeepFeatures";
import { UseCases } from "@/components/landing/UseCases";
import { Pricing } from "@/components/landing/Pricing";
import { Roadmap } from "@/components/landing/Roadmap";
import { TrustMetrics } from "@/components/landing/TrustMetrics";
import { FAQ } from "@/components/landing/FAQ";
import { Footer } from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesGrid />
        <HowItWorks />
        <DeepFeatures />
        <UseCases />
        <Pricing />
        <Roadmap />
        <TrustMetrics />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
