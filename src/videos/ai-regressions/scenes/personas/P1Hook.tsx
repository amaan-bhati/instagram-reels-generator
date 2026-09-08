import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DotRow, PipelineStep} from '../../../../kit/Pipeline';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PS} from '../../timelinePersonas';

/**
 * 2.5s. The caption comes in early and overlaps the last two steps, which is
 * what buys the settled hold at the end.
 */
export const P1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PS.hook} zoom={0.028}>
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 6}}>
            <Heading size={58}>Your AI shipped the feature.</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
            <div style={enter(frame, fps, 2)}>
              <PipelineStep
                label="build"
                startAt={4}
                fillFrames={10}
                detail={<Chip label="succeeded" tone="pass" size={23} />}
              />
            </div>
            <div style={enter(frame, fps, 6)}>
              <PipelineStep
                label="12 tests passed"
                startAt={16}
                fillFrames={18}
                detail={<DotRow n={12} startAt={17} step={1} />}
              />
            </div>
            <div style={enter(frame, fps, 10)}>
              <PipelineStep
                label="deployed"
                startAt={36}
                fillFrames={10}
                detail={<Chip label="production" tone="brand" size={23} />}
              />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 24).opacity}>Everything looked fine.</Caption>
    </AbsoluteFill>
  );
};
