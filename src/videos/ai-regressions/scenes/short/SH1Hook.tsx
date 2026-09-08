import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DotRow, PipelineStep} from '../../../../kit/Pipeline';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {S} from '../../timelineShort';

/** Three steps instead of four, so the whole setup lands inside 3.5s. */
export const SH1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={S.hook} zoom={0.03}>
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 6}}>
            <Heading size={58}>Your AI shipped the feature.</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
            <div style={enter(frame, fps, 4)}>
              <PipelineStep
                label="build"
                startAt={8}
                fillFrames={12}
                detail={<Chip label="succeeded" tone="pass" size={23} />}
              />
            </div>
            <div style={enter(frame, fps, 10)}>
              <PipelineStep
                label="12 tests passed"
                startAt={22}
                fillFrames={26}
                detail={<DotRow n={12} startAt={24} step={2} />}
              />
            </div>
            <div style={enter(frame, fps, 16)}>
              <PipelineStep
                label="deployed"
                startAt={50}
                fillFrames={14}
                detail={<Chip label="production" tone="brand" size={23} />}
              />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 60).opacity}>Everything looked fine.</Caption>
    </AbsoluteFill>
  );
};
