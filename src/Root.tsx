import React from 'react';
import {Composition} from 'remotion';
import {Reel} from './Reel';
import {canvas} from './theme';
import {TOTAL} from './timeline';

export const RemotionRoot: React.FC = () => (
  <>
    {/* 9:16 — Instagram Reels / LinkedIn. The primary cut. */}
    <Composition
      id="HappyPathTrap"
      component={Reel}
      durationInFrames={TOTAL}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    {/* Same timeline with the safe-zone overlay on, for design checks only. */}
    <Composition
      id="HappyPathTrap-SafeZone"
      component={Reel}
      durationInFrames={TOTAL}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
  </>
);
