import { useHiddenYouTube } from '../../hooks/useHiddenYouTube';

export default function HiddenYouTubePlayer() {
  const containerId = 'hidden-youtube-player';
  useHiddenYouTube(containerId);

  return (
    <div
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        visibility: 'hidden',
      }}
      aria-hidden="true"
    >
      <div id={containerId} />
    </div>
  );
}
