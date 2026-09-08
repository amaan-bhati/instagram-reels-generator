import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {V1Hook} from './scenes/personas-v7/V1Hook';
import {V2Blast} from './scenes/personas-v7/V2Blast';
import {V3AiUsers} from './scenes/personas-v7/V3AiUsers';
import {V4Question} from './scenes/personas-v7/V4Question';
import {V5KeployUsers} from './scenes/personas-v7/V5KeployUsers';
import {V6Record} from './scenes/personas-v7/V6Record';
import {V7Generate} from './scenes/personas-v7/V7Generate';
import {V8Replay} from './scenes/personas-v7/V8Replay';
import {V9Verify} from './scenes/personas-v7/V9Verify';
import {V10Payoff} from './scenes/personas-v7/V10Payoff';
import {QA} from './timelinePersonasV7';

export type ReelPersonasV7Props = {safeZone?: boolean};

/**
 * "Everyone Else v7": 52s, 9:16.
 *
 * Keploy is named as the subject in every beat of its own half, and the reel
 * closes on the outcome instead of a slogan.
 */
export const ReelPersonasV7: React.FC<ReelPersonasV7Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={QA.hook}><V1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.blast}><V2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.aiUsers}><V3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.question}><V4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.keployUsers}><V5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.record}><V6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.generate}><V7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.replay}><V8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.verify}><V9Verify /></Series.Sequence>
      <Series.Sequence durationInFrames={QA.payoff}><V10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
