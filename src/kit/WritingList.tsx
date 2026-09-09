import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {settle} from '../lib/anim';
import {colors as C, grad, highlight, radius, shadow} from '../theme';
import {sans} from './fonts';

export type WrittenRow = {at: number; w?: number};

/**
 * A list being written, with a cursor doing the writing.
 *
 * Deliberately has no status icons. An earlier version put a green tick on
 * every row, which answered a question the beat has not asked yet: at this
 * point the only claim is that AI produced a pile of tests, and marking them
 * passed pre-empts the failure banner that follows. Skeletons alone say
 * "these exist and I am not asking you to read them".
 *
 * The cursor tracks whichever row landed most recently, and eases between
 * positions rather than jumping, so it reads as one continuous scroll down the
 * list instead of a teleport per row. The `AI` tag rides with it, which is what
 * attributes the writing without a caption saying so.
 */
export const WritingList: React.FC<{
  rows: WrittenRow[];
  width?: number;
  rowHeight?: number;
  gap?: number;
  showCursor?: boolean;
}> = ({rows, width = 880, rowHeight = 40, gap = 8, showCursor = true}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const yOf = (i: number) => i * (rowHeight + gap);
  const height = rows.length * rowHeight + (rows.length - 1) * gap;

  // index of the newest landed row, as a float so the cursor can ease between
  const progress = rows.reduce((acc, r, i) => {
    const t = interpolate(frame, [r.at, r.at + 12], [0, 1], {
      extrapolateLeft: 'clamp',
      extrapolateRight: 'clamp',
    });
    return acc + t * (i === 0 ? 0 : 1);
  }, 0);

  const started = frame >= rows[0].at;
  const cursorY = yOf(0) + progress * (rowHeight + gap) + rowHeight * 0.55;

  return (
    <div style={{position: 'relative', width, height}}>
      {rows.map((r, i) => {
        const k = settle(frame, fps, r.at);
        if (k <= 0) return null;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: 0,
              top: yOf(i),
              width,
              height: rowHeight,
              background: C.bg,
              border: `1.5px solid ${C.codeStroke}`,
              borderRadius: radius.md,
              boxShadow: `${shadow.soft}, ${highlight}`,
              display: 'flex',
              alignItems: 'center',
              padding: '0 18px',
              opacity: k,
              transform: `translateY(${(1 - k) * 12}px)`,
            }}
          >
            <span
              style={{
                display: 'block',
                height: 11,
                width: (r.w ?? 0.6) * (width - 60),
                borderRadius: 99,
                background: grad.skeleton,
                backgroundSize: '320% 100%',
                backgroundPosition: `${((frame * 3 + i * 55) % 320) - 110}% 0`,
              }}
            />
          </div>
        );
      })}

      {showCursor && started ? (
        <div
          style={{
            position: 'absolute',
            left: width - 196,
            top: cursorY,
            display: 'flex',
            alignItems: 'center',
            gap: 9,
            pointerEvents: 'none',
          }}
        >
          <svg width="26" height="26" viewBox="0 0 24 24">
            <path
              d="M3 2 L3 19 L7.5 14.8 L10.6 21.5 L13.6 20.2 L10.5 13.6 L17 13.6 Z"
              fill={C.text}
              stroke={C.bg}
              strokeWidth="1.4"
              strokeLinejoin="round"
            />
          </svg>
          <span
            style={{
              fontFamily: sans,
              fontSize: 19,
              fontWeight: 700,
              letterSpacing: 0.8,
              color: C.onBrand,
              background: grad.brand,
              borderRadius: radius.pill,
              padding: '5px 13px',
              whiteSpace: 'nowrap',
              boxShadow: '0 6px 16px rgba(154,50,8,0.28)',
            }}
          >
            AI
          </span>
        </div>
      ) : null}
    </div>
  );
};
