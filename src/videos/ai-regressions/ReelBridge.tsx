import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {B1Hook} from './scenes/bridge/B1Hook';
import {B2Blast} from './scenes/bridge/B2Blast';
import {B3Gap} from './scenes/bridge/B3Gap';
import {B4Question} from './scenes/bridge/B4Question';
import {B5Enter} from './scenes/bridge/B5Enter';
import {B6Record} from './scenes/bridge/B6Record';
import {B7Generate} from './scenes/bridge/B7Generate';
import {B8Replay} from './scenes/bridge/B8Replay';
import {B9Verdict} from './scenes/bridge/B9Verdict';
import {B10Payoff} from './scenes/bridge/B10Payoff';
import {BR} from './timelineBridge';

export type ReelBridgeProps = {safeZone?: boolean};

/**
 * "Someone Has To": 40s, 9:16. The bridge variant.
 *
 * Same PetClinic story, but the product is earned instead of announced. Every
 * other cut goes blast radius -> "So Keploy captures everything", which is a
 * topic change. Here three beats sit in between:
 *
 *   3. gap       twelve tests written, none of them the edge cases
 *   4. question  so how do you stop that? Something has to think of the edge
 *                cases before your users do. No product, no UI, no diagram.
 *   5. enter     that is exactly what Keploy does, and here are the two things
 *                it writes: the test cases, and the edge cases AI missed
 *
 * By the time the logo lands the viewer has already agreed that something needs
 * to do this job, so Keploy reads as the answer rather than the advertisement.
 *
 * One example throughout: PetClinic. Scene 2 breaks /api/pettypes, scene 9
 * catches that same endpoint.
 */
export const ReelBridge: React.FC<ReelBridgeProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={BR.hook}><B1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.blast}><B2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.gap}><B3Gap /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.question}><B4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.enter}><B5Enter /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.record}><B6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.generate}><B7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.replay}><B8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.verdict}><B9Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={BR.payoff}><B10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
