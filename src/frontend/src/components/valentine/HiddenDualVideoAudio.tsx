import { useEffect } from 'react';
import { useHiddenVideoAudio } from '../../hooks/useHiddenVideoAudio';

interface HiddenDualVideoAudioProps {
  onSwitchReady: (switchFn: () => void) => void;
}

export default function HiddenDualVideoAudio({ onSwitchReady }: HiddenDualVideoAudioProps) {
  const { song1Ref, song2Ref, switchToSong2 } = useHiddenVideoAudio();

  // Expose the switch function to parent via effect
  useEffect(() => {
    onSwitchReady(switchToSong2);
  }, [switchToSong2, onSwitchReady]);

  return (
    <>
      <audio
        ref={song1Ref}
        src="/assets/song1.mp4"
        preload="auto"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
      <audio
        ref={song2Ref}
        src="/assets/song2.mp4"
        preload="auto"
        style={{ display: 'none' }}
        aria-hidden="true"
      />
    </>
  );
}
