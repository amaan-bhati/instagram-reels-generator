import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, settle} from '../lib/anim';
import {colors as C, deps as DEP_COLOR, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

/**
 * direct  the app calls its dependencies itself. No Keploy anywhere.
 * record  Keploy has landed in the path and is capturing both sides.
 * replay  Keploy is the one driving. It serves the mocks and collects the
 *         responses; the real dependencies are never touched.
 */
export type FlowPhase = 'direct' | 'record' | 'replay';

export type DepKey = keyof typeof DEP_COLOR;
export type Dep = {key: DepKey; name: string; latency: string; calls: string; fill: number};

const W = 900;
const DEP_X = [0, 306, 612];

/**
 * Two layouts.
 *
 * `twoCard` is what PersonasV4 renders: a request card above an app card. A
 * reviewer pointed out those say the same thing twice, so `oneCard` folds the
 * route into the app card as a mono chip and drops a whole tier, which is what
 * frees the vertical room for the verification stack underneath.
 *
 * Kept as a mode rather than a rewrite so PersonasV4 keeps its exact geometry.
 */
const LAYOUTS = {
  twoCard: {
    req: {y: 0, h: 86, w: 520},
    app: {y: 150, h: 92, w: 560},
    hub: {y: 316, h: 118, w: 600},
    dep: {y: 540, h: 132, w: 288},
  },
  oneCard: {
    req: null,
    app: {y: 0, h: 100, w: 640},
    hub: {y: 176, h: 118, w: 600},
    dep: {y: 398, h: 132, w: 288},
  },
} as const;

const cx = W / 2;

/** Smooth S curve, which is what the reference uses instead of right angles. */
const curve = (sx: number, sy: number, dx: number, dy: number) => {
  const k = (dy - sy) * 0.55;
  return `M ${sx} ${sy} C ${sx} ${sy + k} ${dx} ${dy - k} ${dx} ${dy}`;
};
const cubicAt = (sx: number, sy: number, dx: number, dy: number, t: number) => {
  const k = (dy - sy) * 0.55;
  const u = 1 - t;
  const p = (a: number, b: number, c: number, d: number) =>
    u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
  return [p(sx, sx, dx, dx), p(sy, sy + k, dy - k, dy)] as const;
};
const frac = (x: number) => x - Math.floor(x);

const Glyph: React.FC<{k: DepKey; color: string}> = ({k, color}) => {
  if (k === 'mail') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9">
        <rect x="2.5" y="5" width="19" height="14" rx="2.4" />
        <path d="M3 6.6 12 13l9-6.4" />
      </svg>
    );
  }
  if (k === 'redis') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" fill={color}>
        <ellipse cx="12" cy="6" rx="9" ry="3.1" />
        <path d="M3 10.4c0 1.7 4 3.1 9 3.1s9-1.4 9-3.1v3c0 1.7-4 3.1-9 3.1S3 15.1 3 13.4z" />
        <path d="M3 17c0 1.7 4 3.1 9 3.1s9-1.4 9-3.1v2.4c0 1.7-4 3.1-9 3.1S3 21.1 3 19.4z" opacity="0.55" />
      </svg>
    );
  }
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9">
      <ellipse cx="12" cy="5.6" rx="8" ry="3" />
      <path d="M4 5.6v12.8c0 1.7 3.6 3 8 3s8-1.3 8-3V5.6" />
      <path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" />
    </svg>
  );
};

const Card: React.FC<{
  box: {y: number; h: number; w: number};
  k: number;
  bd: string;
  bg?: string;
  glow?: string;
  dashed?: boolean;
  children: React.ReactNode;
}> = ({box, k, bd, bg = C.bg, glow, dashed, children}) => (
  <div
    style={{
      position: 'absolute',
      left: cx - box.w / 2,
      top: box.y,
      width: box.w,
      height: box.h,
      background: bg,
      border: `2px ${dashed ? 'dashed' : 'solid'} ${bd}`,
      borderRadius: radius.lg,
      boxShadow: glow ?? `${shadow.lift}, ${highlight}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 18,
      opacity: k,
      transform: `scale(${0.95 + k * 0.05})`,
    }}
  >
    {children}
  </div>
);

/**
 * The record and replay diagram, rebuilt to the supplied reference.
 *
 * The important change is not the styling, it is the ORDER. An earlier version
 * opened with Keploy already in the middle and three lines fanning out below
 * it, which a reviewer read as Keploy turning into Postgres. Showing the app
 * calling its own dependencies first, and only then dropping Keploy onto that
 * path, removes the ambiguity at the source: you watch it interpose.
 *
 * No layout shift when it arrives. The hub band is reserved from the first
 * frame and the curves run straight through it, so Keploy lands ON the path
 * rather than pushing anything out of the way.
 */
export const DepFlow: React.FC<{
  phase: FlowPhase;
  /** frame Keploy lands. Only used when phase is record. */
  hubAt?: number;
  /** omit entirely to label the card with nothing but the app name */
  route?: {method: string; path: string; status?: string};
  /** 'oneCard' folds the route into the app card and drops the request tier */
  cards?: 'twoCard' | 'oneCard';
  app: string;
  dependencies: Dep[];
  flowAt?: number;
}> = ({phase, hubAt = 0, route, app, dependencies, flowAt = 8, cards = 'twoCard'}) => {
  const L = LAYOUTS[cards];
  const REQ = L.req;
  const APP = L.app;
  const HUB = L.hub;
  const DEP = L.dep;
  const H = DEP.y + DEP.h;
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  const replay = phase === 'replay';
  // during record the hub arrives partway through; during replay it is there from the start
  const hubK = phase === 'direct' ? 0 : replay ? settle(frame, fps, hubAt) : settle(frame, fps, hubAt);
  const hubHere = hubK > 0.02;
  const pulse = breathe(frame, fps, 1.7);

  const reqK = settle(frame, fps, 0);
  const appK = settle(frame, fps, REQ ? 6 : 0);

  const appTop: [number, number] = [cx, APP.y];
  const appBottom: [number, number] = [cx, APP.y + APP.h];
  const hubTop: [number, number] = [cx, HUB.y];
  const hubBottom: [number, number] = [cx, HUB.y + HUB.h];

  const dots = (
    sx: number,
    sy: number,
    dx: number,
    dy: number,
    color: string,
    n: number,
    period: number,
    up: boolean,
    startAt: number,
  ) =>
    Array.from({length: n}, (_, j) => {
      const raw = frac((frame - startAt) / period + j / n);
      const t = up ? 1 - raw : raw;
      const [px, py] = cubicAt(sx, sy, dx, dy, t);
      const fade = interpolate(raw, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
      return (
        <circle
          key={j}
          cx={px}
          cy={py}
          r={6.5}
          fill={color}
          opacity={frame >= startAt ? fade : 0}
        />
      );
    });

  return (
    <div style={{position: 'relative', width: W, height: H}}>
      <svg width={W} height={H} style={{position: 'absolute', inset: 0, overflow: 'visible'}}>
        {REQ && route ? (
          <path
            d={curve(cx, REQ.h, appTop[0], appTop[1])}
            stroke={C.codeStroke}
            strokeWidth={3}
            fill="none"
          />
        ) : null}

        {/* the app's own call paths. They run through the reserved hub band, so
            Keploy can land on top of them without moving anything. */}
        {dependencies.map((d, i) => {
          const col = DEP_COLOR[d.key];
          const dx = DEP_X[i] + DEP.w / 2;
          const from = hubHere ? hubBottom : appBottom;
          return (
            <g key={d.key}>
              {hubHere ? (
                <path
                  d={curve(appBottom[0], appBottom[1], hubTop[0], hubTop[1])}
                  stroke={C.codeStroke}
                  strokeWidth={3}
                  fill="none"
                />
              ) : null}
              <path
                d={curve(from[0], from[1], dx, DEP.y)}
                stroke={col.line}
                strokeWidth={3}
                strokeDasharray={replay ? '9 9' : undefined}
                fill="none"
                opacity={0.9}
              />
              <circle cx={dx} cy={DEP.y} r={5} fill={col.line} />
              {dots(from[0], from[1], dx, DEP.y, col.line, 2, 42, replay, flowAt + i * 5)}
            </g>
          );
        })}
        {REQ && route ? dots(cx, REQ.h, appTop[0], appTop[1], C.textFaint, 1, 40, replay, flowAt) : null}
      </svg>

      {REQ && route ? (
        <Card box={REQ} k={reqK} bd={C.codeStroke}>
          <span
            style={{
              fontFamily: mono,
              fontSize: 24,
              fontWeight: 500,
              color: C.textDim,
              background: C.bgDeep,
              border: `1.5px solid ${C.codeStroke}`,
              borderRadius: radius.sm,
              padding: '7px 15px',
            }}
          >
            {route.method}
          </span>
          <span style={{fontFamily: mono, fontSize: 26, color: C.text}}>{route.path}</span>
          <span style={{fontFamily: mono, fontSize: 26, fontWeight: 500, color: C.masked}}>
            {route.status}
          </span>
        </Card>
      ) : null}

      {/* the app. In oneCard mode its route is folded in rather than stacked above it. */}
      <Card box={APP} k={appK} bd={C.codeStroke}>
        <span style={{fontFamily: sans, fontSize: 30, fontWeight: 700, color: C.text}}>{app}</span>
        {REQ || !route ? null : (
          <span
            style={{
              fontFamily: mono,
              fontSize: 23,
              fontWeight: 500,
              color: C.textDim,
              background: C.bgDeep,
              border: `1.5px solid ${C.codeStroke}`,
              borderRadius: radius.sm,
              padding: '7px 14px',
            }}
          >
            {route.method} {route.path}
          </span>
        )}
        {replay ? (
          <span style={{fontFamily: sans, fontSize: 21, fontWeight: 600, color: C.textDim}}>
            under test
          </span>
        ) : null}
      </Card>

      {/* Keploy, landing onto the path rather than replacing part of it */}
      {hubHere ? (
        <Card
          box={HUB}
          k={hubK}
          bd="rgba(232,89,14,0.45)"
          bg="rgba(232,89,14,0.05)"
          glow={`0 0 ${18 + pulse * 30}px rgba(232,89,14,${0.14 + pulse * 0.16}), ${highlight}`}
        >
          <span style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8}}>
            <span style={{display: 'flex', alignItems: 'center', gap: 15}}>
              <Img src={staticFile('keploy-mark.svg')} style={{height: 44}} />
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
                color: replay ? C.orangeDeep : C.exposed,
              }}
            >
              <span
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 99,
                  background: replay ? C.orangeDeep : C.exposed,
                  opacity: 0.45 + pulse * 0.55,
                }}
              />
              {replay ? 'REPLAYING EVERY ONE' : 'RECORDING'}
            </span>
          </span>
        </Card>
      ) : null}

      {/*
        The sandbox, replay only.
        During replay the dependency cards are already dashed and read `mocked`,
        but individually: nothing said they are one thing that Keploy owns and
        answers from. Enclosing them makes the boundary explicit, so the traffic
        is visibly going into Keploy's own sandbox rather than out to the real
        Postgres. Drawn before the cards so they sit inside it, and with a very
        light fill so the connectors entering it stay visible.
      */}
      {replay ? (
        <>
          <div
            style={{
              position: 'absolute',
              left: -6,
              top: DEP.y - 38,
              width: W + 12,
              height: DEP.h + 56,
              border: `2px dashed rgba(196,116,10,0.55)`,
              borderRadius: radius.lg,
              background: 'rgba(196,116,10,0.035)',
              opacity: settle(frame, fps, hubAt + 10),
            }}
          />
          <div
            style={{
              position: 'absolute',
              left: 0,
              width: W,
              top: DEP.y - 50,
              textAlign: 'center',
              opacity: settle(frame, fps, hubAt + 14),
            }}
          >
            <span
              style={{
                fontFamily: sans,
                fontSize: 20,
                fontWeight: 700,
                letterSpacing: 1.4,
                color: C.orangeDeep,
                background: C.bg,
                borderRadius: radius.pill,
                padding: '5px 16px',
                whiteSpace: 'nowrap',
              }}
            >
              KEPLOY SANDBOX
            </span>
          </div>
        </>
      ) : null}

      {/* the dependencies */}
      {dependencies.map((d, i) => {
        const col = DEP_COLOR[d.key];
        const k = settle(frame, fps, 10 + i * 5);
        return (
          <div
            key={d.key}
            style={{
              position: 'absolute',
              left: DEP_X[i],
              top: DEP.y,
              width: DEP.w,
              height: DEP.h,
              background: C.bg,
              border: `2px ${replay ? 'dashed' : 'solid'} ${col.line}`,
              borderRadius: radius.lg,
              boxShadow: `${shadow.lift}, ${highlight}`,
              padding: '16px 18px',
              opacity: k,
              transform: `scale(${0.95 + k * 0.05})`,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div style={{display: 'flex', alignItems: 'center', gap: 13}}>
              <span
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 12,
                  background: col.tint,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Glyph k={d.key} color={col.line} />
              </span>
              <span style={{display: 'flex', flexDirection: 'column', gap: 3, minWidth: 0}}>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 21,
                    fontWeight: 700,
                    color: C.text,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {d.name}
                </span>
                <span style={{fontFamily: mono, fontSize: 18, color: C.textDim}}>
                  {replay ? 'mocked' : d.calls}
                </span>
              </span>
              <span
                style={{
                  marginLeft: 'auto',
                  paddingLeft: 8,
                  fontFamily: sans,
                  fontSize: 20,
                  fontWeight: 700,
                  color: col.text,
                  whiteSpace: 'nowrap',
                  flexShrink: 0,
                }}
              >
                {d.latency}
              </span>
            </div>
            <div style={{height: 8, borderRadius: 99, background: C.bgDeep, overflow: 'hidden'}}>
              <div
                style={{
                  height: '100%',
                  width: `${d.fill * 100 * Math.min(1, Math.max(0, (frame - 18 - i * 5) / 22))}%`,
                  background: col.line,
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};


