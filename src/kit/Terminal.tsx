import React from 'react';
import {colors as C, highlight, radius, shadow, type as T} from '../theme';
import {mono, sans} from './fonts';

export type TermLine = {
  text: string;
  tone?: 'cmd' | 'dim' | 'pass' | 'fail' | 'orange';
};

const toneColor = {
  cmd: C.text,
  dim: C.textDim,
  pass: C.masked,
  fail: C.exposed,
  orange: C.orangeDeep,
};

/**
 * Light terminal card. DESIGN §0.1 — never dark, even for a terminal.
 *
 * NOTE: DESIGN §0.4 requires REAL captured output. These lines are modelled on
 * Keploy's actual CLI but are NOT a capture — swap for a real screen recording
 * (<OffthreadVideo>) before shipping. See README "Before you ship".
 */
export const Terminal: React.FC<{
  title?: string;
  lines: TermLine[];
  visible?: number;
  width?: number;
  fontSize?: number;
  badge?: React.ReactNode;
  style?: React.CSSProperties;
}> = ({title = 'bash', lines, visible, width = 900, fontSize = T.code, badge, style}) => {
  const n = visible ?? lines.length;
  return (
    <div
      style={{
        width,
        background: C.codeBg,
        border: `1.5px solid ${C.codeStroke}`,
        borderRadius: radius.lg,
        boxShadow: `${shadow.card}, ${highlight}`,
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          background: C.codeBar,
          borderBottom: `1.5px solid ${C.codeStroke}`,
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div style={{display: 'flex', gap: 9}}>
          {[0, 1, 2].map((i) => (
            <div key={i} style={{width: 12, height: 12, borderRadius: 99, background: C.textFaint, opacity: 0.55}} />
          ))}
        </div>
        <span style={{fontFamily: mono, fontSize: 25, color: C.textDim, fontWeight: 500}}>{title}</span>
        <div style={{marginLeft: 'auto', fontFamily: sans}}>{badge}</div>
      </div>
      <div style={{padding: '26px 30px 32px', minHeight: 120}}>
        {lines.slice(0, n).map((l, i) => (
          <div
            key={i}
            style={{
              fontFamily: mono,
              fontSize,
              lineHeight: 1.72,
              color: toneColor[l.tone ?? 'dim'],
              fontWeight: l.tone === 'cmd' || l.tone === 'fail' ? 500 : 400,
              whiteSpace: 'pre',
            }}
          >
            {l.tone === 'cmd' ? <span style={{color: C.orange, fontWeight: 700}}>$ </span> : null}
            {l.text}
          </div>
        ))}
      </div>
    </div>
  );
};
