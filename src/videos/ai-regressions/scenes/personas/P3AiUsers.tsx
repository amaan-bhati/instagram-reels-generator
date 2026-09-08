import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {PersonaGraph} from '../../../../kit/PersonaGraph';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PS} from '../../timelinePersonas';

/**
 * Five people, grey spokes, a grey hub. AI can only reason about the file it
 * was handed, so the scenarios it invents are the ones that file implies.
 * Deliberately sparse: the empty space around the graph is the argument.
 */
export const P3AiUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PS.aiUsers} zoom={0.026}>
        <Stage gap={18}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>
              It wrote tests for the users
              <br />
              it could imagine.
            </Heading>
          </div>

          <PersonaGraph
            hub="ai"
            count={5}
            hubAt={6}
            spokeAt={22}
            stagger={7}
            width={900}
            height={520}
          />

          <div style={{...enter(frame, fps, 84), marginTop: -6}}>
            <Chip label="5 scenarios, guessed from the code" tone="neutral" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 66).opacity}>
        Only the ones the code implied.
      </Caption>
    </AbsoluteFill>
  );
};
