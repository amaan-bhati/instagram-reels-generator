import React from 'react';
import {Img, staticFile} from 'remotion';
import {colors as C, canvas, grad, type as T} from '../theme';
import {sans} from './fonts';

/** DESIGN §2: DM Sans, headings 700, tight letter-spacing. */
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

/** Gradient headline text. For the line that has to land. */
export const GradText: React.FC<{
  children: React.ReactNode;
  size?: number;
  g?: string;
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}> = ({children, size = 70, g = grad.brand, align = 'center', style}) => (
  <div
    style={{
      fontFamily: sans,
      fontWeight: 700,
      fontSize: size,
      lineHeight: 1.14,
      letterSpacing: -1.6,
      textAlign: align,
      background: g,
      WebkitBackgroundClip: 'text',
      backgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      color: 'transparent',
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
 * Sits in the caption band ABOVE the platform-UI zone: never in the bottom third.
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
      top: canvas.captionTop,
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

/** The real Keploy logo (single-line lockup), from public/keploy-logo.svg. */
export const KeployMark: React.FC<{size?: number}> = ({size = 50}) => (
  <Img src={staticFile('keploy-logo.svg')} style={{height: size * 1.85}} />
);
