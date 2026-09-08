import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {P1Hook} from './scenes/personas/P1Hook';
import {P2Blast} from './scenes/personas/P2Blast';
import {P3AiUsers} from './scenes/personas/P3AiUsers';
import {P4Question} from './scenes/personas/P4Question';
import {P5KeployUsers} from './scenes/personas/P5KeployUsers';
import {P6Record} from './scenes/personas/P6Record';
import {P7Generate} from './scenes/personas/P7Generate';
import {P8Replay} from './scenes/personas/P8Replay';
import {P9Verdict} from './scenes/personas/P9Verdict';
import {P10Payoff} from './scenes/personas/P10Payoff';
import {PS} from './timelinePersonas';

export type ReelPersonasProps = {safeZone?: boolean};

/**
 * "Everyone Else": 40s, 9:16. The personas variant.
 *
 * The coverage argument stops being a list and becomes a picture. One hub and
 * spoke graph is used twice:
 *
 *   scene 3  AI at the centre of five people, grey hub, grey spokes. Five is
 *            what you can infer from a file, and the empty space around the
 *            graph does the talking.
 *   scene 5  Keploy at the centre of thirty six, glowing hub, orange spokes,
 *            blooming outward for two and a half seconds until the frame fills.
 *
 * Same component, same glyphs, same spokes. Only the density changes, so the
 * viewer draws the conclusion instead of reading it.
 *
 * The AI side is 11.5s end to end. One example throughout: PetClinic. Scene 2
 * breaks /api/pettypes, scene 9 catches that same endpoint.
 */
export const ReelPersonas: React.FC<ReelPersonasProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={PS.hook}><P1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.blast}><P2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.aiUsers}><P3AiUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.question}><P4Question /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.keployUsers}><P5KeployUsers /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.record}><P6Record /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.generate}><P7Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.replay}><P8Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.verdict}><P9Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={PS.payoff}><P10Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
