import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {driftX, pushIn} from '../lib/anim';

/**
 * DESIGN §0.5 — the camera is always moving subtly.
 * Wrap every scene body in this. Never render a static frame.
 */
export const Camera: React.FC<{
  duration: number;
  zoom?: number;
  pan?: number;
  origin?: string;
  children: React.ReactNode;
}> = ({duration, zoom = 0.03, pan = 0, origin = '50% 46%', children}) => {
  const frame = useCurrentFrame();
  const scale = pushIn(frame, duration, zoom);
  const x = pan ? driftX(frame, duration, pan) : 0;
  return (
    <AbsoluteFill
      style={{transform: `scale(${scale}) translateX(${x}px)`, transformOrigin: origin}}
    >
      {children}
    </AbsoluteFill>
  );
};
