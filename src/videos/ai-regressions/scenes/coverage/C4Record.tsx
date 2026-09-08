import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {ProxyDiagram} from '../../../../kit/ProxyDiagram';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {CV} from '../../timelineCoverage';

export const C4Record: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={CV.record} zoom={0.024} origin="50% 46%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>So Keploy captures everything.</Heading>
          </div>
          <div style={enter(frame, fps, 4)}>
            <ProxyDiagram
              phase="record"
              app="PetClinic API"
              route="POST /api/visits  ·  201"
              deps={['PostgreSQL', 'Redis', 'Mail API']}
              flowAt={16}
            />
          </div>
          <div style={{display: 'flex', gap: 13, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 86)}>
              <Chip label="requests become test cases" tone="pass" size={26} />
            </div>
            <div style={enter(frame, fps, 91)}>
              <Chip label="dependency calls become mocks" tone="orange" size={26} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 100).opacity}>
        Your real traffic becomes the baseline.
      </Caption>
    </AbsoluteFill>
  );
};
