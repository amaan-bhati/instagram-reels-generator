import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {IntroBreak} from './scenes/intro/IntroBreak';
import {X1Hook} from './scenes/personas-v9/X1Hook';
import {X2Blast} from './scenes/personas-v9/X2Blast';
import {X3AiUsers} from './scenes/personas-v9/X3AiUsers';
import {X4Question} from './scenes/personas-v9/X4Question';
import {X5KeployUsers} from './scenes/personas-v9/X5KeployUsers';
import {X6Record} from './scenes/personas-v9/X6Record';
import {X7Generate} from './scenes/personas-v9/X7Generate';
import {X8Replay} from './scenes/personas-v9/X8Replay';
import {X9Verify} from './scenes/personas-v9/X9Verify';
import {X10Payoff} from './scenes/personas-v9/X10Payoff';
import {PV9} from './timelinePersonasV9';

export type ReelPersonasV9Props = {safeZone?: boolean};

/**
 * "Everyone Else v9": 53.1s, 9:16.
 *
 * v8 with an opening beat in front of the hook, and the hook's animation
 * stretched so it moves for as long as the beat lasts.
 *
 * The new opening states the claim and proves it in one frame: seven rows land
 * and every one goes green, which is AI writing tests and passing them, and
 * then a red banner underneath says production broke anyway. Both halves have
 * to be on screen together, because passing tests alone say the code is fine
 * and the banner alone says nothing about why.
 *
 * The intro's 150 frames is an ESTIMATE. Everything from the hook down is
 * measured from audio/regressions-1.mp3. See timelinePersonasV9.ts.
 */
export const ReelPersonasV9: React.FC<ReelPersonasV9Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={PV9.intro}><IntroBreak /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.hook}><X1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.blast}><X2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.aiUsers}><X3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.question}><X4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.keployUsers}><X5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.record}><X6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.generate}><X7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.replay}><X8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.verify}><X9Verify /></Series.Sequence>
      <Series.Sequence durationInFrames={PV9.payoff}><X10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
