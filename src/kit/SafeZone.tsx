import React from 'react';
import {AbsoluteFill} from 'remotion';
import {canvas} from '../theme';

/**
 * Dev-only overlay. DESIGN §0.6 — critical content above y ~1790.
 * Top band approximates the IG/LinkedIn chrome that covers the frame.
 * Toggle via the `safeZone` prop on the composition; never on in a render.
 */
export const SafeZone: React.FC<{show?: boolean}> = ({show}) => {
  if (!show) return null;
  const band: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    right: 0,
    background: 'rgba(242,106,33,0.16)',
    borderTop: '2px dashed rgba(242,106,33,0.7)',
    borderBottom: '2px dashed rgba(242,106,33,0.7)',
  };
  return (
    <AbsoluteFill>
      <div style={{...band, top: 0, height: canvas.safeTop}} />
      <div style={{...band, top: canvas.safeBottom, bottom: 0}} />
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: canvas.gutter,
          width: canvas.width - canvas.gutter * 2,
          border: '2px dashed rgba(242,106,33,0.45)',
        }}
      />
    </AbsoluteFill>
  );
};
