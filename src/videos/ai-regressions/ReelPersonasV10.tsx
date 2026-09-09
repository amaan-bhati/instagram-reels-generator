import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {Y0Intro} from './scenes/personas-v10/Y0Intro';
import {Y1Hook} from './scenes/personas-v10/Y1Hook';
import {Y2Blast} from './scenes/personas-v10/Y2Blast';
import {Y3AiUsers} from './scenes/personas-v10/Y3AiUsers';
import {Y4Question} from './scenes/personas-v10/Y4Question';
import {Y5KeployUsers} from './scenes/personas-v10/Y5KeployUsers';
import {Y6Record} from './scenes/personas-v10/Y6Record';
import {Y7Generate} from './scenes/personas-v10/Y7Generate';
import {Y8Replay} from './scenes/personas-v10/Y8Replay';
import {Y9Verify} from './scenes/personas-v10/Y9Verify';
import {Y10Payoff} from './scenes/personas-v10/Y10Payoff';
import {AT} from './timelineFromAudio11';

export type ReelPersonasV10Props = {safeZone?: boolean};

/**
 * "Everyone Else v10": 51.83s, 9:16. The shippable cut.
 *
 * Eleven scenes, and every one of their lengths was measured from
 * audio/ElevenLabs_regressions.mp3 rather than chosen. The intro finally has
 * its own spoken line, so unlike v9 there is no silent opening.
 *
 * Three scenes needed re-timing against the measured durations: the intro lost
 * 9 frames, the hook lost 26, and replay lost 4. The hook mattered: v9's
 * stretched fills would have overrun their scene by five frames.
 */
export const ReelPersonasV10: React.FC<ReelPersonasV10Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={AT.intro}><Y0Intro /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.hook}><Y1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.blast}><Y2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.aiUsers}><Y3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.question}><Y4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.keployUsers}><Y5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.record}><Y6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.generate}><Y7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.replay}><Y8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.verify}><Y9Verify /></Series.Sequence>
      <Series.Sequence durationInFrames={AT.payoff}><Y10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
