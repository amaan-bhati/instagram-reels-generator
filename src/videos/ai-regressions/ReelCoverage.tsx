import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {C1Hook} from './scenes/coverage/C1Hook';
import {C2Blast} from './scenes/coverage/C2Blast';
import {C3Coverage} from './scenes/coverage/C3Coverage';
import {C4Record} from './scenes/coverage/C4Record';
import {C5Generate} from './scenes/coverage/C5Generate';
import {C6Replay} from './scenes/coverage/C6Replay';
import {C7Verdict} from './scenes/coverage/C7Verdict';
import {C8Payoff} from './scenes/coverage/C8Payoff';
import {CV} from './timelineCoverage';

export type ReelCoverageProps = {safeZone?: boolean};

/**
 * "Both Kinds": 40s, 9:16. The coverage variant.
 *
 * The regression setup is kept to two beats and 7.5s. The rest belongs to
 * Keploy, and the argument shifts from "it catches drift" to "it covers what
 * AI cannot reach":
 *
 *   AI can only reason about the code it was handed, so it covers the happy
 *   path and the code it just wrote. Keploy learned the app from real traffic,
 *   so it covers the same list plus invalid input, what users actually send,
 *   and every other endpoint. Normal cases and edge cases, both.
 *
 * Scene 3 states that as two columns over one shared list. Scene 5 shows it
 * being produced: a NORMAL CASES column and an EDGE CASES column, with the
 * right one flagged as the part AI wrote none of.
 *
 * One example throughout: PetClinic. Scene 2 breaks /api/pettypes, scene 7
 * catches that same endpoint.
 */
export const ReelCoverage: React.FC<ReelCoverageProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={CV.hook}><C1Hook /></Series.Sequence>
      <Series.Sequence durationInFrames={CV.blast}><C2Blast /></Series.Sequence>
      <Series.Sequence durationInFrames={CV.coverage}><C3Coverage /></Series.Sequence>
      <Series.Sequence durationInFrames={CV.record}><C4Record /></Series.Sequence>
      <Series.Sequence durationInFrames={CV.generate}><C5Generate /></Series.Sequence>
      <Series.Sequence durationInFrames={CV.replay}><C6Replay /></Series.Sequence>
      <Series.Sequence durationInFrames={CV.verdict}><C7Verdict /></Series.Sequence>
      <Series.Sequence durationInFrames={CV.payoff}><C8Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
