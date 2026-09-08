import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {settle} from '../lib/anim';
import {colors as C, grad, highlight, radius, shadow} from '../theme';
import {sans} from './fonts';

/**
 * A CI step that visibly completes: the bar fills, then it ticks.
 * Used so the opening beat is watched rather than read.
 */
export const PipelineStep: React.FC<{
  label: string;
  detail?: React.ReactNode;
  startAt: number;
  fillFrames?: number;
  width?: number;
}> = ({label, detail, startAt, fillFrames = 18, width = 800}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const p = interpolate(frame, [startAt, startAt + fillFrames], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const done = p >= 1;
  const tick = settle(frame, fps, startAt + fillFrames);

  return (
    <div
      style={{
        width,
        background: C.bg,
        border: `1.5px solid ${done ? 'rgba(5,150,105,0.28)' : C.codeStroke}`,
        borderRadius: radius.md,
        boxShadow: `${shadow.lift}, ${highlight}`,
        overflow: 'hidden',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: 18, padding: '20px 26px 18px'}}>
        {/* status glyph: ring while running, tick when done */}
        <span
          style={{
            width: 34,
            height: 34,
            borderRadius: 99,
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: done ? grad.pass : 'transparent',
            border: done ? 'none' : `3px solid rgba(247,107,28,0.35)`,
            transform: `scale(${done ? 0.85 + tick * 0.15 : 1})`,
            flexShrink: 0,
          }}
        >
          {done ? (
            <span style={{color: C.onBrand, fontFamily: sans, fontSize: 21, fontWeight: 700}}>✓</span>
          ) : null}
        </span>
        <span style={{fontFamily: sans, fontSize: 33, fontWeight: 600, color: C.text}}>{label}</span>
        <span style={{marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12}}>{detail}</span>
      </div>
      {/* the fill */}
      <div style={{height: 7, background: C.bgDeep}}>
        <div style={{height: '100%', width: `${p * 100}%`, background: done ? grad.pass : grad.brand}} />
      </div>
    </div>
  );
};

/** n dots that go green one after another. "12 tests passed", shown not stated. */
export const DotRow: React.FC<{
  n: number;
  startAt: number;
  step?: number;
  size?: number;
}> = ({n, startAt, step = 3, size = 15}) => {
  const frame = useCurrentFrame();
  return (
    <span style={{display: 'inline-flex', gap: 7}}>
      {Array.from({length: n}, (_, i) => {
        const on = frame >= startAt + i * step;
        return (
          <span
            key={i}
            style={{
              width: size,
              height: size,
              borderRadius: 99,
              background: on ? grad.pass : C.dot,
            }}
          />
        );
      })}
    </span>
  );
};

/** A number that counts up, for "AI wrote 12 tests". */
export const Counter: React.FC<{
  to: number;
  startAt: number;
  frames?: number;
  size?: number;
  suffix?: string;
}> = ({to, startAt, frames = 20, size = 30, suffix = ''}) => {
  const frame = useCurrentFrame();
  const n = Math.round(
    interpolate(frame, [startAt, startAt + frames], [0, to], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    }),
  );
  return (
    <span style={{fontFamily: sans, fontSize: size, fontWeight: 700, color: C.textDim}}>
      {n}
      {suffix}
    </span>
  );
};
