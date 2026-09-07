import React from 'react';
import {AbsoluteFill} from 'remotion';
import {colors as C} from '../theme';

/** DESIGN §0.1: pure white bg + faint dot grid. Never dark. */
export const DotGrid: React.FC<{gap?: number}> = ({gap = 44}) => (
  <AbsoluteFill
    style={{
      backgroundColor: C.bg,
      backgroundImage: `radial-gradient(${C.dot} 2.2px, transparent 2.2px)`,
      backgroundSize: `${gap}px ${gap}px`,
    }}
  />
);
