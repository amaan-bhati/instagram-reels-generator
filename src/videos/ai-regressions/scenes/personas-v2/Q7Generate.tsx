import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Stage} from '../../../../kit/Stack';
import {CardStack, TestCaseCard} from '../../../../kit/TestCaseCard';
import {Caption, Heading} from '../../../../kit/Text';
import {sans} from '../../../../kit/fonts';
import {colors as C, grad, radius} from '../../../../theme';
import {PV} from '../../timelinePersonasV2';

type M = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * The two columns no longer carry equal weight, which was the note.
 *
 * Normal is two muted cards with grey badges: it is the part everyone already
 * has. Edge is four cards with the brand ramp and ghost cards stacked behind
 * the last one, so the column is visibly taller and visibly unfinished. The
 * asymmetry is the argument: the bigger pile is also the one that gets skipped.
 *
 * No count on the edge stack on purpose. A number would be an unsourced stat;
 * the depth behind the last card says "and more" without claiming how many.
 */
const NORMAL: {method: M; at: number; bars: number[]}[] = [
  {method: 'POST', at: 26, bars: [140, 86]},
  {method: 'GET', at: 32, bars: [122, 72]},
];
const EDGE: {method: M; at: number; bars: number[]}[] = [
  {method: 'PUT', at: 40, bars: [152, 104]},
  {method: 'DELETE', at: 48, bars: [118, 92]},
  {method: 'GET', at: 56, bars: [164, 78]},
  {method: 'PATCH', at: 64, bars: [134, 110]},
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
        opacity: brand ? 1 : 0.8,
      }}
    >
      {label}
    </div>
  );
};

export const Q7Generate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = breathe(frame, fps, 1.5);
  return (
    <AbsoluteFill>
      <Camera duration={PV.generate} zoom={0.02} origin="50% 44%">
        <Stage gap={18}>
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
              background: 'rgba(232,89,14,0.07)',
              border: '1.5px solid rgba(232,89,14,0.34)',
              boxShadow: `0 0 ${8 + b * 18}px rgba(232,89,14,${0.12 + b * 0.16})`,
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
              <ColHead label="NORMAL CASES" at={16} />
              {NORMAL.map((c, i) => (
                <TestCaseCard key={i} method={c.method} at={c.at} bars={c.bars} width={430} muted />
              ))}
            </div>
            <div style={{display: 'flex', flexDirection: 'column', gap: 13, width: 430}}>
              <ColHead label="EDGE CASES" brand at={20} />
              {EDGE.map((c, i) =>
                i === EDGE.length - 1 ? (
                  <CardStack key={i} depth={3} at={c.at} width={430}>
                    <TestCaseCard method={c.method} at={c.at} bars={c.bars} width={430} />
                  </CardStack>
                ) : (
                  <TestCaseCard key={i} method={c.method} at={c.at} bars={c.bars} width={430} />
                ),
              )}
            </div>
          </div>

          <div style={{...enter(frame, fps, 110), marginTop: 26}}>
            <Chip label="AI wrote none of the right column" tone="fail" size={26} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 130).opacity}>
        The pile nobody gets around to.
      </Caption>
    </AbsoluteFill>
  );
};
