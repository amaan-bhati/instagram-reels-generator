import React from 'react';
import {colors as C, radius} from '../theme';
import {mono, sans} from './fonts';

export type ChipTone = 'neutral' | 'orange' | 'pass' | 'fail';

const tones: Record<ChipTone, {bg: string; fg: string; bd: string}> = {
  neutral: {bg: C.bgDeep, fg: C.textDim, bd: C.codeStroke},
  orange: {bg: 'rgba(242,106,33,0.10)', fg: C.orangeDeep, bd: 'rgba(242,106,33,0.30)'},
  pass: {bg: 'rgba(5,150,105,0.10)', fg: C.masked, bd: 'rgba(5,150,105,0.28)'},
  fail: {bg: C.exposedBg, fg: C.exposed, bd: 'rgba(220,38,38,0.30)'},
};

export const Chip: React.FC<{
  label: string;
  tone?: ChipTone;
  code?: boolean;
  size?: number;
  style?: React.CSSProperties;
}> = ({label, tone = 'neutral', code, size = 26, style}) => {
  const t = tones[tone];
  return (
    <span
      style={{
        fontFamily: code ? mono : sans,
        fontWeight: code ? 500 : 600,
        fontSize: size,
        color: t.fg,
        background: t.bg,
        border: `1.5px solid ${t.bd}`,
        borderRadius: radius.pill,
        padding: `${Math.round(size * 0.34)}px ${Math.round(size * 0.68)}px`,
        letterSpacing: code ? 0 : 0.2,
        whiteSpace: 'nowrap',
        display: 'inline-block',
        ...style,
      }}
    >
      {label}
    </span>
  );
};
