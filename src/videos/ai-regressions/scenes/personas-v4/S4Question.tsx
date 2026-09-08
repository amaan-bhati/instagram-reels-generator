import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {Caption, GradText, Heading} from '../../../../kit/Text';
import {PX} from '../../timelinePersonasV4';

/**
 * The bridge, and the only beat in any variant with no product, no diagram and
 * no UI in frame. It asks the question and answers it as a requirement, so that
 * when Keploy arrives in the next beat it is answering something the viewer has
 * already agreed needs answering.
 */
export const S4Question: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PX.question} zoom={0.03}>
        <Stage gap={30}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={62}>So how do you stop that?</Heading>
          </div>
          <div style={{...enter(frame, fps, 24), marginTop: 6}}>
            <GradText size={54}>
              Something has to think
              <br />
              of the edge cases.
            </GradText>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 46).opacity}>Before your users do.</Caption>
    </AbsoluteFill>
  );
};
