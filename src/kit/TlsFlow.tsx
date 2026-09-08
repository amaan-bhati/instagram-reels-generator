import React from 'react';
import {Img, interpolate, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe, enter, settle} from '../lib/anim';
import {colors as C, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

const W = 900;
const NODE_H = 96;
const GAP = 74;

type Row = {label: string; sub?: string; keploy?: boolean};

/**
 * The asymmetry, drawn as one vertical path.
 *
 * Two hops, opposite outcomes, same proxy. The inbound hop is TLS so Keploy
 * sees ciphertext and cannot lift an HTTP request out of it, which is why no
 * test case is written. The outbound hop to Postgres is plaintext so it is
 * captured, which is why mocks.yaml fills up anyway.
 *
 * Putting both on one line is the whole point: the viewer can see that the tool
 * is working and failing at the same time, which is exactly what "mocks only"
 * feels like from the outside.
 */
export const TlsFlow: React.FC<{
  rows: Row[];
  /**
   * Edge annotations, one per gap between rows. `locked` dashes the stroke to
   * read as encrypted; no icon, because a colour emoji would be the only
   * off-palette pixel in the whole reel (DESIGN 0.3 allows one accent).
   */
  edges: {label: string; detail: string; tone: 'fail' | 'pass'; locked?: boolean}[];
  at?: number;
  width?: number;
}> = ({rows, edges, at = 0, width = W}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const pulse = breathe(frame, fps, 1.8);

  return (
    <div style={{width, display: 'flex', flexDirection: 'column', alignItems: 'stretch'}}>
      {rows.map((r, i) => {
        const k = settle(frame, fps, at + i * 10);
        const edge = edges[i];
        return (
          <React.Fragment key={r.label}>
            <div
              style={{
                height: NODE_H,
                background: C.bg,
                border: r.keploy ? '2px solid rgba(247,107,28,0.42)' : `2px solid ${C.codeStroke}`,
                borderRadius: radius.md,
                boxShadow: r.keploy
                  ? `0 0 ${16 + pulse * 26}px rgba(247,107,28,${0.14 + pulse * 0.16}), ${highlight}`
                  : `${shadow.soft}, ${highlight}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14,
                opacity: k,
                transform: `scale(${0.94 + k * 0.06})`,
              }}
            >
              {r.keploy ? (
                <Img src={staticFile('keploy-mark.svg')} style={{height: 42}} />
              ) : null}
              <span style={{fontFamily: sans, fontSize: 31, fontWeight: 700, color: C.text}}>
                {r.label}
              </span>
              {r.sub ? (
                <span style={{fontFamily: mono, fontSize: 23, color: C.textDim}}>{r.sub}</span>
              ) : null}
            </div>

            {edge ? (
              <div
                style={{
                  height: GAP,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 18,
                  paddingLeft: 40,
                  ...enter(frame, fps, at + i * 10 + 16, 10),
                }}
              >
                {/* the hop */}
                <svg width="46" height={GAP} style={{flexShrink: 0}}>
                  <line
                    x1="23"
                    y1="0"
                    x2="23"
                    y2={GAP - 12}
                    stroke={edge.tone === 'fail' ? C.exposed : C.masked}
                    strokeWidth="3.5"
                    strokeDasharray={edge.locked ? '7 8' : undefined}
                  />
                  <polygon
                    points={`23,${GAP} 16,${GAP - 13} 30,${GAP - 13}`}
                    fill={edge.tone === 'fail' ? C.exposed : C.masked}
                  />
                </svg>
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 25,
                    fontWeight: 500,
                    color: edge.tone === 'fail' ? C.exposed : C.masked,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {edge.label}
                </span>
                <span
                  style={{
                    fontFamily: sans,
                    fontSize: 25,
                    fontWeight: 600,
                    color: edge.tone === 'fail' ? C.exposed : C.masked,
                    marginLeft: 'auto',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {edge.tone === 'fail' ? '✕ ' : '✓ '}
                  {edge.detail}
                </span>
              </div>
            ) : null}
          </React.Fragment>
        );
      })}
    </div>
  );
};

/**
 * The diagnostic. One question, two outcomes, and the answer tells you which
 * of two completely different problems you have.
 */
export const DecisionBranch: React.FC<{
  question: string;
  left: {answer: string; verdict: string; detail: string};
  right: {answer: string; verdict: string; detail: string};
  at?: number;
  width?: number;
}> = ({question, left, right, at = 0, width = W}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const draw = interpolate(frame, [at + 14, at + 34], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const card = (
    o: {answer: string; verdict: string; detail: string},
    tone: 'fail' | 'orange',
    delay: number,
  ) => {
    const fail = tone === 'fail';
    return (
      <div
        style={{
          ...enter(frame, fps, at + delay, 16),
          flex: 1,
          minWidth: 0,
          background: C.bg,
          border: `2px solid ${fail ? 'rgba(225,29,72,0.34)' : 'rgba(247,107,28,0.42)'}`,
          borderRadius: radius.lg,
          boxShadow: `${shadow.soft}, ${highlight}`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: fail ? 'rgba(225,29,72,0.09)' : 'rgba(247,107,28,0.09)',
            borderBottom: `1.5px solid ${fail ? 'rgba(225,29,72,0.22)' : 'rgba(247,107,28,0.26)'}`,
            padding: '13px 20px',
            fontFamily: mono,
            fontSize: 24,
            fontWeight: 500,
            letterSpacing: 0.6,
            color: fail ? C.exposed : C.orangeDeep,
          }}
        >
          {o.answer}
        </div>
        <div style={{padding: '18px 20px 20px'}}>
          <div
            style={{
              fontFamily: sans,
              fontSize: 27,
              fontWeight: 700,
              color: C.text,
              lineHeight: 1.28,
              marginBottom: 9,
            }}
          >
            {o.verdict}
          </div>
          <div style={{fontFamily: sans, fontSize: 24, fontWeight: 500, color: C.textDim}}>
            {o.detail}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{width, display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <div
        style={{
          ...enter(frame, fps, at, 14),
          fontFamily: mono,
          fontSize: 27,
          fontWeight: 500,
          color: C.text,
          background: C.bgDeep,
          border: `1.5px solid ${C.codeStroke}`,
          borderRadius: radius.md,
          padding: '17px 26px',
        }}
      >
        {question}
      </div>

      <svg width={width} height="58" style={{display: 'block'}}>
        <path
          d={`M ${width / 2} 0 V 26 M ${width / 2} 26 H ${(width - 20) / 4} V 58`}
          stroke={C.exposed}
          strokeWidth="3"
          fill="none"
          strokeDasharray="400"
          strokeDashoffset={400 * (1 - draw)}
        />
        <path
          d={`M ${width / 2} 26 H ${width - (width - 20) / 4} V 58`}
          stroke={C.orange}
          strokeWidth="3"
          fill="none"
          strokeDasharray="400"
          strokeDashoffset={400 * (1 - draw)}
        />
      </svg>

      <div style={{display: 'flex', gap: 20, width: '100%'}}>
        {card(left, 'fail', 40)}
        {card(right, 'orange', 48)}
      </div>
    </div>
  );
};
