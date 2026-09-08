import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {S1Hook} from './scenes/personas-v4/S1Hook';
import {S2Blast} from './scenes/personas-v4/S2Blast';
import {S3AiUsers} from './scenes/personas-v4/S3AiUsers';
import {S4Question} from './scenes/personas-v4/S4Question';
import {S5KeployUsers} from './scenes/personas-v4/S5KeployUsers';
import {S6Record} from './scenes/personas-v4/S6Record';
import {S7Generate} from './scenes/personas-v4/S7Generate';
import {S8Replay} from './scenes/personas-v4/S8Replay';
import {S9Verdict} from './scenes/personas-v4/S9Verdict';
import {S10Payoff} from './scenes/personas-v4/S10Payoff';
import {PX} from './timelinePersonasV4';

export type ReelPersonasV4Props = {safeZone?: boolean};

/**
 * "Everyone Else v4": 49s, 9:16.
 *
 * v3 fixed the copy. This pass rebuilds the record and replay diagrams to a
 * supplied reference, and the fix that mattered was sequence rather than
 * styling: record opens on the app calling its own dependencies with no Keploy
 * in frame, then Keploy lands on those exact paths. Replay makes Keploy the
 * actor instead of the observer.
 */
export const ReelPersonasV4: React.FC<ReelPersonasV4Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={PX.hook}><S1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.blast}><S2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.aiUsers}><S3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.question}><S4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.keployUsers}><S5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.record}><S6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.generate}><S7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.replay}><S8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.verdict}><S9Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={PX.payoff}><S10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
