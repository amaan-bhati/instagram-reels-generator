import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {ProxyDiagram} from '../../../../kit/ProxyDiagram';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {S} from '../../timelineShort';

export const SH5Replay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={S.replay} zoom={0.026} origin="50% 46%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>Then replays every one of them.</Heading>
          </div>
          <div style={enter(frame, fps, 8)}>
            <ProxyDiagram
              phase="replay"
              app="PetClinic API"
              route="POST /api/visits  ·  replay"
              deps={['PostgreSQL', 'Redis', 'Mail API']}
              flowAt={20}
            />
          </div>
          <div style={{display: 'flex', gap: 13, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 92)}>
              <Chip label="mocked dependencies" tone="orange" size={26} />
            </div>
            <div style={enter(frame, fps, 98)}>
              <Chip label="every endpoint, not just the new one" tone="neutral" size={26} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 114).opacity}>
        Any drift shows up instantly.
      </Caption>
    </AbsoluteFill>
  );
};
