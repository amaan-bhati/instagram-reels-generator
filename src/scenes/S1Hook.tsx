import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, stagger} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Stage} from '../kit/Stack';
import {Caption, Heading, Sub} from '../kit/Text';
import {TestRow} from '../kit/TestRow';
import {D} from '../timeline';

const ROWS = [
  'build succeeded',
  'unit tests  12 passed',
  'deployed to production',
];

export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s1Hook} zoom={0.035}>
        <Stage gap={40}>
          <div style={enter(frame, fps, 2)}>
            <Heading size={82}>
              Your AI shipped
              <br />
              the feature.
            </Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 16, width: 780, marginTop: 12}}>
            {ROWS.map((r, i) => (
              <div key={r} style={enter(frame, fps, 18 + stagger(i))}>
                <TestRow text={r} status="pass" />
              </div>
            ))}
          </div>
          <div style={{...enter(frame, fps, 40), marginTop: 10}}>
            <Sub>Green across the board.</Sub>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 10).opacity}>Everything looks fine.</Caption>
    </AbsoluteFill>
  );
};
