import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {colors as C, grad, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

export type TreeNode = {
  name: string;
  depth: number;
  kind: 'dir' | 'file';
  /** filled = has content, empty = exists but has nothing in it */
  status?: 'filled' | 'empty';
  note?: string;
};

const glyph = (n: TreeNode, isLast: boolean) => {
  if (n.depth === 0) return '';
  return '   '.repeat(n.depth - 1) + (isLast ? '└─ ' : '├─ ');
};

/**
 * A directory listing, because the symptom in this video IS a directory
 * listing. Showing the tree is more convincing than describing it, and the
 * same component renders the before and the after so the fix is legible as a
 * diff rather than a claim.
 */
export const FileTree: React.FC<{
  nodes: TreeNode[];
  title?: string;
  at?: number;
  stagger?: number;
  width?: number;
  fontSize?: number;
}> = ({nodes, title = 'keploy', at = 0, stagger = 5, width = 900, fontSize = 27}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div
      style={{
        width,
        background: C.codeBg,
        border: `1.5px solid ${C.codeStroke}`,
        borderRadius: radius.lg,
        boxShadow: `${shadow.card}, ${highlight}`,
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          background: C.codeBar,
          borderBottom: `1.5px solid ${C.codeStroke}`,
          padding: '18px 26px',
          display: 'flex',
          alignItems: 'center',
          gap: 14,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{width: 11, height: 11, borderRadius: 99, background: C.textFaint, opacity: 0.5}}
          />
        ))}
        <span style={{fontFamily: mono, fontSize: 24, color: C.textDim, fontWeight: 500}}>
          {title}
        </span>
      </div>

      <div style={{padding: '20px 26px 24px'}}>
        {nodes.map((n, i) => {
          const nextSameDepth = nodes.slice(i + 1).find((m) => m.depth <= n.depth);
          const isLast = !nextSameDepth || nextSameDepth.depth < n.depth;
          const filled = n.status === 'filled';
          const empty = n.status === 'empty';
          return (
            <div
              key={n.name + i}
              style={{
                ...enter(frame, fps, at + i * stagger, 12),
                display: 'flex',
                alignItems: 'center',
                gap: 14,
                minHeight: fontSize * 1.72,
              }}
            >
              <span
                style={{
                  fontFamily: mono,
                  fontSize,
                  color: n.kind === 'dir' ? C.text : C.textDim,
                  fontWeight: n.kind === 'dir' ? 500 : 400,
                  whiteSpace: 'pre',
                }}
              >
                {glyph(n, isLast)}
                {n.name}
              </span>
              {n.note ? (
                <span
                  style={{
                    marginLeft: 'auto',
                    fontFamily: sans,
                    fontSize: fontSize - 6,
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    color: filled ? C.masked : empty ? C.exposed : C.textFaint,
                    background: filled ? grad.passSoft : empty ? grad.failSoft : 'transparent',
                    border: `1.5px solid ${
                      filled
                        ? 'rgba(5,150,105,0.30)'
                        : empty
                          ? 'rgba(225,29,72,0.32)'
                          : 'transparent'
                    }`,
                    borderRadius: radius.pill,
                    padding: '5px 14px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {filled ? '✓ ' : empty ? '✕ ' : ''}
                  {n.note}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
};
