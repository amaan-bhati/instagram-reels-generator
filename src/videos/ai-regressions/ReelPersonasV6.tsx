import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {U1Hook} from './scenes/personas-v6/U1Hook';
import {U2Blast} from './scenes/personas-v6/U2Blast';
import {U3AiUsers} from './scenes/personas-v6/U3AiUsers';
import {U4Question} from './scenes/personas-v6/U4Question';
import {U5KeployUsers} from './scenes/personas-v6/U5KeployUsers';
import {U6Record} from './scenes/personas-v6/U6Record';
import {U7Generate} from './scenes/personas-v6/U7Generate';
import {U8Replay} from './scenes/personas-v6/U8Replay';
import {U9Verify} from './scenes/personas-v6/U9Verify';
import {U10Payoff} from './scenes/personas-v6/U10Payoff';
import {PZ} from './timelinePersonasV6';

export type ReelPersonasV6Props = {safeZone?: boolean};

/**
 * "Everyone Else v6": 51.5s, 9:16.
 *
 * Slower where it was unreadable, no unsourced counts, and it ends on the
 * verification run instead of on a Buggy panel that was reporting the same
 * thing. Replay is two beats now: the diagram, then eleven cases resolving.
 */
export const ReelPersonasV6: React.FC<ReelPersonasV6Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={PZ.hook}><U1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.blast}><U2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.aiUsers}><U3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.question}><U4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.keployUsers}><U5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.record}><U6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.generate}><U7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.replay}><U8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.verify}><U9Verify /></Series.Sequence>
      <Series.Sequence durationInFrames={PZ.payoff}><U10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
