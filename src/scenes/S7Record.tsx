import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {ProxyDiagram} from '../kit/ProxyDiagram';
import {Stage} from '../kit/Stack';
import {Caption, Heading} from '../kit/Text';
import {D} from '../timeline';

/**
 * The recording phase, drawn rather than narrated. The app's real dependency
 * calls pass through Keploy on the way out; Keploy captures both sides and
 * turns them into mocks, and turns the incoming requests into test cases.
 */
export const S7Record: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s7Record} zoom={0.026} origin="50% 46%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>So Keploy captures everything.</Heading>
          </div>

          <div style={enter(frame, fps, 10)}>
            <ProxyDiagram
              phase="record"
              app="PetClinic API"
              route="POST /api/visits  ·  201"
              deps={['PostgreSQL', 'Redis', 'Mail API']}
              flowAt={26}
            />
          </div>

          <div style={{display: 'flex', gap: 13, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 116)}>
              <Chip label="requests → test cases" tone="pass" size={26} />
            </div>
            <div style={enter(frame, fps, 122)}>
              <Chip label="dependency calls → mocks" tone="orange" size={26} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 138).opacity}>
        It tracks what AI can break, before it does.
      </Caption>
    </AbsoluteFill>
  );
};
