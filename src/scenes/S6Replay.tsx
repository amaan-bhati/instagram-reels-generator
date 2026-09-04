import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {CodeCard} from '../kit/CodeCard';
import {Stage} from '../kit/Stack';
import {Terminal, type TermLine} from '../kit/Terminal';
import {Caption, Heading} from '../kit/Text';
import {D} from '../timeline';

/** DESIGN §0.4: modelled on Keploy's CLI, not a capture. Swap before shipping. */
const LINES: TermLine[] = [
  {text: 'keploy test -c "npm start"', tone: 'cmd'},
  {text: 'replaying 4 recorded test cases', tone: 'dim'},
  {text: '  ✓ PASSED   POST /api/checkout', tone: 'pass'},
  {text: '  ✕ FAILED   GET  /api/cart', tone: 'fail'},
];

const REVEAL_AT = [0, 18, 36, 54];

const DIFF = [
  'expected   body.total        4200',
  'actual     body.total        <missing>',
  'cause      response now nests under "data"',
];

export const S6Replay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const visible = REVEAL_AT.filter((f) => frame >= f + 10).length;

  return (
    <AbsoluteFill>
      <Camera duration={D.s6Replay} zoom={0.034} origin="50% 42%">
        <Stage gap={26}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>Then replay it against the new build.</Heading>
          </div>

          <div style={enter(frame, fps, 8)}>
            <Terminal title="keploy" lines={LINES} visible={visible} width={900} fontSize={27} />
          </div>

          <div style={enter(frame, fps, 84)}>
            <CodeCard
              title="report · GET /api/cart"
              chip={<Chip label="regression" tone="fail" size={22} />}
              lines={DIFF}
              width={900}
              fontSize={27}
              lineNumbers={false}
              tints={[
                {line: 0, tone: 'pass'},
                {line: 1, tone: 'fail'},
                {line: 2, tone: 'orange'},
              ]}
              marks={[
                {line: 1, match: '<missing>', tone: 'fail'},
                {line: 2, match: '"data"', tone: 'orange'},
              ]}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 128).opacity}>
        The regression surfaces —<br />on the exact field that moved.
      </Caption>
    </AbsoluteFill>
  );
};
