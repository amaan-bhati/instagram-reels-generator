import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {T1Hook} from './scenes/tight/T1Hook';
import {T2Blast} from './scenes/tight/T2Blast';
import {T3Record} from './scenes/tight/T3Record';
import {T4Generate} from './scenes/tight/T4Generate';
import {T5Replay} from './scenes/tight/T5Replay';
import {T6Verdict} from './scenes/tight/T6Verdict';
import {T7Payoff} from './scenes/tight/T7Payoff';
import {T} from './timelineTight';

export type ReelTightProps = {safeZone?: boolean};

/**
 * "Regressions": 30s, 9:16. The tight variant.
 *
 * Same seven beats and the same 25/67/8 weighting as the 40s cut, with every
 * beat pulled down to its floor. Nothing was dropped from the 40s version:
 * the problem still lands in two beats, Keploy still gets record, generate,
 * replay and verdict. Only the holds are shorter.
 *
 * One example throughout: PetClinic. Scene 2 breaks /api/pettypes, scene 6
 * catches that same endpoint.
 */
export const ReelTight: React.FC<ReelTightProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={T.hook}><T1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={T.blast}><T2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={T.record}><T3Record /></Series.Sequence>
      <Series.Sequence durationInFrames={T.generate}><T4Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={T.replay}><T5Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={T.verdict}><T6Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={T.payoff}><T7Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
