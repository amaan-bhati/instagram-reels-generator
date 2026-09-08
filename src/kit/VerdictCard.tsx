import React from 'react';
import {interpolate, useCurrentFrame} from 'remotion';
import {colors as C, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

/**
 * Keploy's verdict panel: modelled on the real product UI:
 * breadcrumb, red explanation panel, `Buggy` badge, AI confidence score.
 *
 * The confidence number counts up so the eye lands on it.
 */
export const VerdictCard: React.FC<{
  suite: string;
  step: string;
  explanation: React.ReactNode;
  badge?: string;
  confidence?: number;
  /** frame the confidence counter starts */
  countAt?: number;
  width?: number;
}> = ({suite, step, explanation, badge = 'Buggy', confidence = 95, countAt = 0, width = 900}) => {
  const frame = useCurrentFrame();
  const n = Math.round(
    interpolate(frame, [countAt, countAt + 26], [0, confidence], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );

  return (
    <div style={{width, display: 'flex', flexDirection: 'column', gap: 20}}>
      {/* breadcrumb */}
      <div style={{display: 'flex', alignItems: 'center', gap: 14, paddingLeft: 4}}>
        <span style={{fontFamily: sans, fontSize: 30, fontWeight: 600, color: C.orangeDeep}}>{suite}</span>
        <span style={{fontFamily: sans, fontSize: 30, color: C.textFaint}}>/</span>
        <span style={{fontFamily: sans, fontSize: 30, fontWeight: 600, color: C.exposed}}>{step}</span>
      </div>

      {/* the red panel */}
      <div
        style={{
          background: 'rgba(254,226,226,0.55)',
          border: `1.5px solid rgba(220,38,38,0.28)`,
          borderRadius: radius.lg,
          boxShadow: `${shadow.soft}, ${highlight}`,
          padding: '32px 34px 30px',
          display: 'flex',
          flexDirection: 'column',
          gap: 26,
        }}
      >
        <div
          style={{
            fontFamily: sans,
            fontSize: 30,
            fontWeight: 500,
            lineHeight: 1.5,
            color: '#B3323C',
          }}
        >
          {explanation}
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: 20}}>
          <span
            style={{
              fontFamily: sans,
              fontSize: 28,
              fontWeight: 700,
              color: C.exposed,
              background: C.bg,
              border: `1.5px solid rgba(220,38,38,0.42)`,
              borderRadius: radius.sm,
              padding: '12px 24px',
            }}
          >
            {badge}
          </span>
          <span style={{fontFamily: sans, fontSize: 27, fontWeight: 500, color: '#B3323C'}}>
            (AI Confidence: {n}%)
          </span>
        </div>
      </div>
    </div>
  );
};

/** The failing assertion, styled like Keploy's assertion row. */
export const AssertionRow: React.FC<{got: string; want: string; width?: number}> = ({
  got,
  want,
  width = 900,
}) => (
  <div
    style={{
      width,
      background: C.bgDeep,
      border: `1.5px solid ${C.codeStroke}`,
      borderRadius: radius.md,
      padding: '22px 28px',
      fontFamily: sans,
      fontSize: 26,
      fontWeight: 500,
      color: C.text,
      display: 'flex',
      alignItems: 'center',
      gap: 11,
      whiteSpace: 'nowrap',
    }}
  >
    <span style={{fontFamily: mono, color: C.textDim}}>1.</span>
    <span>Response has STATUS CODE</span>
    <span style={{fontFamily: mono, fontWeight: 700, color: C.exposed}}>{got}</span>
    <span>Expected STATUS CODE</span>
    <span style={{fontFamily: mono, fontWeight: 700, color: C.masked}}>{want}</span>
  </div>
);
