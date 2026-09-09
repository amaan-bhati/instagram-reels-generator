import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {GradText, Heading, KeployMark} from '../../../../kit/Text';
import {AT} from '../../timelineFromAudio';

/**
 * Ends on the outcome rather than on a slogan.
 *
 * Every earlier cut closed with "Ship fast with AI. Just don't ship its
 * regressions.", which is a nice line that tells the viewer nothing about what
 * changed for them. This says what they now have: they know where the app
 * breaks, and they fix it before anyone outside sees it.
 *
 * 3.0s instead of 2.0s to carry the second line, paid for by trimming half a
 * second off the replay beat.
 */
export const W10Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={AT.payoff} zoom={0.022}>
        <Stage gap={24}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={54}>
              Now you know where
              <br />
              your app breaks.
            </Heading>
          </div>
          <div style={{...enter(frame, fps, 10), marginTop: -6}}>
            <GradText size={54}>
              And you fix it before
              <br />
              your users do.
            </GradText>
          </div>
          <div style={{...enter(frame, fps, 26), marginTop: 26}}>
            <KeployMark size={48} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
