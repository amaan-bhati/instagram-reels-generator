import React from 'react';
import {colors as C, grad, radius} from '../theme';
import {mono, sans} from './fonts';

export type ChipTone = 'neutral' | 'orange' | 'pass' | 'fail' | 'brand';

const tones: Record<ChipTone, {bg: string; fg: string; bd: string}> = {
  neutral: {bg: grad.neutral, fg: C.textDim, bd: C.codeStroke},
  orange: {bg: grad.brandSoft, fg: C.orangeDeep, bd: 'rgba(247,107,28,0.34)'},
  pass: {bg: grad.passSoft, fg: C.masked, bd: 'rgba(5,150,105,0.30)'},
  fail: {bg: grad.failSoft, fg: C.exposed, bd: 'rgba(225,29,72,0.32)'},
  /** filled brand gradient, white text. For the one thing that must pop. */
  brand: {bg: grad.brand, fg: '#FFFFFF', bd: 'transparent'},
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
        boxShadow: tone === 'brand' ? '0 8px 22px rgba(247,107,28,0.30)' : undefined,
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
