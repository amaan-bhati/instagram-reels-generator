import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {RecDot} from '../kit/RecDot';
import {Stage} from '../kit/Stack';
import {Terminal, type TermLine} from '../kit/Terminal';
import {Caption, Heading} from '../kit/Text';
import {D} from '../timeline';

/**
 * Motif B — the oracle. Real traffic off the wire becomes the baseline.
 * DESIGN §0.4: these lines are MODELLED on Keploy's CLI, not captured.
 * Replace with a real screen recording before shipping.
 */
const LINES: TermLine[] = [
  {text: 'keploy record -c "npm start"', tone: 'cmd'},
  {text: 'capturing traffic on :8080  · eBPF', tone: 'dim'},
  {text: '  ✓ captured   GET  /api/cart', tone: 'pass'},
  {text: '  ✓ captured   POST /api/checkout', tone: 'pass'},
  {text: '  ✓ captured   GET  /api/cart?code=EXPIRED', tone: 'pass'},
  {text: '  4 test cases + 6 mocks  ->  ./keploy', tone: 'orange'},
];

// One line lands roughly every 16 frames after the command is typed.
const REVEAL_AT = [0, 20, 40, 58, 76, 100];

export const S5Record: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const visible = REVEAL_AT.filter((f) => frame >= f + 12).length;

  return (
    <AbsoluteFill>
      <Camera duration={D.s5Record} zoom={0.03}>
        <Stage gap={30}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={54}>So record what actually happens.</Heading>
          </div>
          <div style={{...enter(frame, fps, 8), display: 'flex', gap: 14, alignItems: 'center'}}>
            <RecDot />
            <Chip label="no code changes" tone="neutral" size={26} />
          </div>
          <div style={enter(frame, fps, 12)}>
            <Terminal
              title="keploy"
              lines={LINES}
              visible={visible}
              width={900}
              fontSize={27}
              badge={<Chip label="eBPF" tone="orange" size={22} code />}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 118).opacity}>
        Real requests. Real payloads.<br />The edge cases AI never imagined.
      </Caption>
    </AbsoluteFill>
  );
};
