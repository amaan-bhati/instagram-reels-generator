import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {SH1Hook} from './scenes/short/SH1Hook';
import {SH2Blast} from './scenes/short/SH2Blast';
import {SH3Record} from './scenes/short/SH3Record';
import {SH4Generate} from './scenes/short/SH4Generate';
import {SH5Replay} from './scenes/short/SH5Replay';
import {SH6Verdict} from './scenes/short/SH6Verdict';
import {SH7Payoff} from './scenes/short/SH7Payoff';
import {S} from './timelineShort';

export type ReelShortProps = {safeZone?: boolean};

/**
 * "Regressions": 40s, 9:16. The short variant.
 *
 * Same story as the 60s cut, different weighting. The 60s version spends half
 * its length teaching what a regression and a blast radius are. That concept
 * only needs about ten seconds, so here it gets two beats:
 *
 *   1. AI shipped it, everything green
 *   2. it changed one endpoint and broke three others
 *
 * and the remaining two thirds go to how Keploy prevents that: capture the real
 * traffic, generate the cases nobody wrote, replay all of them against mocks,
 * report the regression with a confidence score.
 *
 * Still one example throughout: PetClinic. Scene 2 breaks /api/pettypes and
 * scene 6 catches that same endpoint, so the cut closes its own loop.
 */
export const ReelShort: React.FC<ReelShortProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={S.hook}><SH1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={S.blast}><SH2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={S.record}><SH3Record /></Series.Sequence>
      <Series.Sequence durationInFrames={S.generate}><SH4Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={S.replay}><SH5Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={S.verdict}><SH6Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={S.payoff}><SH7Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
