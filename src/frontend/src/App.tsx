import { useState, useRef } from 'react';
import HeroSection from './components/valentine/HeroSection';
import LoveLetterSection from './components/valentine/LoveLetterSection';
import CTASection from './components/valentine/CTASection';
import Footer from './components/valentine/Footer';
import AmbientBackground from './components/valentine/AmbientBackground';
import HiddenDualVideoAudio from './components/valentine/HiddenDualVideoAudio';
import HiddenYouTubePlayer from './components/valentine/HiddenYouTubePlayer';
import Modal from './components/valentine/Modal';
import HeartExplosion from './components/valentine/HeartExplosion';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [showHeartExplosion, setShowHeartExplosion] = useState(false);
  const switchToSong2Ref = useRef<(() => void) | null>(null);

  const handleCTAClick = () => {
    // Trigger audio switch (this will mark hasStarted and prevent song1)
    if (switchToSong2Ref.current) {
      switchToSong2Ref.current();
    }

    // Existing heart explosion and modal logic
    setShowHeartExplosion(true);
    setTimeout(() => {
      setShowModal(true);
      setShowHeartExplosion(false);
    }, 1000);
  };

  const handleSwitchReady = (switchFn: () => void) => {
    switchToSong2Ref.current = switchFn;
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <AmbientBackground />
      <HiddenDualVideoAudio onSwitchReady={handleSwitchReady} />
      <HiddenYouTubePlayer />
      
      <main className="relative z-10">
        <HeroSection />
        <LoveLetterSection />
        <CTASection onClick={handleCTAClick} />
        <Footer />
      </main>

      {showHeartExplosion && <HeartExplosion />}
      
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold glowing-name">
            Indhuja 💜
          </h2>
          <p className="text-xl md:text-2xl romantic-text">
            You are My Today, Tomorrow & Always 💜
          </p>
        </div>
      </Modal>
    </div>
  );
}

export default App;
