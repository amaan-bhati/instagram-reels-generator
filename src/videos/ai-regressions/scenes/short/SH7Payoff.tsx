import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {GradText, Heading, KeployMark, Sub} from '../../../../kit/Text';
import {S} from '../../timelineShort';

export const SH7Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={S.payoff} zoom={0.024}>
        <Stage gap={26}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={68}>Ship fast with AI.</Heading>
          </div>
          <div style={{...enter(frame, fps, 8), marginTop: -10}}>
            <GradText size={68}>
              Just don&rsquo;t ship
              <br />
              its regressions.
            </GradText>
          </div>
          <div style={{...enter(frame, fps, 22), marginTop: 20}}>
            <Sub size={33}>
              Keploy tests the whole app.
              <br />
              Not just the part AI touched.
            </Sub>
          </div>
          <div style={{...enter(frame, fps, 32), marginTop: 24}}>
            <KeployMark size={50} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
