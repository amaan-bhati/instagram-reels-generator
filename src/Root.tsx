import React from 'react';
import {Composition} from 'remotion';
import {Reel} from './Reel';
import {ReelShort} from './ReelShort';
import {ReelTight} from './ReelTight';
import {canvas} from './theme';
import {TOTAL} from './timeline';
import {TOTAL_SHORT} from './timelineShort';
import {TOTAL_TIGHT} from './timelineTight';

export const RemotionRoot: React.FC = () => (
  <>
    {/* 9:16: Instagram Reels / LinkedIn. The primary cut. */}
    <Composition
      id="BlastRadius"
      component={Reel}
      durationInFrames={TOTAL}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    {/* Short variant: problem stated in two beats, Keploy gets two thirds. */}
    <Composition
      id="Regressions40"
      component={ReelShort}
      durationInFrames={TOTAL_SHORT}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="Regressions40-SafeZone"
      component={ReelShort}
      durationInFrames={TOTAL_SHORT}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Tight variant: same seven beats, every hold at its floor. */}
    <Composition
      id="Regressions30"
      component={ReelTight}
      durationInFrames={TOTAL_TIGHT}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="Regressions30-SafeZone"
      component={ReelTight}
      durationInFrames={TOTAL_TIGHT}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Same timeline with the safe-zone overlay on, for design checks only. */}
    <Composition
      id="BlastRadius-SafeZone"
      component={Reel}
      durationInFrames={TOTAL}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
  </>
);
