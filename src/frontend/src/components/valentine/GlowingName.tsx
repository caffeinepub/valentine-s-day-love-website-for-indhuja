import { useState, useEffect } from 'react';
import NameSparkles from './NameSparkles';
import useTypewriter from '../../hooks/useTypewriter';

export default function GlowingName() {
  const [showAnimation, setShowAnimation] = useState(true);
  const displayText = useTypewriter('Indhuja 💜', 150);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
    }, 'Indhuja 💜'.length * 150 + 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <span className="relative inline-block">
      <NameSparkles />
      <span className={`glowing-name ${!showAnimation ? 'name-pulse name-zoom name-shimmer' : ''}`}>
        {displayText}
      </span>
    </span>
  );
}
