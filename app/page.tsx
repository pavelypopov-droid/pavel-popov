import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import ServicesSection from "@/components/sections/ServicesSection";
import CasesSection from "@/components/sections/CasesSection";
import AboutSection from "@/components/sections/AboutSection";
import Testimonials from "@/components/sections/Testimonials";
import CTABlock from "@/components/sections/CTABlock";

export default function Home() {
  return (
    <>
      <Hero lang="ru" />
      <SocialProof />
      <ServicesSection lang="ru" />
      <CasesSection lang="ru" />
      <AboutSection lang="ru" />
      <Testimonials />
      <CTABlock lang="ru" />
    </>
  );
}
