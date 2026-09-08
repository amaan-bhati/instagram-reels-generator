import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, enter, settle} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {CoveragePanel, type CoverageRow} from '../../../../kit/CoveragePanel';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading, KeployMark} from '../../../../kit/Text';
import {BR} from '../../timelineBridge';

/**
 * The introduction, finally. The logo lands first and large, as the answer to
 * the question just asked, then the two things it writes: the ordinary tests,
 * and the edge cases AI skipped. That second row is the whole reason this
 * variant exists.
 */
const ROWS: CoverageRow[] = [
  {text: 'the test cases', covered: true},
  {text: 'the edge cases AI missed', covered: true},
];

export const B5Enter: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const k = settle(frame, fps, 2);
  const b = breathe(frame, fps, 1.8);

  return (
    <AbsoluteFill>
      <Camera duration={BR.enter} zoom={0.024}>
        <Stage gap={26}>
          <div
            style={{
              opacity: k,
              transform: `scale(${0.86 + k * 0.14})`,
              filter: `drop-shadow(0 12px ${18 + b * 22}px rgba(247,107,28,${0.16 + b * 0.16}))`,
            }}
          >
            <KeployMark size={74} />
          </div>

          <div style={{...enter(frame, fps, 24), marginTop: 6}}>
            <Heading size={46}>That is exactly what Keploy does.</Heading>
          </div>

          <div style={{...enter(frame, fps, 44), marginTop: 4}}>
            <CoveragePanel
              heading="KEPLOY WRITES"
              tone="brand"
              rows={ROWS}
              startAt={50}
              width={620}
              fontSize={28}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 72).opacity}>
        Not just the tests. The ones AI never thought of.
      </Caption>
    </AbsoluteFill>
  );
};
