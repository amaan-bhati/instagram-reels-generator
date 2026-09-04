import React from 'react';
import {colors as C, radius, type as T} from '../theme';
import {mono, sans} from './fonts';

export type Status = 'pass' | 'fail' | 'unwritten' | 'untested';

/**
 * DESIGN §6 — pass/fail is ALWAYS colour + icon + label. Never colour alone.
 * Every status here carries all three.
 */
const cfg: Record<Status, {icon: string; fg: string; label: string; dim?: boolean}> = {
  pass: {icon: '✓', fg: C.masked, label: 'PASS'},
  fail: {icon: '✕', fg: C.exposed, label: 'FAILED'},
  unwritten: {icon: '○', fg: C.textFaint, label: 'NOT WRITTEN', dim: true},
  untested: {icon: '—', fg: C.textFaint, label: 'NO TEST', dim: true},
};

export const TestRow: React.FC<{
  text: string;
  status: Status;
  code?: boolean;
  fontSize?: number;
  style?: React.CSSProperties;
}> = ({text, status, code = true, fontSize = T.minBody, style}) => {
  const c = cfg[status];
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '14px 26px',
        borderRadius: radius.md,
        background: status === 'fail' ? C.exposedBg : status === 'pass' ? 'rgba(5,150,105,0.07)' : C.bgDeep,
        border: `1.5px solid ${
          status === 'fail'
            ? 'rgba(220,38,38,0.30)'
            : status === 'pass'
              ? 'rgba(5,150,105,0.22)'
              : C.codeStroke
        }`,
        opacity: c.dim ? 0.72 : 1,
        ...style,
      }}
    >
      <span style={{fontFamily: sans, fontSize: fontSize + 6, color: c.fg, width: 26, fontWeight: 700}}>
        {c.icon}
      </span>
      <span
        style={{
          fontFamily: code ? mono : sans,
          fontSize,
          color: c.dim ? C.textDim : C.text,
          fontWeight: code ? 500 : 600,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {text}
      </span>
      <span
        style={{
          marginLeft: 'auto',
          fontFamily: sans,
          fontSize: fontSize - 8,
          fontWeight: 700,
          letterSpacing: 1.1,
          color: c.fg,
          flexShrink: 0,
        }}
      >
        {c.label}
      </span>
    </div>
  );
};
