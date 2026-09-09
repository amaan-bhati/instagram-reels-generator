import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {PersonaGraph} from '../../../../kit/PersonaGraph';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {AT} from '../../timelineFromAudio11';

/**
 * Widened from "the users it could imagine" to the users AND the cases, and the
 * caption now points at the specific code AI wrote rather than at "the code" in
 * general. The distinction matters: the ceiling on what AI can test is the
 * artefact it just produced, not the system it lives in.
 */
export const Y3AiUsers: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={AT.aiUsers} zoom={0.026}>
        <Stage gap={18}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>
              AI wrote tests only for the users
              <br />
              and the cases it could imagine.
            </Heading>
          </div>

          <PersonaGraph
            hub="ai"
            count={5}
            hubAt={10}
            spokeAt={30}
            stagger={10}
            width={900}
            height={500}
          />

          <div style={{...enter(frame, fps, 120), marginTop: -4}}>
            <Chip label="5 scenarios, guessed from its own code" tone="neutral" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 100).opacity}>
        Only what the code it wrote implied.
      </Caption>
    </AbsoluteFill>
  );
};
