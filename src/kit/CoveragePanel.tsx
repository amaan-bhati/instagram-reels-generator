import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {colors as C, grad, highlight, radius, shadow} from '../theme';
import {sans} from './fonts';

export type CoverageRow = {text: string; covered: boolean};

/**
 * Two of these side by side carry the whole argument: the same list of things
 * that can go wrong, with one column able to cover half of it and the other
 * able to cover all of it.
 *
 * DESIGN §6: covered state is colour AND glyph AND the row's own text weight,
 * never colour alone.
 */
export const CoveragePanel: React.FC<{
  heading: string;
  tone: 'neutral' | 'brand';
  rows: CoverageRow[];
  startAt: number;
  width?: number;
  fontSize?: number;
}> = ({heading, tone, rows, startAt, width = 435, fontSize = 25}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const brand = tone === 'brand';

  return (
    <div
      style={{
        width,
        background: C.bg,
        border: `2px solid ${brand ? 'rgba(247,107,28,0.42)' : C.codeStroke}`,
        borderRadius: radius.lg,
        boxShadow: brand ? `${shadow.orange}, ${highlight}` : `${shadow.soft}, ${highlight}`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: brand ? grad.brand : grad.neutral,
          borderBottom: `1.5px solid ${brand ? 'transparent' : C.codeStroke}`,
          padding: '17px 22px',
          fontFamily: sans,
          fontSize: 24,
          fontWeight: 700,
          letterSpacing: 0.5,
          color: brand ? C.onBrand : C.textDim,
        }}
      >
        {heading}
      </div>
      <div style={{padding: '18px 20px', display: 'flex', flexDirection: 'column', gap: 13}}>
        {rows.map((r, i) => (
          <div
            key={r.text}
            style={{
              ...enter(frame, fps, startAt + i * 6, 14),
              display: 'flex',
              alignItems: 'center',
              gap: 13,
            }}
          >
            <span
              style={{
                width: 26,
                height: 26,
                borderRadius: 99,
                flexShrink: 0,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: r.covered ? grad.pass : 'transparent',
                border: r.covered ? 'none' : `2.5px solid ${C.dot}`,
                color: C.onBrand,
                fontFamily: sans,
                fontSize: 16,
                fontWeight: 700,
              }}
            >
              {r.covered ? '✓' : ''}
            </span>
            <span
              style={{
                fontFamily: sans,
                fontSize,
                fontWeight: r.covered ? 600 : 500,
                color: r.covered ? C.text : C.textFaint,
                lineHeight: 1.28,
              }}
            >
              {r.text}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
