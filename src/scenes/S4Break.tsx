import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {CodeCard} from '../kit/CodeCard';
import {Stage} from '../kit/Stack';
import {Caption, Heading} from '../kit/Text';
import {TestRow} from '../kit/TestRow';
import {D} from '../timeline';

/**
 * The refactor nobody asked for: the AI tidied the response shape of an OLD
 * endpoint while adding the new feature. Its own new test still passes.
 */
const LINES = [
  '// GET /api/cart  — before',
  '{ "total": 4200, "items": 3 }',
  '',
  '// GET /api/cart  — after the cleanup',
  '{ "data": { "total": 4200, "items": 3 } }',
];

export const S4Break: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s4Break} zoom={0.032}>
        <Stage gap={28}>
          <div style={{...enter(frame, fps, 0), marginBottom: 4}}>
            <Heading size={52}>
              It also &ldquo;tidied up&rdquo;
              <br />a feature you didn&rsquo;t ask about.
            </Heading>
          </div>

          <div style={enter(frame, fps, 20)}>
            <CodeCard
              title="cart.controller.js"
              chip={<Chip label="refactored" tone="orange" size={22} />}
              lines={LINES}
              width={900}
              fontSize={27}
              lineNumbers={false}
              tints={[{line: 1, tone: 'pass'}, {line: 4, tone: 'orange'}]}
              marks={[{line: 4, match: '"data"', tone: 'orange'}]}
            />
          </div>

          <div style={{...enter(frame, fps, 62), width: 856, marginTop: 8}}>
            <TestRow text="GET /api/cart" status="untested" fontSize={31} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 96).opacity}>
        Nothing failed. Nothing was watching.
      </Caption>
    </AbsoluteFill>
  );
};
