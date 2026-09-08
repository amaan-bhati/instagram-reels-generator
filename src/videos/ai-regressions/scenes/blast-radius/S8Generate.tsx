import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Stage} from '../../../../kit/Stack';
import {TestCaseCard} from '../../../../kit/TestCaseCard';
import {Caption, Heading} from '../../../../kit/Text';
import {colors as C, radius} from '../../../../theme';
import {sans} from '../../../../kit/fonts';
import {D} from '../../timeline';

/**
 * Generation, shown as generation. Keploy is still on the wire above; below it,
 * test cases materialise as skeleton cards. The method is the only real text,
 * because the point is the volume being produced, not any single case.
 */
const CASES: {method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'; at: number; bars: number[]}[] = [
  {method: 'POST', at: 24, bars: [168, 104]},
  {method: 'GET', at: 30, bars: [140, 86]},
  {method: 'PUT', at: 36, bars: [152, 118]},
  {method: 'DELETE', at: 42, bars: [124, 96]},
  {method: 'GET', at: 48, bars: [176, 80]},
  {method: 'PATCH', at: 54, bars: [136, 110]},
];

export const S8Generate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = breathe(frame, fps, 1.5);

  return (
    <AbsoluteFill>
      <Camera duration={D.s8Generate} zoom={0.026} origin="50% 46%">
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>
              Then it writes the cases
              <br />
              AI never got to.
            </Heading>
          </div>

          {/* still on the wire, still capturing */}
          <div
            style={{
              ...enter(frame, fps, 8),
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 22px',
              borderRadius: radius.pill,
              background: 'rgba(247,107,28,0.07)',
              border: '1.5px solid rgba(247,107,28,0.32)',
              boxShadow: `0 0 ${8 + b * 18}px rgba(247,107,28,${0.12 + b * 0.16})`,
            }}
          >
            <Img src={staticFile('keploy-mark.svg')} style={{height: 34}} />
            <span style={{fontFamily: sans, fontSize: 26, fontWeight: 600, color: C.text}}>
              Keploy
            </span>
            <span
              style={{
                fontFamily: sans,
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: 1.1,
                color: C.orangeDeep,
              }}
            >
              GENERATING
            </span>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '430px 430px',
              gap: 18,
              marginTop: 4,
            }}
          >
            {CASES.map((c, i) => (
              <TestCaseCard key={i} method={c.method} at={c.at} bars={c.bars} width={430} />
            ))}
          </div>

          <div style={{...enter(frame, fps, 100), marginTop: 8}}>
            <Chip label="edge cases included" tone="brand" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 118).opacity}>
        The cases nobody ever wrote.
      </Caption>
    </AbsoluteFill>
  );
};
