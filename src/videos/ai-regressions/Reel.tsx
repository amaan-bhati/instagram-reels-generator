import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {S1Hook} from './scenes/blast-radius/S1Hook';
import {S2Ship} from './scenes/blast-radius/S2Ship';
import {S3Blind} from './scenes/blast-radius/S3Blind';
import {S4Fix} from './scenes/blast-radius/S4Fix';
import {S5Blast} from './scenes/blast-radius/S5Blast';
import {S6Users} from './scenes/blast-radius/S6Users';
import {S7Record} from './scenes/blast-radius/S7Record';
import {S8Generate} from './scenes/blast-radius/S8Generate';
import {S9Replay} from './scenes/blast-radius/S9Replay';
import {S10Verdict} from './scenes/blast-radius/S10Verdict';
import {S11Payoff} from './scenes/blast-radius/S11Payoff';
import {D} from './timeline';

export type ReelProps = {safeZone?: boolean};

/**
 * "The Blast Radius": 60s, 9:16.
 *
 * ONE example throughout: PetClinic. AI ships `POST /api/visits` plus its own
 * test. You point out the missing edge cases; it closes them. The fix then
 * breaks /api/owners, /api/pettypes and /api/pets: and its suite stays green.
 * Keploy proxies the real traffic into mocks and test cases, writes the cases
 * nobody wrote, replays the whole app against those mocks, and reports the
 * /api/pettypes regression with a confidence score.
 */
export const Reel: React.FC<ReelProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={D.s1Hook}><S1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s2Ship}><S2Ship /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s3Blind}><S3Blind /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s4Fix}><S4Fix /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s5Blast}><S5Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s6Users}><S6Users /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s7Record}><S7Record /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s8Generate}><S8Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s9Replay}><S9Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s10Verdict}><S10Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={D.s11Payoff}><S11Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
