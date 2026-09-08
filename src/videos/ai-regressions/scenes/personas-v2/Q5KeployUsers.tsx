import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {PersonaGraph} from '../../../../kit/PersonaGraph';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PV} from '../../timelinePersonasV2';

/**
 * The hero shot, and the payoff for scene 3.
 *
 * Same graph, same glyphs, same spokes. The hub is the Keploy mark and glows,
 * the spokes are brand orange, and thirty six people bloom outward over about
 * two and a half seconds. Nothing has to say "more coverage": the frame fills.
 */
export const Q5KeployUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PV.keployUsers} zoom={0.022} origin="50% 48%">
        <Stage gap={14}>
          <div style={{...enter(frame, fps, 0), marginBottom: 0}}>
            <Heading size={48}>That is exactly what Keploy does.</Heading>
          </div>

          <PersonaGraph
            hub="keploy"
            count={36}
            hubAt={8}
            spokeAt={26}
            stagger={2}
            width={900}
            height={700}
          />

          <div style={{...enter(frame, fps, 112), marginTop: -10}}>
            <Chip label="36 scenarios, learned from real traffic" tone="brand" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 132).opacity}>
        Every kind of user. Every path they take.
      </Caption>
    </AbsoluteFill>
  );
};
