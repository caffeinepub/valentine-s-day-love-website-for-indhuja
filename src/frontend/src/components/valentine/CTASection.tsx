import FadeInSection from './FadeInSection';

interface CTASectionProps {
  onClick: () => void;
}

export default function CTASection({ onClick }: CTASectionProps) {
  return (
    <FadeInSection className="py-20 px-4">
      <div className="text-center">
        <button
          onClick={onClick}
          className="cta-button text-xl md:text-2xl px-12 py-6 rounded-full font-bold transition-all duration-300 hover:scale-110 active:scale-95"
        >
          For My Indhuja 💜
        </button>
      </div>
    </FadeInSection>
  );
}
