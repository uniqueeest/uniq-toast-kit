import * as ReactDOM from 'react-dom';
import { useOverlay } from './useOverlay';

const OVERLAY_ID = 'overlay-container';

export const OverlayRenderer = () => {
  const overlays = useOverlay();

  if (overlays.length === 0) {
    return null;
  }

  return ReactDOM.createPortal(
    <>
      {overlays.map((overlay) => {
        const OverlayComponent = overlay.overlay;
        const props = overlay.props;
        return (
          <OverlayComponent
            key={overlay.overlayKey}
            overlayKey={overlay.overlayKey}
            resolve={overlay.resolve}
            {...props}
          />
        );
      })}
    </>,
    window.document.getElementById(OVERLAY_ID)!
  );
};
