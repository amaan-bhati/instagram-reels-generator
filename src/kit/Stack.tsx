import React from 'react';
import {AbsoluteFill} from 'remotion';
import {canvas} from '../theme';

/** Centres scene content inside the safe zone. DESIGN §0.6. */
export const Stage: React.FC<{children: React.ReactNode; gap?: number; offsetY?: number}> = ({
  children,
  gap = 34,
  offsetY = -40,
}) => (
  <AbsoluteFill
    style={{
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      gap,
      paddingTop: canvas.safeTop,
      paddingBottom: canvas.height - canvas.safeBottom + 150,
      paddingLeft: canvas.gutter,
      paddingRight: canvas.gutter,
      transform: `translateY(${offsetY}px)`,
    }}
  >
    {children}
  </AbsoluteFill>
);
