import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, settle} from '../lib/anim';
import {colors as C, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

/** record = capturing real dependency traffic. replay = serving it back as mocks. */
export type Phase = 'record' | 'replay';

const W = 900;
const APP = {x: 230, y: 0, w: 440, h: 116};
const PROXY = {x: 200, y: 172, w: 500, h: 140};
const DEP = {y: 378, w: 280, h: 106};
const DEP_X = [0, 310, 620];
const H = DEP.y + DEP.h;

type Pt = {x: number; y: number};

const APP_OUT: Pt = {x: 450, y: APP.y + APP.h};
const PROXY_IN: Pt = {x: 450, y: PROXY.y};
const PROXY_OUT: Pt = {x: 450, y: PROXY.y + PROXY.h};

/** Orthogonal routes from the proxy down to each dependency. */
const routes: Pt[][] = DEP_X.map((x) => {
  const cx = x + DEP.w / 2;
  const mid = PROXY_OUT.y + 34;
  return cx === 450
    ? [PROXY_OUT, {x: cx, y: DEP.y}]
    : [PROXY_OUT, {x: 450, y: mid}, {x: cx, y: mid}, {x: cx, y: DEP.y}];
});
const spine: Pt[] = [APP_OUT, PROXY_IN];

const toPath = (pts: Pt[]) =>
  pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');

/** Point at t in [0,1] along a polyline. */
const at = (pts: Pt[], t: number): Pt => {
  const segs = pts.slice(1).map((b, i) => {
    const a = pts[i];
    return {a, b, len: Math.hypot(b.x - a.x, b.y - a.y)};
  });
  const total = segs.reduce((s, x) => s + x.len, 0);
  let d = Math.max(0, Math.min(1, t)) * total;
  for (const s of segs) {
    if (d <= s.len) {
      const k = s.len === 0 ? 0 : d / s.len;
      return {x: s.a.x + (s.b.x - s.a.x) * k, y: s.a.y + (s.b.y - s.a.y) * k};
    }
    d -= s.len;
  }
  return pts[pts.length - 1];
};

const frac = (x: number) => x - Math.floor(x);

const Card: React.FC<{
  box: {x: number; y: number; w: number; h: number};
  children: React.ReactNode;
  bd: string;
  bg?: string;
  glow?: string;
  dashed?: boolean;
}> = ({box, children, bd, bg = C.bg, glow, dashed}) => (
  <div
    style={{
      position: 'absolute',
      left: box.x,
      top: box.y,
      width: box.w,
      height: box.h,
      background: bg,
      border: `2px ${dashed ? 'dashed' : 'solid'} ${bd}`,
      borderRadius: radius.md,
      boxShadow: glow ?? `${shadow.soft}, ${highlight}`,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 9,
      padding: '0 20px',
    }}
  >
    {children}
  </div>
);

/**
 * The record/replay mechanic, drawn instead of narrated.
 *
 * record : the app's real dependency calls pass through the Keploy proxy on
 *           their way out. Keploy captures both sides.
 * replay : the same requests go back in, but the proxy answers from the
 *           captured mocks. The real dependencies are never touched.
 */
export const ProxyDiagram: React.FC<{
  phase: Phase;
  app: string;
  route: string;
  deps: string[];
  /** frame the traffic dots start moving */
  flowAt?: number;
}> = ({phase, app, route, deps, flowAt = 0}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const rec = phase === 'record';
  const pulse = breathe(frame, fps, 1.4);
  const live = frame >= flowAt;

  const accent = rec ? C.exposed : C.orange;
  const dots = (pts: Pt[], n: number, period: number, up: boolean) =>
    Array.from({length: n}, (_, j) => {
      const raw = frac((frame - flowAt) / period + j / n);
      const t = up ? 1 - raw : raw;
      const p = at(pts, t);
      const fade = interpolate(raw, [0, 0.08, 0.92, 1], [0, 1, 1, 0]);
      return (
        <circle key={j} cx={p.x} cy={p.y} r={7} fill={C.orange} opacity={live ? fade * 0.9 : 0} />
      );
    });

  return (
    <div style={{position: 'relative', width: W, height: H}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        {/* spine: app <-> proxy. Always live. */}
        <path d={toPath(spine)} stroke={C.codeStroke} strokeWidth={4} fill="none" />
        {/* proxy <-> dependencies. Dashed and quiet during replay: never called. */}
        {routes.map((r, i) => (
          <path
            key={i}
            d={toPath(r)}
            stroke={rec ? C.codeStroke : 'rgba(148,163,184,0.45)'}
            strokeWidth={4}
            strokeDasharray={rec ? undefined : '10 12'}
            fill="none"
          />
        ))}
        {/*
          Arrowheads. A viewer read the bare drops as the proxy DIVIDING into
          Postgres rather than calling it, which is the opposite of the point.
          Direction is what separates flow from structure, so every hop now
          terminates in an arrow. That alone fixed the read, in both the record
          and the replay phase, since they are the same component.
        */}
        {DEP_X.map((x, i) => {
          const cx = x + DEP.w / 2;
          const col = rec ? C.textFaint : 'rgba(148,163,184,0.55)';
          return (
            <polygon
              key={`ah${i}`}
              points={`${cx},${DEP.y - 2} ${cx - 8},${DEP.y - 17} ${cx + 8},${DEP.y - 17}`}
              fill={col}
            />
          );
        })}
        <polygon
          points={`450,${PROXY_IN.y - 2} 442,${PROXY_IN.y - 17} 458,${PROXY_IN.y - 17}`}
          fill={C.textFaint}
        />
        {dots(spine, 2, 34, !rec)}
        {rec ? routes.map((r, i) => <g key={i}>{dots(r, 2, 40, false)}</g>) : null}
      </svg>

      {/* the application under test */}
      <Card box={APP} bd={C.codeStroke}>
        <span style={{fontFamily: sans, fontSize: 30, fontWeight: 700, color: C.text}}>{app}</span>
        <span style={{fontFamily: mono, fontSize: 23, color: C.textDim}}>{route}</span>
      </Card>

      {/* Keploy, sitting in the path */}
      <Card
        box={PROXY}
        bd="rgba(242,106,33,0.55)"
        bg="rgba(242,106,33,0.06)"
        glow={`0 0 ${14 + pulse * 26}px rgba(242,106,33,${0.16 + pulse * 0.22}), ${highlight}`}
      >
        <span style={{display: 'flex', alignItems: 'center', gap: 14}}>
          <Img src={staticFile('keploy-mark.svg')} style={{height: 56}} />
          <span style={{fontFamily: sans, fontSize: 32, fontWeight: 700, color: C.text}}>
            Keploy proxy
          </span>
        </span>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            fontFamily: sans,
            fontSize: 21,
            fontWeight: 700,
            letterSpacing: 1.2,
            color: accent,
          }}
        >
          <span
            style={{
              width: 13,
              height: 13,
              borderRadius: 99,
              background: accent,
              opacity: 0.45 + pulse * 0.55,
            }}
          />
          {rec ? 'RECORDING' : 'REPLAYING · SERVING MOCKS'}
        </span>
      </Card>

      {/* dependencies: real while recording, mocked while testing */}
      {deps.map((d, i) => {
        const k = settle(frame, fps, flowAt + 8 + i * 4);
        return (
          <Card
            key={d}
            box={{x: DEP_X[i], y: DEP.y, w: DEP.w, h: DEP.h}}
            bd={rec ? C.codeStroke : 'rgba(242,106,33,0.5)'}
            bg={rec ? C.bgDeep : 'rgba(242,106,33,0.07)'}
            dashed={!rec}
          >
            <span style={{fontFamily: sans, fontSize: 26, fontWeight: 600, color: C.text}}>{d}</span>
            <span
              style={{
                fontFamily: sans,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1,
                color: rec ? C.textFaint : C.orangeDeep,
                opacity: rec ? 1 : k,
              }}
            >
              {rec ? 'REAL' : 'MOCKED'}
            </span>
          </Card>
        );
      })}
    </div>
  );
};

export const DIAGRAM_HEIGHT = H;
