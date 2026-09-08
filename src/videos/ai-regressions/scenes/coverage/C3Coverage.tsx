import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {CoveragePanel, type CoverageRow} from '../../../../kit/CoveragePanel';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {colors as C} from '../../../../theme';
import {CV} from '../../timelineCoverage';

/**
 * The centrepiece of this variant.
 *
 * Same five things that can go wrong, two columns. AI can only reason about
 * the code it was given, so it covers the first two and misses the rest.
 * Keploy learned the app from real traffic, so it covers all five: the normal
 * cases and the edge cases.
 */
const SAME_LIST = [
  'the happy path',
  'the code it just wrote',
  'expired and invalid input',
  'what real users actually send',
  'every other endpoint',
];

const aiRows: CoverageRow[] = SAME_LIST.map((text, i) => ({text, covered: i < 2}));
const keployRows: CoverageRow[] = SAME_LIST.map((text) => ({text, covered: true}));

export const C3Coverage: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={CV.coverage} zoom={0.024} origin="50% 46%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>
              AI covers what the code does.
              <br />
              Keploy covers what users do.
            </Heading>
          </div>

          <div style={{display: 'flex', gap: 20, alignItems: 'flex-start'}}>
            <div style={enter(frame, fps, 10)}>
              <CoveragePanel heading="AI COVERS" tone="neutral" rows={aiRows} startAt={16} />
            </div>
            <div style={enter(frame, fps, 62)}>
              <CoveragePanel heading="KEPLOY COVERS" tone="brand" rows={keployRows} startAt={68} />
            </div>
          </div>

          <div style={{...enter(frame, fps, 130), marginTop: 10}}>
            <Chip label="normal cases and edge cases" tone="brand" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 150).opacity}>
        <span style={{color: C.text}}>Your app was built for one.</span>
        <br />
        <span style={{color: C.orangeDeep}}>Your users live in the other.</span>
      </Caption>
    </AbsoluteFill>
  );
};
