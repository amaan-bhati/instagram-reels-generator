import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {GradText, Heading, KeployMark, Sub} from '../../../../kit/Text';
import {CV} from '../../timelineCoverage';

export const C8Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={CV.payoff} zoom={0.022}>
        <Stage gap={24}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={66}>Ship fast with AI.</Heading>
          </div>
          <div style={{...enter(frame, fps, 5), marginTop: -10}}>
            <GradText size={66}>
              Just don&rsquo;t ship
              <br />
              its regressions.
            </GradText>
          </div>
          <div style={{...enter(frame, fps, 14), marginTop: 18}}>
            <Sub size={32}>Keploy tests the whole app.</Sub>
          </div>
          <div style={{...enter(frame, fps, 24), marginTop: 22}}>
            <KeployMark size={48} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
