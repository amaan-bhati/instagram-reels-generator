import React from 'react';
import {AbsoluteFill} from 'remotion';
import {canvas} from '../theme';

/**
 * Centres scene content in the UPPER-MIDDLE of the frame.
 * The bottom ~580px is left empty on purpose: Instagram/LinkedIn paint the
 * profile row, caption and action rail there. See theme.ts `canvas`.
 */
export const Stage: React.FC<{children: React.ReactNode; gap?: number; offsetY?: number}> = ({
  children,
  gap = 30,
  offsetY = 0,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap,
      paddingTop: canvas.safeTop,
      paddingBottom: canvas.height - canvas.stageBottom,
      paddingLeft: canvas.gutter,
      paddingRight: canvas.gutter,
      transform: `translateY(${offsetY}px)`,
    }}
  >
    {children}
  </AbsoluteFill>
);
