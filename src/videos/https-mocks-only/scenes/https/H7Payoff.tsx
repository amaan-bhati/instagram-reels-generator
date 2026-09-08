import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {GradText, Heading, KeployMark} from '../../../../kit/Text';
import {HT} from '../../timelineHttps';

export const H7Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={HT.payoff} zoom={0.022}>
        <Stage gap={26}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={58}>Mocks but no tests?</Heading>
          </div>
          <div style={{...enter(frame, fps, 8), marginTop: -8}}>
            <GradText size={58}>
              It is almost always
              <br />
              the certificate.
            </GradText>
          </div>
          <div style={{...enter(frame, fps, 24), marginTop: 26}}>
            <KeployMark size={48} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
