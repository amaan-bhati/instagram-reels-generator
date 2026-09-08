import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Compare} from '../../../../kit/Compare';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {H2} from '../../timelineHttps2';

/** Same binary, same flags. The only variable is the scheme. */
export const V2Confusion: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={H2.confusion} zoom={0.026}>
        <Stage gap={28}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>Same app. Same command.</Heading>
          </div>
          <div style={enter(frame, fps, 12)}>
            <Compare
              left={{
                heading: 'OVER HTTP',
                tone: 'pass',
                rows: ['tests   4', 'mocks   6'],
              }}
              right={{
                heading: 'OVER HTTPS',
                tone: 'fail',
                rows: ['tests   0', 'mocks   6'],
              }}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 48).opacity}>
        Only the scheme changed.
      </Caption>
    </AbsoluteFill>
  );
};
