import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, settle} from '../lib/anim';
import {colors as C, grad, highlight, radius, shadow} from '../theme';
import {mono} from './fonts';

/** Moving highlight, so the skeletons read as "being generated" rather than "empty". */
const shimmer = (frame: number, offset: number) => ({
  background: grad.skeleton,
  backgroundSize: '320% 100%',
  backgroundPosition: `${((frame * 3 + offset) % 320) - 110}% 0`,
});

const Bar: React.FC<{w: number; frame: number; offset: number; h?: number}> = ({
  w,
  frame,
  offset,
  h = 13,
}) => (
  <span
    style={{
      display: 'block',
      width: w,
      height: h,
      borderRadius: 99,
      ...shimmer(frame, offset),
    }}
  />
);

/**
 * A generated test case, drawn as a skeleton. The method is the only real text:
 * the point is that Keploy is producing cases, not what any single one says.
 */
export const TestCaseCard: React.FC<{
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  at: number;
  bars?: number[];
  width?: number;
  /** grey badge instead of the brand ramp, for the column being de-emphasised */
  muted?: boolean;
}> = ({method, at, bars = [150, 96], width = 430, muted}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div
      style={{
        ...enter(frame, fps, at, 18),
        width,
        background: C.bg,
        border: `1.5px solid ${C.codeStroke}`,
        borderRadius: radius.md,
        boxShadow: `${shadow.soft}, ${highlight}`,
        padding: '18px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 16,
      }}
    >
      {/* one accent only: every method badge uses the brand ramp */}
      <span
        style={{
          fontFamily: mono,
          fontSize: 20,
          fontWeight: 500,
          letterSpacing: 0.6,
          color: muted ? C.textDim : C.onBrand,
          background: muted ? grad.neutral : grad.brand,
          borderRadius: radius.sm,
          padding: '8px 13px',
          flexShrink: 0,
          minWidth: 78,
          textAlign: 'center',
        }}
      >
        {method}
      </span>
      <span style={{display: 'flex', flexDirection: 'column', gap: 10, flex: 1, minWidth: 0}}>
        {bars.map((w, i) => (
          <Bar key={i} w={w} frame={frame} offset={i * 70 + at * 4} />
        ))}
      </span>
    </div>
  );
};

/** A test suite in the results list, styled after Keploy's own suite panel. */
export const SuiteRow: React.FC<{
  name: string;
  count: number;
  status: 'pass' | 'fail';
  width?: number;
  fontSize?: number;
}> = ({name, count, status, width = 900, fontSize = 30}) => {
  const fail = status === 'fail';
  return (
    <div
      style={{
        width,
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '17px 26px',
        borderRadius: radius.md,
        background: fail ? grad.failSoft : grad.neutral,
        border: `1.5px solid ${fail ? 'rgba(225,29,72,0.30)' : C.codeStroke}`,
        boxShadow: fail ? shadow.soft : undefined,
      }}
    >
      <span
        style={{
          width: 30,
          height: 30,
          borderRadius: 99,
          background: fail ? grad.fail : grad.pass,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: C.onBrand,
          fontFamily: mono,
          fontSize: 18,
          fontWeight: 500,
          flexShrink: 0,
        }}
      >
        {fail ? '✕' : '✓'}
      </span>
      <span style={{fontFamily: mono, fontSize, fontWeight: 500, color: C.text}}>{name}</span>
      <span style={{fontFamily: mono, fontSize: fontSize - 5, color: C.textFaint}}>({count})</span>
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: mono,
          fontSize: fontSize - 7,
          fontWeight: 500,
          letterSpacing: 1,
          color: fail ? C.exposed : C.masked,
        }}
      >
        {fail ? 'FAILED' : 'PASSED'}
      </span>
    </div>
  );
};

/**
 * Depth behind a card, so a column reads as a pile rather than a list.
 *
 * A viewer noted that the normal and edge columns carried equal weight, when
 * the point is that the edge pile is bigger and is the one that gets skipped.
 * Ghost cards offset behind the last real card say "and more of these" without
 * needing a number that would have to be sourced.
 */
export const CardStack: React.FC<{
  depth?: number;
  at: number;
  width?: number;
  /** height of the ghost slabs. Match the real card so the pile lines up. */
  cardHeight?: number;
  children: React.ReactNode;
}> = ({depth = 3, at, width = 430, cardHeight = 78, children}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <div style={{position: 'relative', width}}>
      {Array.from({length: depth}, (_, i) => {
        const k = settle(frame, fps, at + 6 + i * 5);
        const step = depth - i;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: step * 11,
              right: step * 11,
              top: step * 14,
              height: cardHeight,
              background: C.bg,
              border: `1.5px solid ${C.codeStroke}`,
              borderRadius: radius.md,
              opacity: k * (0.45 + i * 0.2),
              zIndex: i,
            }}
          />
        );
      })}
      <div style={{position: 'relative', zIndex: depth + 1}}>{children}</div>
    </div>
  );
};
