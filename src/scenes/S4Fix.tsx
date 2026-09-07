import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {Stage} from '../kit/Stack';
import {Caption, Heading} from '../kit/Text';
import {TestRow, type Status} from '../kit/TestRow';
import {D} from '../timeline';

/**
 * The setup for the reversal. You point out the gaps, the AI closes them,
 * everything goes green: which is exactly why the next scene lands.
 */
const ROWS: {text: string; flipAt: number}[] = [
  {text: 'books a visit for a valid pet', flipAt: 0},
  {text: 'vet already booked that slot', flipAt: 34},
  {text: 'visit date is in the past', flipAt: 52},
  {text: 'pet belongs to another owner', flipAt: 70},
  {text: 'clinic closed that day', flipAt: 88},
];

export const S4Fix: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const allGreen = frame >= 88;

  return (
    <AbsoluteFill>
      <Camera duration={D.s4Fix} zoom={0.028}>
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 4}}>
            <Heading size={52}>Ask it to cover them, and it will.</Heading>
          </div>
          <div style={{display: 'flex', flexDirection: 'column', gap: 13, width: 856}}>
            {ROWS.map((r) => {
              const status: Status = frame >= r.flipAt ? 'pass' : 'unwritten';
              return (
                <div key={r.text} style={enter(frame, fps, 0)}>
                  <TestRow text={r.text} status={status} fontSize={30} />
                </div>
              );
            })}
          </div>
          <div style={{...enter(frame, fps, 104), marginTop: 12}}>
            <Chip label={allGreen ? 'slow, and never complete' : 'writing tests…'} tone={allGreen ? 'fail' : 'neutral'} size={28} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 118).opacity}>
        Every box ticked. You think you are good to go.
      </Caption>
    </AbsoluteFill>
  );
};
