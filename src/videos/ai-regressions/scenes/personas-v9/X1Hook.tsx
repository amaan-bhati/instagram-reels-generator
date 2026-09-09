import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DotRow, PipelineStep} from '../../../../kit/Pipeline';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PV9} from '../../timelinePersonasV9';

/**
 * Slowed a third time, and this pass is about the animation rather than the
 * scene length. The scene was already 6.37s but every bar finished filling by
 * frame 142 and then nothing moved for fifty frames, which reads as fast
 * followed by dead air. The fills now run to frame 150 and the twelve dots
 * land on a five frame beat, so the motion lasts as long as the beat does.
 *
 * The 40s cut ran this in two and a half seconds and a viewer said it was over
 * before it could be read. Every fill is longer, the twelve dots land at a pace
 * you can count, and the caption now arrives while the last step is still
 * finishing rather than after it.
 */
export const X1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PV9.hook} zoom={0.03}>
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 6}}>
            <Heading size={58}>Your AI shipped the feature.</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 15}}>
            <div style={enter(frame, fps, 4)}>
              <PipelineStep
                label="build"
                startAt={12}
                fillFrames={30}
                detail={<Chip label="succeeded" tone="pass" size={23} />}
              />
            </div>
            <div style={enter(frame, fps, 12)}>
              <PipelineStep
                label="12 tests passed"
                startAt={50}
                fillFrames={60}
                detail={<DotRow n={12} startAt={52} step={5} />}
              />
            </div>
            <div style={enter(frame, fps, 20)}>
              <PipelineStep
                label="deployed"
                startAt={122}
                fillFrames={28}
                detail={<Chip label="production" tone="brand" size={23} />}
              />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 116).opacity}>Everything looked fine.</Caption>
    </AbsoluteFill>
  );
};
