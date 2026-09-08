import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {PersonaGraph} from '../../../../kit/PersonaGraph';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading, Sub} from '../../../../kit/Text';
import {PW} from '../../timelinePersonasV3';

/**
 * The graph was carrying the whole idea by itself, and a reviewer said it was
 * not explanatory. So there is now a line under the heading saying what the
 * picture is of: Keploy reasons about every kind of user, and about every edge
 * case each of those users runs into, and turns each one into a test.
 *
 * An animation that needs its caption to make sense is an animation with a
 * missing line of copy.
 */
export const R5KeployUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PW.keployUsers} zoom={0.02} origin="50% 48%">
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
            hubAt={20}
            spokeAt={36}
            stagger={2}
            width={900}
            height={620}
          />

          <div style={{...enter(frame, fps, 128), marginTop: -8}}>
            <Chip label="36 scenarios, learned from real traffic" tone="brand" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 150).opacity}>
        Every kind of user. Every path they take.
      </Caption>
    </AbsoluteFill>
  );
};
