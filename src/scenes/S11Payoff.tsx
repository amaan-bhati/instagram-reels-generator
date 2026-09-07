import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Stage} from '../kit/Stack';
import {GradText, Heading, KeployMark, Sub} from '../kit/Text';
import {D} from '../timeline';

export const S11Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s11Payoff} zoom={0.024}>
        <Stage gap={26}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={70}>Ship with AI.</Heading>
          </div>
          <div style={{...enter(frame, fps, 8), marginTop: -10}}>
            <GradText size={70}>
              Just don&rsquo;t let it
              <br />
              grade its own homework.
            </GradText>
          </div>
          <div style={{...enter(frame, fps, 24), marginTop: 20}}>
            <Sub size={33}>
              Keploy tests the whole app.
              <br />
              Not just the part AI touched.
            </Sub>
          </div>
          <div style={{...enter(frame, fps, 36), marginTop: 24}}>
            <KeployMark size={50} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
