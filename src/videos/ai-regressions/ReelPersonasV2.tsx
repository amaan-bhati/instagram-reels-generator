import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {Q1Hook} from './scenes/personas-v2/Q1Hook';
import {Q2Blast} from './scenes/personas-v2/Q2Blast';
import {Q3AiUsers} from './scenes/personas-v2/Q3AiUsers';
import {Q4Question} from './scenes/personas-v2/Q4Question';
import {Q5KeployUsers} from './scenes/personas-v2/Q5KeployUsers';
import {Q6Record} from './scenes/personas-v2/Q6Record';
import {Q7Generate} from './scenes/personas-v2/Q7Generate';
import {Q8Replay} from './scenes/personas-v2/Q8Replay';
import {Q9Verdict} from './scenes/personas-v2/Q9Verdict';
import {Q10Payoff} from './scenes/personas-v2/Q10Payoff';
import {PV} from './timelinePersonasV2';

export type ReelPersonasV2Props = {safeZone?: boolean};

/**
 * "Everyone Else v2": 44s, 9:16.
 *
 * Personas40 with six review notes applied. The argument is unchanged: AI sits
 * at the centre of five imagined users, Keploy sits at the centre of thirty six
 * learned from real traffic. What changed is everything about how readable it
 * is, which is what the feedback was about.
 */
export const ReelPersonasV2: React.FC<ReelPersonasV2Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={PV.hook}><Q1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.blast}><Q2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.aiUsers}><Q3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.question}><Q4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.keployUsers}><Q5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.record}><Q6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.generate}><Q7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.replay}><Q8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.verdict}><Q9Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={PV.payoff}><Q10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
