import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {GradText, Heading, KeployMark} from '../../../../kit/Text';
import {PZ} from '../../timelinePersonasV6';

export const U10Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PZ.payoff} zoom={0.022}>
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
          <div style={{...enter(frame, fps, 16), marginTop: 24}}>
            <KeployMark size={48} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
