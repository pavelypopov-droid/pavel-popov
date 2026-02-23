import Hero from "@/components/sections/Hero";
import SocialProof from "@/components/sections/SocialProof";
import Services from "@/components/sections/Services";
import Cases from "@/components/sections/Cases";
import About from "@/components/sections/About";
import Testimonials from "@/components/sections/Testimonials";
import CTABlock from "@/components/sections/CTABlock";

export default function Home() {
  return (
    <>
      <Hero />
      <SocialProof />
      <Services />
      <Cases />
      <About />
      <Testimonials />
      <CTABlock />
    </>
  );
}
