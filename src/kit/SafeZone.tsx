import React from 'react';
import {AbsoluteFill} from 'remotion';
import {canvas} from '../theme';
import {sans} from './fonts';

/**
 * Dev-only overlay. Red = covered by the platform's own UI (profile, caption,
 * action rail). Nothing legible may sit inside it.
 */
export const SafeZone: React.FC<{show?: boolean}> = ({show}) => {
  if (!show) return null;
  const label: React.CSSProperties = {
    position: 'absolute',
    fontFamily: sans,
    fontSize: 26,
    fontWeight: 700,
    color: 'rgba(220,38,38,0.85)',
    left: 20,
  };
  return (
    <AbsoluteFill>
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: canvas.safeTop,
          background: 'rgba(242,106,33,0.14)',
          borderBottom: '2px dashed rgba(242,106,33,0.7)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: canvas.safeBottom,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(220,38,38,0.16)',
          borderTop: '3px dashed rgba(220,38,38,0.8)',
        }}
      />
      <div style={{...label, top: canvas.safeBottom + 16}}>
        platform UI, keep clear
      </div>
      <div
        style={{
          position: 'absolute',
          top: canvas.captionTop,
          left: canvas.gutter,
          right: canvas.gutter,
          height: 120,
          border: '2px dashed rgba(37,99,235,0.55)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: canvas.gutter,
          width: canvas.width - canvas.gutter * 2,
          border: '2px dashed rgba(242,106,33,0.40)',
        }}
      />
    </AbsoluteFill>
  );
};
