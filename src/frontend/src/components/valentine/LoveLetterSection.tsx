import { useEffect, useRef } from 'react';
import FadeInSection from './FadeInSection';
import useTypewriter from '../../hooks/useTypewriter';

const loveLetterText = `Indhuja 💜,
You are my peace, my happiness, my strength.
Every moment with you feels magical.
Your smile heals my worst days.
Your love completes my life.
I promise to stand by you forever.
I love you more than words can express.
Happy Valentine's Day, my lifeline Indhuja 💜.`;

export default function LoveLetterSection() {
  const displayText = useTypewriter(loveLetterText, 50);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [displayText]);

  return (
    <FadeInSection className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="glass-card p-8 md:p-12">
          <div 
            ref={textRef}
            className="romantic-text text-lg md:text-xl lg:text-2xl leading-relaxed whitespace-pre-line"
          >
            {displayText}
            <span className="typing-cursor">|</span>
          </div>
        </div>
      </div>
    </FadeInSection>
  );
}
