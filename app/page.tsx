import Navbar from '@/components/sections/Navbar';
import Hero from '@/components/sections/Hero';
import StatsBar from '@/components/sections/StatsBar';
import ProblemSolution from '@/components/sections/ProblemSolution';
import Products from '@/components/sections/Products';
import PricingCalculator from '@/components/sections/PricingCalculator';
import Features from '@/components/sections/Features';
import HowItWorks from '@/components/sections/HowItWorks';
import Testimonials from '@/components/sections/Testimonials';
import DemoForm from '@/components/sections/DemoForm';
import FAQ from '@/components/sections/FAQ';
import CTABanner from '@/components/sections/CTABanner';
import Footer from '@/components/sections/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <StatsBar />
        <ProblemSolution />
        <Products />
        <PricingCalculator />
        <Features />
        <HowItWorks />
        <Testimonials />
        <DemoForm />
        <FAQ />
        <CTABanner />
      </main>
      <Footer />
    </>
  );
}
