import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Compare} from '../../../../kit/Compare';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {D} from '../../timeline';

/**
 * AI can only imagine inputs. Real users send other things entirely 
 * and the list of ways they differ has no end, which is the point of the
 * trailing "…" row and the chip under it.
 */
export const S6Users: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s6Users} zoom={0.028}>
        <Stage gap={26}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={52}>
              And it can only test
              <br />
              inputs it imagined.
            </Heading>
          </div>
          <div style={enter(frame, fps, 12)}>
            <Compare
              left={{
                heading: 'WHAT AI TESTED',
                tone: 'pass',
                rows: ['at:     "2026-03-14"', 'petId:  7', 'locale: en-US', 'city:   (none)', ' '],
              }}
              right={{
                heading: 'WHAT USERS SEND',
                tone: 'fail',
                rows: [
                  'at:     "14/03/2026"',
                  'petId:  null',
                  'locale: en-IN',
                  'city:   "Bengaluru"',
                  '…',
                ],
              }}
            />
          </div>
          <div style={{...enter(frame, fps, 56), marginTop: 8}}>
            <Chip label="+ every case nobody thought to write down" tone="fail" size={28} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 74).opacity}>
        Your users are not a happy path.
      </Caption>
    </AbsoluteFill>
  );
};
