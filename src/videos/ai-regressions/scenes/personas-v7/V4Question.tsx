import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {Caption, GradText, Heading} from '../../../../kit/Text';
import {QA} from '../../timelinePersonasV7';

/**
 * The bridge, and the only beat in any variant with no product, no diagram and
 * no UI in frame. It asks the question and answers it as a requirement, so that
 * when Keploy arrives in the next beat it is answering something the viewer has
 * already agreed needs answering.
 */
export const V4Question: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={QA.question} zoom={0.03}>
        <Stage gap={30}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={62}>So how do you stop that?</Heading>
          </div>
          <div style={{...enter(frame, fps, 28), marginTop: 6}}>
            <GradText size={54}>
              Something has to think
              <br />
              of the edge cases.
            </GradText>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 56).opacity}>Before your users do.</Caption>
    </AbsoluteFill>
  );
};
