import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {CardStack, TestCaseCard} from '../../../../kit/TestCaseCard';
import {Caption, Heading} from '../../../../kit/Text';
import {sans} from '../../../../kit/fonts';
import {colors as C, grad, radius} from '../../../../theme';
import {PX} from '../../timelinePersonasV4';

type M = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * One column, not two.
 *
 * v2 put normal and edge side by side, which read as two separate lists of
 * things. They are not two lists: they are one suite, and the edge half is the
 * part that normally does not get written. Stacking them vertically says that.
 * Normal comes first at full width, edge follows directly underneath, and the
 * pile below the second label is visibly longer than the one above it.
 *
 * The "AI wrote none of these" note moved onto the EDGE CASES label, because
 * with a single column there is no longer a "right column" to point at.
 */
const NORMAL: {method: M; at: number; bars: number[]}[] = [
  {method: 'POST', at: 24, bars: [300, 186]},
  {method: 'GET', at: 32, bars: [262, 150]},
];
const EDGE: {method: M; at: number; bars: number[]}[] = [
  {method: 'PUT', at: 58, bars: [322, 208]},
  {method: 'DELETE', at: 68, bars: [246, 194]},
  {method: 'GET', at: 78, bars: [348, 162]},
  {method: 'PATCH', at: 88, bars: [284, 224]},
];

const SectionLabel: React.FC<{label: string; note?: string; brand?: boolean; at: number}> = ({
  label,
  note,
  brand,
  at,
}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        ...enter(frame, fps, at, 12),
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        marginBottom: 2,
      }}
    >
      <span
        style={{
          fontFamily: sans,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: 1,
          color: brand ? C.onBrand : C.textDim,
          background: brand ? grad.brand : grad.neutral,
          border: brand ? 'none' : `1.5px solid ${C.codeStroke}`,
          borderRadius: radius.pill,
          padding: '9px 18px',
          opacity: brand ? 1 : 0.8,
        }}
      >
        {label}
      </span>
      {note ? (
        <span style={{fontFamily: sans, fontSize: 24, fontWeight: 600, color: C.exposed}}>
          {note}
        </span>
      ) : null}
    </div>
  );
};

export const S7Generate: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = breathe(frame, fps, 1.5);
  return (
    <AbsoluteFill>
      <Camera duration={PX.generate} zoom={0.018} origin="50% 44%">
        <Stage gap={18}>
          <div style={{...enter(frame, fps, 0), marginBottom: 0}}>
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

          <div style={{width: 900, display: 'flex', flexDirection: 'column', gap: 11, marginTop: 4}}>
            <SectionLabel label="NORMAL CASES" at={16} />
            {NORMAL.map((c, i) => (
              <TestCaseCard key={`n${i}`} method={c.method} at={c.at} bars={c.bars} width={900} muted />
            ))}

            <div style={{height: 10}} />

            <SectionLabel label="EDGE CASES" note="AI wrote none of these" brand at={48} />
            {EDGE.map((c, i) =>
              i === EDGE.length - 1 ? (
                <CardStack key={`e${i}`} depth={3} at={c.at} width={900} cardHeight={72}>
                  <TestCaseCard method={c.method} at={c.at} bars={c.bars} width={900} />
                </CardStack>
              ) : (
                <TestCaseCard key={`e${i}`} method={c.method} at={c.at} bars={c.bars} width={900} />
              ),
            )}
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 122).opacity}>
        The half nobody gets around to.
      </Caption>
    </AbsoluteFill>
  );
};
