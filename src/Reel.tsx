import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from './kit/DotGrid';
import {SafeZone} from './kit/SafeZone';
import {S1Hook} from './scenes/S1Hook';
import {S2Ship} from './scenes/S2Ship';
import {S3Blind} from './scenes/S3Blind';
import {S4Break} from './scenes/S4Break';
import {S5Record} from './scenes/S5Record';
import {S6Replay} from './scenes/S6Replay';
import {S7Payoff} from './scenes/S7Payoff';
import {D} from './timeline';

export type ReelProps = {safeZone?: boolean};

/**
 * "Happy Path Trap" — 38s, 9:16.
 * AI ships a feature -> silently reshapes an old one -> its own tests still pass
 * -> Keploy replays real recorded traffic and surfaces the drift.
 */
export const Reel: React.FC<ReelProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={D.s1Hook}><S1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s2Ship}><S2Ship /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s3Blind}><S3Blind /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s4Break}><S4Break /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s5Record}><S5Record /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s6Replay}><S6Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s7Payoff}><S7Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
