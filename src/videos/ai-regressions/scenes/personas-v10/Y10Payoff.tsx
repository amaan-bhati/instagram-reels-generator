import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {GradText, Heading, KeployMark} from '../../../../kit/Text';
import {AT} from '../../timelineFromAudio11';

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
export const Y10Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={AT.payoff} zoom={0.022}>
        {/*
          Two lines, not four.
          The previous close ran "Now you know where / your app breaks." over
          "And you fix it before / your users do.", which is four lines of type
          for one idea and reads as a wall in the 2.8s this beat gets. One
          sentence split once, with the second half in the brand ramp so the
          colour still does the emphasis it did before.
        */}
        <Stage gap={26}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={56}>Catch what breaks in your app</Heading>
          </div>
          <div style={{...enter(frame, fps, 10), marginTop: -8}}>
            <GradText size={56}>before it reaches your users.</GradText>
          </div>
          <div style={{...enter(frame, fps, 26), marginTop: 34}}>
            <KeployMark size={52} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
