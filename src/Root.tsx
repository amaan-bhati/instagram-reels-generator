import React from 'react';
import {Composition} from 'remotion';
import {Reel} from './videos/ai-regressions/Reel';
import {ReelShort} from './videos/ai-regressions/ReelShort';
import {ReelTight} from './videos/ai-regressions/ReelTight';
import {ReelCoverage} from './videos/ai-regressions/ReelCoverage';
import {ReelBridge} from './videos/ai-regressions/ReelBridge';
import {ReelPersonas} from './videos/ai-regressions/ReelPersonas';
import {ReelHttps} from './videos/https-mocks-only/ReelHttps';
import {ReelHttps2} from './videos/https-mocks-only/ReelHttps2';
import {ReelPersonasV2} from './videos/ai-regressions/ReelPersonasV2';
import {ReelPersonasV3} from './videos/ai-regressions/ReelPersonasV3';
import {ReelPersonasV4} from './videos/ai-regressions/ReelPersonasV4';
import {ReelPersonasV5} from './videos/ai-regressions/ReelPersonasV5';
import {ReelPersonasV6} from './videos/ai-regressions/ReelPersonasV6';
import {ReelPersonasV7} from './videos/ai-regressions/ReelPersonasV7';
import {canvas} from './theme';
import {TOTAL} from './videos/ai-regressions/timeline';
import {TOTAL_SHORT} from './videos/ai-regressions/timelineShort';
import {TOTAL_TIGHT} from './videos/ai-regressions/timelineTight';
import {TOTAL_COVERAGE} from './videos/ai-regressions/timelineCoverage';
import {TOTAL_BRIDGE} from './videos/ai-regressions/timelineBridge';
import {TOTAL_PERSONAS} from './videos/ai-regressions/timelinePersonas';
import {TOTAL_HTTPS} from './videos/https-mocks-only/timelineHttps';
import {TOTAL_HTTPS2} from './videos/https-mocks-only/timelineHttps2';
import {TOTAL_PERSONAS_V2} from './videos/ai-regressions/timelinePersonasV2';
import {TOTAL_PERSONAS_V3} from './videos/ai-regressions/timelinePersonasV3';
import {TOTAL_PERSONAS_V4} from './videos/ai-regressions/timelinePersonasV4';
import {TOTAL_PERSONAS_V5} from './videos/ai-regressions/timelinePersonasV5';
import {TOTAL_PERSONAS_V6} from './videos/ai-regressions/timelinePersonasV6';
import {TOTAL_PERSONAS_V7} from './videos/ai-regressions/timelinePersonasV7';

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
    {/* Coverage variant: normal cases AND edge cases as the centrepiece. */}
    <Composition
      id="Coverage40"
      component={ReelCoverage}
      durationInFrames={TOTAL_COVERAGE}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="Coverage40-SafeZone"
      component={ReelCoverage}
      durationInFrames={TOTAL_COVERAGE}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Bridge variant: the product is earned across three beats, not announced. */}
    <Composition
      id="Bridged40"
      component={ReelBridge}
      durationInFrames={TOTAL_BRIDGE}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="Bridged40-SafeZone"
      component={ReelBridge}
      durationInFrames={TOTAL_BRIDGE}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Personas variant: the coverage argument as a hub and spoke picture. */}
    <Composition
      id="Personas40"
      component={ReelPersonas}
      durationInFrames={TOTAL_PERSONAS}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="Personas40-SafeZone"
      component={ReelPersonas}
      durationInFrames={TOTAL_PERSONAS}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* HTTPS troubleshooting cut: the "mocks only" silent failure. */}
    <Composition
      id="MocksOnly42"
      component={ReelHttps}
      durationInFrames={TOTAL_HTTPS}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="MocksOnly42-SafeZone"
      component={ReelHttps}
      durationInFrames={TOTAL_HTTPS}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* HTTPS cut, second pass: full diagnostic checklist + CA in three environments. */}
    <Composition
      id="MocksOnly44"
      component={ReelHttps2}
      durationInFrames={TOTAL_HTTPS2}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="MocksOnly44-SafeZone"
      component={ReelHttps2}
      durationInFrames={TOTAL_HTTPS2}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Personas, second pass: contrast fixed, slower open, weighted edge pile. */}
    <Composition
      id="PersonasV2"
      component={ReelPersonasV2}
      durationInFrames={TOTAL_PERSONAS_V2}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="PersonasV2-SafeZone"
      component={ReelPersonasV2}
      durationInFrames={TOTAL_PERSONAS_V2}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Personas, third pass: copy that explains the visuals. */}
    <Composition
      id="PersonasV3"
      component={ReelPersonasV3}
      durationInFrames={TOTAL_PERSONAS_V3}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="PersonasV3-SafeZone"
      component={ReelPersonasV3}
      durationInFrames={TOTAL_PERSONAS_V3}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Personas, fourth pass: record and replay rebuilt to the reference. */}
    <Composition
      id="PersonasV4"
      component={ReelPersonasV4}
      durationInFrames={TOTAL_PERSONAS_V4}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="PersonasV4-SafeZone"
      component={ReelPersonasV4}
      durationInFrames={TOTAL_PERSONAS_V4}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Personas, fifth pass: one app card, 4.5:1 gradients, visible verification. */}
    <Composition
      id="PersonasV5"
      component={ReelPersonasV5}
      durationInFrames={TOTAL_PERSONAS_V5}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="PersonasV5-SafeZone"
      component={ReelPersonasV5}
      durationInFrames={TOTAL_PERSONAS_V5}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Personas, sixth pass: slower open, no counts, ends on the verification run. */}
    <Composition
      id="PersonasV6"
      component={ReelPersonasV6}
      durationInFrames={TOTAL_PERSONAS_V6}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="PersonasV6-SafeZone"
      component={ReelPersonasV6}
      durationInFrames={TOTAL_PERSONAS_V6}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: true}}
    />
    {/* Personas, seventh pass: Keploy named throughout, closes on the outcome. */}
    <Composition
      id="PersonasV7"
      component={ReelPersonasV7}
      durationInFrames={TOTAL_PERSONAS_V7}
      fps={canvas.fps}
      width={canvas.width}
      height={canvas.height}
      defaultProps={{safeZone: false}}
    />
    <Composition
      id="PersonasV7-SafeZone"
      component={ReelPersonasV7}
      durationInFrames={TOTAL_PERSONAS_V7}
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
