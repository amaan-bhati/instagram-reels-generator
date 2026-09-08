import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {PersonaGraph} from '../../../../kit/PersonaGraph';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading, Sub} from '../../../../kit/Text';
import {PZ} from '../../timelinePersonasV6';

/**
 * The graph was carrying the whole idea by itself, and a reviewer said it was
 * not explanatory. So there is now a line under the heading saying what the
 * picture is of: Keploy reasons about every kind of user, and about every edge
 * case each of those users runs into, and turns each one into a test.
 *
 * An animation that needs its caption to make sense is an animation with a
 * missing line of copy.
 */
export const U5KeployUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PZ.keployUsers} zoom={0.02} origin="50% 48%">
        <Stage gap={14}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={46}>That is exactly what Keploy does.</Heading>
          </div>

          <div style={{...enter(frame, fps, 10), marginBottom: 4}}>
            <Sub size={30}>
              It reasons through every kind of user, and every
              <br />
              edge case each of them hits, then writes the test.
            </Sub>
          </div>

          <PersonaGraph
            hub="keploy"
            count={36}
            hubAt={24}
            spokeAt={42}
            stagger={2}
            width={900}
            height={620}
          />

          <div style={{...enter(frame, fps, 150), marginTop: -8}}>
            <Chip label="scenarios and edge cases, learned from your app" tone="brand" size={25} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 160).opacity}>
        Every kind of user. Every path they take.
      </Caption>
    </AbsoluteFill>
  );
};
