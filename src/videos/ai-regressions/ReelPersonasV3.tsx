import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {R1Hook} from './scenes/personas-v3/R1Hook';
import {R2Blast} from './scenes/personas-v3/R2Blast';
import {R3AiUsers} from './scenes/personas-v3/R3AiUsers';
import {R4Question} from './scenes/personas-v3/R4Question';
import {R5KeployUsers} from './scenes/personas-v3/R5KeployUsers';
import {R6Record} from './scenes/personas-v3/R6Record';
import {R7Generate} from './scenes/personas-v3/R7Generate';
import {R8Replay} from './scenes/personas-v3/R8Replay';
import {R9Verdict} from './scenes/personas-v3/R9Verdict';
import {R10Payoff} from './scenes/personas-v3/R10Payoff';
import {PW} from './timelinePersonasV3';

export type ReelPersonasV3Props = {safeZone?: boolean};

/**
 * "Everyone Else v3": 47s, 9:16.
 *
 * v2 fixed the visuals. This pass fixes the words, which were leaving the
 * visuals to explain themselves:
 *
 *   blast        names the blast radius, says the AI's own tests still passed,
 *                and says the users found the regressions first
 *   aiUsers      the users AND the cases it could imagine, bounded by the code
 *                AI itself wrote
 *   keployUsers  a line under the heading saying what the graph is of
 *   generate     one column instead of two, normal first and edge beneath
 */
export const ReelPersonasV3: React.FC<ReelPersonasV3Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={PW.hook}><R1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.blast}><R2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.aiUsers}><R3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.question}><R4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.keployUsers}><R5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.record}><R6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.generate}><R7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.replay}><R8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.verdict}><R9Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={PW.payoff}><R10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
