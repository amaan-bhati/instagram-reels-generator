import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, stagger} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {Stage} from '../kit/Stack';
import {Caption, Heading} from '../kit/Text';
import {TestRow, type Status} from '../kit/TestRow';
import {colors as C} from '../theme';
import {D} from '../timeline';

/** The one test it wrote, then everything it never thought of. */
const ROWS: {text: string; status: Status; at: number}[] = [
  {text: 'applies 10% off a valid code', status: 'pass', at: 14},
  {text: 'code already expired', status: 'unwritten', at: 62},
  {text: 'two codes stacked together', status: 'unwritten', at: 70},
  {text: 'discount larger than the cart', status: 'unwritten', at: 78},
  {text: 'code valid, cart now empty', status: 'unwritten', at: 86},
];

export const S3Blind: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s3Blind} zoom={0.028}>
        <Stage gap={26}>
          <div style={{...enter(frame, fps, 0), marginBottom: 6}}>
            <Heading size={56}>The tests it wrote for itself</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 14, width: 856}}>
            {ROWS.map((r, i) => (
              <div key={r.text} style={enter(frame, fps, r.at + stagger(i, 0))}>
                <TestRow text={r.text} status={r.status} fontSize={31} />
              </div>
            ))}
          </div>
          <div
            style={{
              ...enter(frame, fps, 122),
              marginTop: 16,
              opacity: interpolate(frame, [122, 146], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
            }}
          >
            <Chip label="happy path only" tone="orange" size={30} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 60).opacity}>
        <span style={{color: C.text}}>AI writes the happy path.</span>
        <br />
        <span style={{color: C.orangeDeep}}>Your users find the rest.</span>
      </Caption>
    </AbsoluteFill>
  );
};
