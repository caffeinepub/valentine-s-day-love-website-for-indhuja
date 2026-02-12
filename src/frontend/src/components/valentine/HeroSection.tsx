import GlowingName from './GlowingName';
import FloatingHeartsLayer from './FloatingHeartsLayer';
import FadeInSection from './FadeInSection';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <FloatingHeartsLayer />
      
      <FadeInSection className="relative z-10 text-center px-4 py-20">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold romantic-text">
            Happy Valentine's Day <GlowingName />
          </h1>
          
          <p className="text-xl md:text-3xl lg:text-4xl romantic-text max-w-4xl mx-auto">
            <GlowingName />, you are the reason behind my smile.
          </p>
        </div>
      </FadeInSection>
    </section>
  );
}
