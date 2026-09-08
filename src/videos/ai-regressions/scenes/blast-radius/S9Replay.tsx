import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {ProxyDiagram} from '../../../../kit/ProxyDiagram';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {D} from '../../timeline';

/**
 * The testing phase. Same requests go back in, but now Keploy answers from the
 * captured mocks: the real database and mail API are never touched. Anything
 * the new build returns differently is drift.
 */
export const S9Replay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s9Replay} zoom={0.026} origin="50% 46%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>Then it replays everything again.</Heading>
          </div>

          <div style={enter(frame, fps, 10)}>
            <ProxyDiagram
              phase="replay"
              app="PetClinic API"
              route="POST /api/visits  ·  replay"
              deps={['PostgreSQL', 'Redis', 'Mail API']}
              flowAt={24}
            />
          </div>

          <div style={{display: 'flex', gap: 13, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 96)}>
              <Chip label="mocked dependencies" tone="orange" size={26} />
            </div>
            <div style={enter(frame, fps, 102)}>
              <Chip label="same requests" tone="neutral" size={26} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 116).opacity}>
        Any drift shows up instantly.
      </Caption>
    </AbsoluteFill>
  );
};
