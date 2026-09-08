import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {DotRow} from '../../../../kit/Pipeline';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading, Sub} from '../../../../kit/Text';
import {TestRow} from '../../../../kit/TestRow';
import {colors as C} from '../../../../theme';
import {BR} from '../../timelineBridge';

/**
 * Names the miss in the same unit the hook used. Scene 1 filled twelve green
 * dots as a win; here the identical twelve dots come back as the problem,
 * with what they never covered listed underneath.
 */
const MISSED = [
  'vet already booked that slot',
  'visit date is in the past',
  'pet belongs to another owner',
];

export const B3Gap: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={BR.gap} zoom={0.026}>
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 4}}>
            <Heading size={54}>It wrote 12 tests.</Heading>
          </div>

          <div style={{...enter(frame, fps, 6), marginBottom: 6}}>
            <DotRow n={12} startAt={8} step={2} size={26} />
          </div>

          <div style={{...enter(frame, fps, 32), marginBottom: 2}}>
            <Sub size={30} color={C.textFaint}>
              and never wrote these
            </Sub>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 12, width: 830}}>
            {MISSED.map((t, i) => (
              <div key={t} style={enter(frame, fps, 40 + i * 6)}>
                <TestRow text={t} status="unwritten" fontSize={29} />
              </div>
            ))}
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 66).opacity}>
        None of the twelve were the edge cases.
      </Caption>
    </AbsoluteFill>
  );
};
