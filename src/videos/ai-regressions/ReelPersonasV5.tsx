import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {T1Hook} from './scenes/personas-v5/T1Hook';
import {T2Blast} from './scenes/personas-v5/T2Blast';
import {T3AiUsers} from './scenes/personas-v5/T3AiUsers';
import {T4Question} from './scenes/personas-v5/T4Question';
import {T5KeployUsers} from './scenes/personas-v5/T5KeployUsers';
import {T6Record} from './scenes/personas-v5/T6Record';
import {T7Generate} from './scenes/personas-v5/T7Generate';
import {T8Replay} from './scenes/personas-v5/T8Replay';
import {T9Verdict} from './scenes/personas-v5/T9Verdict';
import {T10Payoff} from './scenes/personas-v5/T10Payoff';
import {PY} from './timelinePersonasV5';

export type ReelPersonasV5Props = {safeZone?: boolean};

/**
 * "Everyone Else v5": 48s, 9:16.
 *
 * One card for the app instead of two, every gradient held to 4.5:1, and the
 * replay beat now shows the run it was only claiming before: rows landing
 * pending and resolving to pass or fail on top of a deeper pile.
 */
export const ReelPersonasV5: React.FC<ReelPersonasV5Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={PY.hook}><T1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.blast}><T2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.aiUsers}><T3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.question}><T4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.keployUsers}><T5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.record}><T6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.generate}><T7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.replay}><T8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.verdict}><T9Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={PY.payoff}><T10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
