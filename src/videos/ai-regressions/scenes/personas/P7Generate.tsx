import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Stage} from '../../../../kit/Stack';
import {TestCaseCard} from '../../../../kit/TestCaseCard';
import {Caption, Heading} from '../../../../kit/Text';
import {sans} from '../../../../kit/fonts';
import {colors as C, grad, radius} from '../../../../theme';
import {PS} from '../../timelinePersonas';

type M = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/** Left column is the ordinary suite. Right column is what AI never reached. */
const NORMAL: {method: M; at: number; bars: number[]}[] = [
  {method: 'POST', at: 20, bars: [150, 92]},
  {method: 'GET', at: 25, bars: [128, 78]},
  {method: 'PUT', at: 30, bars: [140, 106]},
];
const EDGE: {method: M; at: number; bars: number[]}[] = [
  {method: 'DELETE', at: 35, bars: [112, 88]},
  {method: 'GET', at: 40, bars: [158, 72]},
  {method: 'PATCH', at: 45, bars: [124, 100]},
];

const ColHead: React.FC<{label: string; brand?: boolean; at: number}> = ({label, brand, at}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        ...enter(frame, fps, at, 12),
        fontFamily: sans,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: 1,
        color: brand ? C.onBrand : C.textDim,
        background: brand ? grad.brand : grad.neutral,
        border: brand ? 'none' : `1.5px solid ${C.codeStroke}`,
        borderRadius: radius.pill,
        padding: '9px 18px',
        textAlign: 'center',
        width: 'fit-content',
        margin: '0 auto',
      }}
    >
      {label}
    </div>
  );
};

export const P7Generate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = breathe(frame, fps, 1.5);
  return (
    <AbsoluteFill>
      <Camera duration={PS.generate} zoom={0.022} origin="50% 46%">
        <Stage gap={20}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>So it writes both kinds.</Heading>
          </div>

          <div
            style={{
              ...enter(frame, fps, 6),
              display: 'inline-flex',
              alignItems: 'center',
              gap: 13,
              padding: '11px 20px',
              borderRadius: radius.pill,
              background: 'rgba(247,107,28,0.07)',
              border: '1.5px solid rgba(247,107,28,0.32)',
              boxShadow: `0 0 ${8 + b * 18}px rgba(247,107,28,${0.12 + b * 0.16})`,
            }}
          >
            <Img src={staticFile('keploy-mark.svg')} style={{height: 30}} />
            <span style={{fontFamily: sans, fontSize: 24, fontWeight: 600, color: C.text}}>Keploy</span>
            <span
              style={{
                fontFamily: sans,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1.1,
                color: C.orangeDeep,
              }}
            >
              GENERATING
            </span>
          </div>

          <div style={{display: 'flex', gap: 20, alignItems: 'flex-start', marginTop: 2}}>
            <div style={{display: 'flex', flexDirection: 'column', gap: 13, width: 430}}>
              <ColHead label="NORMAL CASES" at={12} />
              {NORMAL.map((c, i) => (
                <TestCaseCard key={i} method={c.method} at={c.at} bars={c.bars} width={430} />
              ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 13, width: 430}}>
              <ColHead label="EDGE CASES" brand at={16} />
              {EDGE.map((c, i) => (
                <TestCaseCard key={i} method={c.method} at={c.at} bars={c.bars} width={430} />
              ))}
            </div>
          </div>

          <div style={{...enter(frame, fps, 68), marginTop: 6}}>
            <Chip label="AI wrote none of the right column" tone="fail" size={26} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 82).opacity}>
        The ones your users will actually hit.
      </Caption>
    </AbsoluteFill>
  );
};
