import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {Counter, DotRow, PipelineStep} from '../kit/Pipeline';
import {Stage} from '../kit/Stack';
import {Caption, Heading} from '../kit/Text';
import {D} from '../timeline';

/**
 * The opening is a pipeline the viewer watches finish, not a list they read.
 * Bars fill, a counter runs up to 12, twelve dots go green, then it deploys.
 */
export const S1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s1Hook} zoom={0.03}>
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 6}}>
            <Heading size={58}>Your AI shipped the feature.</Heading>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 14}}>
            <div style={enter(frame, fps, 8)}>
              <PipelineStep
                label="build"
                startAt={14}
                fillFrames={16}
                detail={<Chip label="succeeded" tone="pass" size={23} />}
              />
            </div>
            <div style={enter(frame, fps, 14)}>
              <PipelineStep
                label="AI wrote the tests"
                startAt={32}
                fillFrames={18}
                detail={<Counter to={12} startAt={32} frames={18} size={30} suffix=" tests" />}
              />
            </div>
            <div style={enter(frame, fps, 20)}>
              <PipelineStep
                label="tests passed"
                startAt={54}
                fillFrames={38}
                detail={<DotRow n={12} startAt={56} step={3} />}
              />
            </div>
            <div style={enter(frame, fps, 26)}>
              <PipelineStep
                label="deployed"
                startAt={96}
                fillFrames={16}
                detail={<Chip label="production" tone="brand" size={23} />}
              />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 118).opacity}>
        Everything looks fine. For now.
      </Caption>
    </AbsoluteFill>
  );
};
