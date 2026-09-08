import React from 'react';
import {AbsoluteFill, Series} from 'remotion';
import {DotGrid} from '../../kit/DotGrid';
import {SafeZone} from '../../kit/SafeZone';
import {H1Symptom} from './scenes/https/H1Symptom';
import {H2Confusion} from './scenes/https/H2Confusion';
import {H3Why} from './scenes/https/H3Why';
import {H4Diagnostic} from './scenes/https/H4Diagnostic';
import {H5Fix} from './scenes/https/H5Fix';
import {H6Verify} from './scenes/https/H6Verify';
import {H7Payoff} from './scenes/https/H7Payoff';
import {HT} from './timelineHttps';

export type ReelHttpsProps = {safeZone?: boolean};

/**
 * "Mocks Only": 41.5s, 9:16. The HTTPS troubleshooting cut.
 *
 * A different job from every other variant here. The rest sell a capability;
 * this one debugs a silent failure reported by a real user: Keploy works over
 * HTTP, but switching to HTTPS produces a full mocks.yaml and zero test cases.
 *
 * The spine is the asymmetry that causes it. Keploy captures ingress and egress
 * separately: calls into the app become test cases, the app's calls out to
 * Postgres become mocks. Over HTTPS the ingress hop is encrypted so nothing can
 * be lifted from it, while the local Postgres hop stays plaintext and records
 * fine. The tool succeeds and fails on the same run, which is what makes the
 * symptom so confusing, and which makes the diagnosis a single question:
 * is mocks.yaml empty too? If yes it is wiring, if no it is certificates.
 *
 * Stack shown is Go plus Gin plus Postgres, matching the original report.
 */
export const ReelHttps: React.FC<ReelHttpsProps> = ({safeZone = false}) => (
  <AbsoluteFill>
    <DotGrid />
    <Series>
      <Series.Sequence durationInFrames={HT.symptom}><H1Symptom /></Series.Sequence>
      <Series.Sequence durationInFrames={HT.confusion}><H2Confusion /></Series.Sequence>
      <Series.Sequence durationInFrames={HT.why}><H3Why /></Series.Sequence>
      <Series.Sequence durationInFrames={HT.diagnostic}><H4Diagnostic /></Series.Sequence>
      <Series.Sequence durationInFrames={HT.fix}><H5Fix /></Series.Sequence>
      <Series.Sequence durationInFrames={HT.verify}><H6Verify /></Series.Sequence>
      <Series.Sequence durationInFrames={HT.payoff}><H7Payoff /></Series.Sequence>
    </Series>
    <SafeZone show={safeZone} />
  </AbsoluteFill>
);
