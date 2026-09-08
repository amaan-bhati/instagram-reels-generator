import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DotRow, PipelineStep} from '../../../../kit/Pipeline';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PZ} from '../../timelinePersonasV6';

/**
 * 5.5s now. Slowed twice: 2.5s was unreadable, and 4.5s was still called too
 * fast to take in. Every fill is longer again and the twelve dots land on a
 * four frame beat instead of three.
 *
 * The 40s cut ran this in two and a half seconds and a viewer said it was over
 * before it could be read. Every fill is longer, the twelve dots land at a pace
 * you can count, and the caption now arrives while the last step is still
 * finishing rather than after it.
 */
export const U1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PZ.hook} zoom={0.03}>
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 6}}>
            <Heading size={58}>Your AI shipped the feature.</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
            <div style={enter(frame, fps, 4)}>
              <PipelineStep
                label="build"
                startAt={10}
                fillFrames={22}
                detail={<Chip label="succeeded" tone="pass" size={23} />}
              />
            </div>
            <div style={enter(frame, fps, 12)}>
              <PipelineStep
                label="12 tests passed"
                startAt={40}
                fillFrames={44}
                detail={<DotRow n={12} startAt={42} step={4} />}
              />
            </div>
            <div style={enter(frame, fps, 20)}>
              <PipelineStep
                label="deployed"
                startAt={92}
                fillFrames={22}
                detail={<Chip label="production" tone="brand" size={23} />}
              />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 80).opacity}>Everything looked fine.</Caption>
    </AbsoluteFill>
  );
};
