import { Benefits } from "@/components/Benefits";
import { Curriculum } from "@/components/Curriculum";
import { DiscountCTA } from "@/components/DiscountCTA";
import { FAQ } from "@/components/FAQ";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";
import { FutureCourses } from "@/components/FutureCourses";
import { HelpContact } from "@/components/HelpContact";
import { Hero } from "@/components/Hero";
import { LeadForm } from "@/components/LeadForm";
import { Navbar } from "@/components/Navbar";
import { SoftwareSection } from "@/components/SoftwareSection";
import { StickyCTA } from "@/components/StickyCTA";
import { StudentBenefits } from "@/components/StudentBenefits";
import { TrustBar } from "@/components/TrustBar";

export default function Home() {
  return (
    <div id="top" className="flex min-h-full flex-col bg-background">
      <Navbar />
      <main>
        <Hero />
        <TrustBar />
        <Benefits />
        <SoftwareSection />
        <Curriculum />
        <StudentBenefits />
        <DiscountCTA />
        <FutureCourses />
        <LeadForm />
        <FAQ />
        <FinalCTA />
        <HelpContact />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
}
