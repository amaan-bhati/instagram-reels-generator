import React from 'react';
import {interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, settle} from '../lib/anim';
import {colors as C, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

export type TileState = 'ok' | 'edited' | 'broken';

export type Feature = {
  label: string;
  /** frame at which this tile flips to `broken`. Omit to stay as-is. */
  breaksAt?: number;
  state: TileState;
};

const TILE_W = 285;
const TILE_H = 132;
const GAP = 20;
const COLS = 3;
const MAP_W = TILE_W * COLS + GAP * (COLS - 1); // 895
const MAP_H = TILE_H * 2 + GAP; // 284

const pos = (i: number) => ({
  x: (i % COLS) * (TILE_W + GAP),
  y: Math.floor(i / COLS) * (TILE_H + GAP),
});
const center = (i: number) => {
  const p = pos(i);
  return {cx: p.x + TILE_W / 2, cy: p.y + TILE_H / 2};
};

const look = (s: TileState) => {
  if (s === 'broken')
    return {bg: C.exposedBg, bd: 'rgba(220,38,38,0.42)', fg: C.exposed, icon: '✕', label: 'BROKEN'};
  if (s === 'edited')
    return {bg: 'rgba(242,106,33,0.10)', bd: 'rgba(242,106,33,0.45)', fg: C.orangeDeep, icon: '✎', label: 'AI EDITED'};
  return {bg: 'rgba(5,150,105,0.07)', bd: 'rgba(5,150,105,0.24)', fg: C.masked, icon: '✓', label: 'OK'};
};

/**
 * The blast-radius map. One AI edit ripples out and breaks features nobody
 * touched. This is the argument of the whole reel, made visual:
 * the change is local, the damage is not.
 */
export const FeatureMap: React.FC<{
  features: Feature[];
  /** index of the tile the AI edited: ripples originate here */
  source: number;
  /** frame the ripple lines start drawing */
  rippleAt: number;
}> = ({features, source, rippleAt}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const state = (f: Feature): TileState =>
    f.breaksAt !== undefined && frame >= f.breaksAt ? 'broken' : f.state;

  const src = center(source);

  return (
    <div style={{position: 'relative', width: MAP_W, height: MAP_H}}>
      {/*
        The shockwave. Centre-to-centre connector lines read badly here: the
        tiles sit on top of them: so the blast radius is drawn literally:
        rings expanding out of the edited tile, with each feature flipping to
        broken as the wave reaches it.
      */}
      <svg
        width={MAP_W}
        height={MAP_H}
        style={{position: 'absolute', inset: 0, overflow: 'visible', pointerEvents: 'none'}}
      >
        {[0, 18].map((off) => {
          const r = interpolate(frame, [rippleAt + off, rippleAt + off + 88], [0, 660], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const o = interpolate(frame, [rippleAt + off, rippleAt + off + 30, rippleAt + off + 88], [0, 0.5, 0], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          return (
            <circle
              key={off}
              cx={src.cx}
              cy={src.cy}
              r={r}
              fill="none"
              stroke={C.orange}
              strokeWidth={6}
              opacity={o}
            />
          );
        })}
      </svg>

      {features.map((f, i) => {
        const s = state(f);
        const l = look(s);
        const flipped = f.breaksAt !== undefined && frame >= f.breaksAt;
        // a short shake as the tile flips to broken
        const k = flipped ? settle(frame, fps, f.breaksAt) : 1;
        const shake = flipped ? Math.sin((frame - (f.breaksAt ?? 0)) * 1.2) * (1 - k) * 7 : 0;
        const pulse = s === 'edited' ? breathe(frame, fps, 1.5) : 0;
        const p = pos(i);
        return (
          <div
            key={f.label}
            style={{
              position: 'absolute',
              left: p.x,
              top: p.y,
              width: TILE_W,
              height: TILE_H,
              background: l.bg,
              border: `2px solid ${l.bd}`,
              borderRadius: radius.md,
              boxShadow:
                s === 'edited'
                  ? `0 0 ${10 + pulse * 22}px rgba(242,106,33,${0.18 + pulse * 0.3}), ${highlight}`
                  : `${shadow.soft}, ${highlight}`,
              transform: `translateX(${shake}px)`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 12,
              padding: '0 24px',
            }}
          >
            <span style={{fontFamily: mono, fontSize: 23, fontWeight: 500, color: C.text}}>
              {f.label}
            </span>
            <span style={{display: 'flex', alignItems: 'center', gap: 10}}>
              <span style={{fontFamily: sans, fontSize: 24, fontWeight: 700, color: l.fg}}>
                {l.icon}
              </span>
              <span
                style={{
                  fontFamily: sans,
                  fontSize: 21,
                  fontWeight: 700,
                  letterSpacing: 1,
                  color: l.fg,
                }}
              >
                {l.label}
              </span>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export const MAP_WIDTH = MAP_W;
