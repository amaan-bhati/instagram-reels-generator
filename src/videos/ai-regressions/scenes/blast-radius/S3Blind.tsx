import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {TestRow, type Status} from '../../../../kit/TestRow';
import {colors as C} from '../../../../theme';
import {D} from '../../timeline';

/** The one test it wrote, then everything it never thought of. */
const ROWS: {text: string; status: Status; at: number}[] = [
  {text: 'books a visit for a valid pet', status: 'pass', at: 12},
  {text: 'vet already booked that slot', status: 'unwritten', at: 46},
  {text: 'visit date is in the past', status: 'unwritten', at: 54},
  {text: 'pet belongs to another owner', status: 'unwritten', at: 62},
  {text: 'clinic closed that day', status: 'unwritten', at: 70},
];

export const S3Blind: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s3Blind} zoom={0.028}>
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 4}}>
            <Heading size={52}>Then AI wrote the tests for itself.</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 13, width: 856}}>
            {ROWS.map((r) => (
              <div key={r.text} style={enter(frame, fps, r.at)}>
                <TestRow text={r.text} status={r.status} fontSize={30} />
              </div>
            ))}
          </div>
          <div style={{...enter(frame, fps, 88), marginTop: 12}}>
            <Chip label="the rest ships to production" tone="fail" size={28} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 56).opacity}>
        <span style={{color: C.text}}>AI writes the happy path only.</span>
        <br />
        <span style={{color: C.orangeDeep}}>Your users find the rest.</span>
      </Caption>
    </AbsoluteFill>
  );
};
