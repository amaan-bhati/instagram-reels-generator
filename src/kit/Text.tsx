import React from 'react';
import {colors as C, canvas, type as T} from '../theme';
import {sans} from './fonts';

/** DESIGN §2 — DM Sans, headings 700, tight letter-spacing. */
export const Heading: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}> = ({children, size = 76, color = C.text, align = 'center', style}) => (
  <div
    style={{
      fontFamily: sans,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.14,
      letterSpacing: -1.6,
      color,
      textAlign: align,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Sub: React.FC<{
  children: React.ReactNode;
  size?: number;
  color?: string;
  style?: React.CSSProperties;
}> = ({children, size = T.minBody + 6, color = C.textDim, style}) => (
  <div
    style={{
      fontFamily: sans,
      fontWeight: 500,
      fontSize: size,
      lineHeight: 1.42,
      color,
      textAlign: 'center',
      ...style,
    }}
  >
    {children}
  </div>
);

/**
 * Burned-in caption. This reel has no voiceover, so the caption line IS the script.
 * Pinned above the bottom safe zone (DESIGN §0.6).
 */
export const Caption: React.FC<{children: React.ReactNode; opacity?: number}> = ({
  children,
  opacity = 1,
}) => (
  <div
    style={{
      position: 'absolute',
      left: canvas.gutter,
      right: canvas.gutter,
      top: canvas.safeBottom - 132,
      textAlign: 'center',
      fontFamily: sans,
      fontWeight: 600,
      fontSize: 40,
      lineHeight: 1.3,
      letterSpacing: -0.4,
      color: C.text,
      opacity,
    }}
  >
    {children}
  </div>
);

/** Wordmark placeholder — swap for the real Keploy logo asset when you have it. */
export const KeployMark: React.FC<{size?: number}> = ({size = 46}) => (
  <div style={{display: 'inline-flex', alignItems: 'center', gap: 16}}>
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 14,
        background: `linear-gradient(135deg, ${C.orange} 0%, ${C.orangeDeep} 100%)`,
        boxShadow: '0 8px 22px rgba(242,106,33,0.30)',
      }}
    />
    <span
      style={{
        fontFamily: sans,
        fontWeight: 700,
        fontSize: size * 0.86,
        color: C.text,
        letterSpacing: -1,
      }}
    >
      keploy
    </span>
  </div>
);
