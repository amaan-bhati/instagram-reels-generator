import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {V1Symptom} from './scenes/https2/V1Symptom';
import {V2Confusion} from './scenes/https2/V2Confusion';
import {V3Why} from './scenes/https2/V3Why';
import {V4Checklist} from './scenes/https2/V4Checklist';
import {V5Cert} from './scenes/https2/V5Cert';
import {V6Verify} from './scenes/https2/V6Verify';
import {V7Payoff} from './scenes/https2/V7Payoff';
import {H2} from './timelineHttps2';

export type ReelHttps2Props = {safeZone?: boolean};

/**
 * "Mocks Only v2": 44s, 9:16.
 *
 * Same spine as MocksOnly42, with the two pillars the brief singled out given
 * real room:
 *
 *   scene 4  the diagnostic is now an ordered four step checklist rather than
 *            one question. Steps 1 to 3 are all "Keploy never got into the
 *            path", and each of them would leave mocks.yaml empty too. Since it
 *            is not empty, they are eliminated by the symptom itself, and step
 *            4 carries a "you are here" badge. The list becomes a position.
 *
 *   scene 5  the CA is installed in all three environments named in the brief:
 *            local machine, Docker, and the Go runtime that actually performs
 *            the lookup. Stacked, not tabbed, because troubleshooting reels get
 *            screenshotted and a tab nobody saw is a tab nobody can paste.
 *
 * Stack shown is Go plus Gin plus Postgres, matching the original report.
 */
export const ReelHttps2: React.FC<ReelHttps2Props> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={H2.symptom}><V1Symptom /></Series.Sequence>
      <Series.Sequence durationInFrames={H2.confusion}><V2Confusion /></Series.Sequence>
      <Series.Sequence durationInFrames={H2.why}><V3Why /></Series.Sequence>
      <Series.Sequence durationInFrames={H2.checklist}><V4Checklist /></Series.Sequence>
      <Series.Sequence durationInFrames={H2.cert}><V5Cert /></Series.Sequence>
      <Series.Sequence durationInFrames={H2.verify}><V6Verify /></Series.Sequence>
      <Series.Sequence durationInFrames={H2.payoff}><V7Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
