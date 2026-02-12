import { useEffect, useState } from 'react';

interface Heart {
  id: number;
  x: number;
  y: number;
  angle: number;
  distance: number;
  size: number;
}

export default function HeartExplosion() {
  const [hearts, setHearts] = useState<Heart[]>([]);

  useEffect(() => {
    const newHearts: Heart[] = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: 50,
      y: 50,
      angle: (360 / 30) * i,
      distance: 100 + Math.random() * 200,
      size: 20 + Math.random() * 30,
    }));
    setHearts(newHearts);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="explosion-heart"
          style={{
            left: '50%',
            top: '50%',
            fontSize: `${heart.size}px`,
            '--angle': `${heart.angle}deg`,
            '--distance': `${heart.distance}px`,
          } as React.CSSProperties}
        >
          💜
        </div>
      ))}
    </div>
  );
}
