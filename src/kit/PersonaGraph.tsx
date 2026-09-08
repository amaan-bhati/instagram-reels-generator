import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, settle} from '../lib/anim';
import {colors as C, highlight, shadow} from '../theme';
import {sans} from './fonts';

export type Hub = 'ai' | 'keploy';

/** Deterministic jitter. Same layout on every frame and every render. */
const rnd = (i: number, salt = 0) => {
  const x = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return x - Math.floor(x);
};

type Node = {x: number; y: number; r: number; glyph: 'person' | 'bot'; ring: number};

/**
 * Nodes on concentric rings, angle and radius jittered so it reads organic
 * rather than like a clock face. Small sets get one big ring; large sets get
 * three, which is what makes 36 nodes still legible at reel scale.
 */
const layout = (count: number, w: number, h: number): Node[] => {
  const half = Math.min(w, h) / 2;
  const rings: {n: number; rad: number}[] =
    count <= 6
      ? [{n: count, rad: half * 0.62}]
      : (() => {
          const n1 = Math.round(count * 0.28);
          const n2 = Math.round(count * 0.36);
          return [
            {n: n1, rad: half * 0.50},
            {n: n2, rad: half * 0.72},
            {n: count - n1 - n2, rad: half * 0.93},
          ];
        })();

  const nodeR = count <= 6 ? 42 : 29;
  const out: Node[] = [];
  let idx = 0;
  rings.forEach((ring, k) => {
    const offset = k * 0.41 + 0.12;
    for (let i = 0; i < ring.n; i++) {
      const jitterA = (rnd(idx, 1) - 0.5) * (Math.PI / ring.n) * 0.85;
      const jitterR = (rnd(idx, 2) - 0.5) * 26;
      const a = (i / ring.n) * Math.PI * 2 + offset + jitterA;
      const rad = ring.rad + jitterR;
      out.push({
        x: Math.cos(a) * rad * (w / Math.min(w, h)),
        y: Math.sin(a) * rad,
        r: nodeR,
        glyph: rnd(idx, 3) > 0.86 ? 'bot' : 'person',
        ring: k,
      });
      idx++;
    }
  });
  return out;
};

const Person: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <circle cx="12" cy="8" r="4.2" />
    <path d="M3.6 21c0-4.6 3.8-8.4 8.4-8.4s8.4 3.8 8.4 8.4v.4H3.6z" />
  </svg>
);

const Bot: React.FC<{size: number; color: string}> = ({size, color}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <rect x="4.6" y="7.4" width="14.8" height="11" rx="3.4" />
    <rect x="11.2" y="3.2" width="1.6" height="3.6" rx="0.8" />
    <circle cx="12" cy="2.6" r="1.5" />
  </svg>
);

/** Quadratic point, for the travelling dot. */
const qAt = (
  p0: [number, number],
  p1: [number, number],
  p2: [number, number],
  t: number,
): [number, number] => {
  const u = 1 - t;
  return [
    u * u * p0[0] + 2 * u * t * p1[0] + t * t * p2[0],
    u * u * p0[1] + 2 * u * t * p1[1] + t * t * p2[1],
  ];
};

/**
 * Hub and spokes: one centre reaching out to the people it thought about.
 *
 * The whole argument of this variant is the node count. AI gets five, because
 * five is what you can infer from a file. Keploy gets thirty six, because it
 * watched real traffic. Same component, same asset, different density.
 */
export const PersonaGraph: React.FC<{
  hub: Hub;
  count: number;
  /** frame the hub lands */
  hubAt?: number;
  /** frame the first spoke leaves the hub */
  spokeAt?: number;
  /** frames between spokes */
  stagger?: number;
  width?: number;
  height?: number;
}> = ({hub, count, hubAt = 0, spokeAt = 18, stagger = 3, width = 900, height = 720}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const keploy = hub === 'keploy';

  const cx = width / 2;
  const cy = height / 2;
  const hubR = keploy ? 92 : 74;
  const nodes = layout(count, width - 90, height - 90);

  const hubK = settle(frame, fps, hubAt);
  const pulse = breathe(frame, fps, 1.9);
  const line = keploy ? C.orange : C.textFaint;

  return (
    <div style={{position: 'relative', width, height}}>
      <svg width={width} height={height} style={{position: 'absolute', inset: 0}}>
        {nodes.map((n, i) => {
          const at = spokeAt + i * stagger;
          const p = interpolate(frame, [at, at + 16], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          if (p <= 0) return null;

          const nx = cx + n.x;
          const ny = cy + n.y;
          const len = Math.hypot(n.x, n.y) || 1;
          const ux = n.x / len;
          const uy = n.y / len;
          const start: [number, number] = [cx + ux * hubR, cy + uy * hubR];
          const end: [number, number] = [nx - ux * n.r, ny - uy * n.r];
          const bend = (rnd(i, 4) - 0.5) * len * 0.34;
          const mx = (start[0] + end[0]) / 2 - uy * bend;
          const my = (start[1] + end[1]) / 2 + ux * bend;
          const ctrl: [number, number] = [mx, my];

          // travelling dot: leaves the hub once, arrives as the node lands
          const dt = interpolate(frame, [at, at + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });
          const [dx, dy] = qAt(start, ctrl, end, dt);

          return (
            <g key={i} opacity={p}>
              <path
                d={`M ${start[0]} ${start[1]} Q ${ctrl[0]} ${ctrl[1]} ${end[0]} ${end[1]}`}
                stroke={line}
                strokeWidth={2.6}
                strokeDasharray="6 9"
                strokeLinecap="round"
                fill="none"
                opacity={keploy ? 0.75 : 0.5}
              />
              {dt < 1 ? <circle cx={dx} cy={dy} r={6} fill={line} /> : null}
            </g>
          );
        })}
      </svg>

      {/* the people */}
      {nodes.map((n, i) => {
        const at = spokeAt + i * stagger + 12;
        const k = settle(frame, fps, at);
        if (k <= 0) return null;
        const g = n.r * 0.98;
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: cx + n.x - n.r,
              top: cy + n.y - n.r,
              width: n.r * 2,
              height: n.r * 2,
              borderRadius: 999,
              background: C.bg,
              border: `2px solid ${C.codeStroke}`,
              boxShadow: `${shadow.soft}, ${highlight}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: k,
              transform: `scale(${0.6 + k * 0.4})`,
            }}
          >
            {n.glyph === 'bot' ? (
              <Bot size={g} color={C.textFaint} />
            ) : (
              <Person size={g} color={C.textFaint} />
            )}
          </div>
        );
      })}

      {/* the hub */}
      <div
        style={{
          position: 'absolute',
          left: cx - hubR,
          top: cy - hubR,
          width: hubR * 2,
          height: hubR * 2,
          borderRadius: 999,
          background: C.bg,
          border: keploy ? '2px solid rgba(247,107,28,0.30)' : `2px solid ${C.codeStroke}`,
          boxShadow: keploy
            ? `0 0 ${26 + pulse * 40}px rgba(247,107,28,${0.18 + pulse * 0.20}), ${shadow.card}, ${highlight}`
            : `${shadow.card}, ${highlight}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          opacity: hubK,
          transform: `scale(${0.78 + hubK * 0.22})`,
        }}
      >
        {keploy ? (
          <Img src={staticFile('keploy-mark.svg')} style={{height: hubR * 0.95}} />
        ) : (
          <span
            style={{
              fontFamily: sans,
              fontSize: hubR * 0.62,
              fontWeight: 700,
              letterSpacing: -1,
              color: C.textDim,
            }}
          >
            AI
          </span>
        )}
      </div>

    </div>
  );
};
