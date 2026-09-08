import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DotRow, PipelineStep} from '../../../../kit/Pipeline';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PW} from '../../timelinePersonasV3';

/**
 * 4.5s instead of 2.5s.
 *
 * The 40s cut ran this in two and a half seconds and a viewer said it was over
 * before it could be read. Every fill is longer, the twelve dots land at a pace
 * you can count, and the caption now arrives while the last step is still
 * finishing rather than after it.
 */
export const R1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PW.hook} zoom={0.03}>
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 6}}>
            <Heading size={58}>Your AI shipped the feature.</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
            <div style={enter(frame, fps, 4)}>
              <PipelineStep
                label="build"
                startAt={8}
                fillFrames={18}
                detail={<Chip label="succeeded" tone="pass" size={23} />}
              />
            </div>
            <div style={enter(frame, fps, 12)}>
              <PipelineStep
                label="12 tests passed"
                startAt={32}
                fillFrames={36}
                detail={<DotRow n={12} startAt={34} step={3} />}
              />
            </div>
            <div style={enter(frame, fps, 20)}>
              <PipelineStep
                label="deployed"
                startAt={74}
                fillFrames={18}
                detail={<Chip label="production" tone="brand" size={23} />}
              />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 66).opacity}>Everything looked fine.</Caption>
    </AbsoluteFill>
  );
};
