import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, enter, settle} from '../lib/anim';
import {colors as C, grad, highlight, radius, shadow} from '../theme';
import {sans} from './fonts';

export type RunItem = {
  /** frame it appears, as pending */
  at: number;
  result: 'pass' | 'fail';
  /** relative width of the skeleton bar, 0 to 1 */
  w?: number;
};

const RESOLVE_AFTER = 20;

/**
 * The verification, shown rather than claimed.
 *
 * "REPLAYING EVERY ONE" was a label with nothing behind it: a reviewer asked
 * what, exactly, is being replayed. So the replayed cases are now visible. Each
 * one lands as a pending row with a pulsing dot, then resolves to pass or fail
 * about two thirds of a second later, so the run is something you watch happen.
 *
 * The rows carry skeleton bars, not text. The point is the volume and the
 * verdicts, and readable case names would only pull the eye off the heading,
 * which is the same note that produced the skeleton labels on the blast map.
 *
 * Ghost slabs underneath say the visible five are the top of a much deeper
 * pile. There is no count on them on purpose: a number would be an unsourced
 * stat, and depth communicates "many" without claiming how many.
 */
export const TestRunStack: React.FC<{
  items: RunItem[];
  depth?: number;
  width?: number;
  rowHeight?: number;
}> = ({items, depth = 4, width = 900, rowHeight = 42}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = breathe(frame, fps, 0.9);

  const inner = width - 44;

  return (
    <div style={{position: 'relative', width}}>
      <div style={{display: 'flex', flexDirection: 'column', gap: 8}}>
        {items.map((it, i) => {
          const k = settle(frame, fps, it.at);
          if (k <= 0) return null;
          const resolved = frame >= it.at + RESOLVE_AFTER;
          const pass = it.result === 'pass';
          const rk = settle(frame, fps, it.at + RESOLVE_AFTER);

          const dot = !resolved
            ? {bg: C.dot, fg: C.textFaint, glyph: ''}
            : pass
              ? {bg: grad.pass, fg: C.onBrand, glyph: '✓'}
              : {bg: grad.fail, fg: C.onBrand, glyph: '✕'};

          return (
            <div
              key={i}
              style={{
                height: rowHeight,
                background: C.bg,
                border: `1.5px solid ${
                  resolved
                    ? pass
                      ? 'rgba(3,96,73,0.26)'
                      : 'rgba(168,24,52,0.30)'
                    : C.codeStroke
                }`,
                borderRadius: radius.md,
                boxShadow: `${shadow.soft}, ${highlight}`,
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                padding: '0 16px',
                opacity: k,
                transform: `translateY(${(1 - k) * 10}px)`,
              }}
            >
              <span
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 99,
                  flexShrink: 0,
                  background: dot.bg,
                  opacity: resolved ? 1 : 0.35 + pulse * 0.45,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: sans,
                  fontSize: 14,
                  fontWeight: 700,
                  color: dot.fg,
                  transform: `scale(${resolved ? 0.88 + rk * 0.12 : 1})`,
                }}
              >
                {dot.glyph}
              </span>
              <span
                style={{
                  display: 'block',
                  height: 11,
                  width: (it.w ?? 0.5) * (inner - 60),
                  borderRadius: 99,
                  background: grad.skeleton,
                  backgroundSize: '320% 100%',
                  backgroundPosition: `${((frame * 3 + i * 55) % 320) - 110}% 0`,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* the rest of the pile */}
      {Array.from({length: depth}, (_, i) => {
        const step = depth - i;
        const last = items[items.length - 1];
        const k = settle(frame, fps, (last?.at ?? 0) + 8 + i * 4);
        return (
          <div
            key={`g${i}`}
            style={{
              position: 'absolute',
              left: step * 12,
              right: step * 12,
              bottom: -step * 9,
              height: rowHeight,
              background: C.bg,
              border: `1.5px solid ${C.codeStroke}`,
              borderRadius: radius.md,
              opacity: k * (0.5 - i * 0.09),
              zIndex: -1,
            }}
          />
        );
      })}
    </div>
  );
};
