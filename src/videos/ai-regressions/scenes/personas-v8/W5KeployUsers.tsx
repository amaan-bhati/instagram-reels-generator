import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {PersonaGraph} from '../../../../kit/PersonaGraph';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading, Sub} from '../../../../kit/Text';
import {AT} from '../../timelineFromAudio';

/**
 * The graph was carrying the whole idea by itself, and a reviewer said it was
 * not explanatory. So there is now a line under the heading saying what the
 * picture is of: Keploy reasons about every kind of user, and about every edge
 * case each of those users runs into, and turns each one into a test.
 *
 * An animation that needs its caption to make sense is an animation with a
 * missing line of copy.
 */
export const W5KeployUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={AT.keployUsers} zoom={0.02} origin="50% 48%">
        <Stage gap={14}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={46}>That is exactly what Keploy does.</Heading>
          </div>

          <div style={{...enter(frame, fps, 8), marginBottom: 4}}>
            <Sub size={30}>
              Keploy reasons through every kind of user, and
              <br />
              every edge case each of them hits.
            </Sub>
          </div>

          <PersonaGraph
            hub="keploy"
            count={36}
            hubAt={14}
            spokeAt={26}
            stagger={2}
            width={900}
            height={620}
          />

          <div style={{...enter(frame, fps, 110), marginTop: -8}}>
            <Chip label="scenarios and edge cases, learned from your app" tone="brand" size={25} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 116).opacity}>
        Every kind of user. Every path they take.
      </Caption>
    </AbsoluteFill>
  );
};
