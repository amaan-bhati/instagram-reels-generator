import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {breathe} from '../lib/anim';
import {colors as C, radius} from '../theme';
import {sans} from './fonts';

/** DESIGN §5: secondary motion always on: the REC dot breathes. */
export const RecDot: React.FC<{label?: string}> = ({label = 'REC'}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const b = breathe(frame, fps, 1.4);
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        background: C.exposedBg,
        border: '1.5px solid rgba(220,38,38,0.30)',
        borderRadius: radius.pill,
        padding: '10px 20px',
      }}
    >
      <span
        style={{
          width: 15,
          height: 15,
          borderRadius: 99,
          background: C.exposed,
          opacity: 0.45 + b * 0.55,
          boxShadow: `0 0 ${8 + b * 14}px rgba(220,38,38,${0.3 + b * 0.4})`,
        }}
      />
      <span style={{fontFamily: sans, fontSize: 24, fontWeight: 700, color: C.exposed, letterSpacing: 1}}>
        {label}
      </span>
    </span>
  );
};
