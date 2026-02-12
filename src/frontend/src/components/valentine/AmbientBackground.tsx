import SparkleParticlesCanvas from './SparkleParticlesCanvas';
import FloatingHeartsLayer from './FloatingHeartsLayer';

export default function AmbientBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <SparkleParticlesCanvas />
      <div className="absolute inset-0">
        <FloatingHeartsLayer />
      </div>
    </div>
  );
}
