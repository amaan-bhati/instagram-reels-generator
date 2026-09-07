import React from 'react';
import {colors as C, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

export type Side = {
  heading: string;
  tone: 'neutral' | 'fail' | 'pass' | 'orange';
  rows: string[];
};

const tone = {
  neutral: {bd: C.codeStroke, fg: C.textDim, bg: C.bgDeep},
  fail: {bd: 'rgba(220,38,38,0.32)', fg: C.exposed, bg: C.exposedBg},
  pass: {bd: 'rgba(5,150,105,0.26)', fg: C.masked, bg: 'rgba(5,150,105,0.07)'},
  orange: {bd: 'rgba(242,106,33,0.36)', fg: C.orangeDeep, bg: 'rgba(242,106,33,0.09)'},
};

/** Two panels side by side: "what AI imagined" vs "what users actually send". */
export const Compare: React.FC<{left: Side; right: Side; width?: number}> = ({
  left,
  right,
  width = 900,
}) => {
  const panel = (s: Side) => {
    const t = tone[s.tone];
    return (
      <div
        style={{
          flex: 1,
          minWidth: 0,
          background: C.bg,
          border: `1.5px solid ${t.bd}`,
          borderRadius: radius.lg,
          boxShadow: `${shadow.soft}, ${highlight}`,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            background: t.bg,
            borderBottom: `1.5px solid ${t.bd}`,
            padding: '18px 22px',
            fontFamily: sans,
            fontSize: 24,
            fontWeight: 700,
            letterSpacing: 0.4,
            color: t.fg,
          }}
        >
          {s.heading}
        </div>
        <div style={{padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 14}}>
          {s.rows.map((r) => (
            <div
              key={r}
              style={{
                fontFamily: mono,
                fontSize: 24,
                fontWeight: 500,
                color: C.text,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {r}
            </div>
          ))}
        </div>
      </div>
    );
  };
  return <div style={{width, display: 'flex', gap: 20, alignItems: 'stretch'}}>{panel(left)}{panel(right)}</div>;
};
