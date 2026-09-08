import React from 'react';
import {useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {colors as C, grad, highlight, radius, shadow} from '../theme';
import {mono, sans} from './fonts';

export type Check = {
  /** the thing to look at */
  check: string;
  /** what it means when the answer is no */
  ifNot: string;
  /** highlight the row the viewer is actually standing on */
  active?: boolean;
};

/**
 * An ordered checklist where one row is marked as "you are here".
 *
 * A flat list of things to try is the weakest form of troubleshooting content,
 * because the viewer still has to work out which one applies to them. Ordering
 * the checks so that each one rules out a whole class of cause, and then
 * highlighting the row that produces THIS symptom, turns the list into a
 * position: everything above is already eliminated.
 */
export const Checklist: React.FC<{
  items: Check[];
  at?: number;
  stagger?: number;
  width?: number;
}> = ({items, at = 0, stagger = 12, width = 900}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{width, display: 'flex', flexDirection: 'column', gap: 12}}>
      {items.map((it, i) => (
        <div
          key={it.check}
          style={{
            ...enter(frame, fps, at + i * stagger, 16),
            display: 'flex',
            alignItems: 'flex-start',
            gap: 18,
            padding: '17px 22px',
            borderRadius: radius.md,
            background: it.active ? grad.brandSoft : grad.neutral,
            border: `${it.active ? 2 : 1.5}px solid ${
              it.active ? 'rgba(247,107,28,0.45)' : C.codeStroke
            }`,
            boxShadow: it.active ? `${shadow.orange}, ${highlight}` : undefined,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 99,
              flexShrink: 0,
              marginTop: 2,
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: it.active ? grad.brand : C.bg,
              border: it.active ? 'none' : `1.5px solid ${C.codeStroke}`,
              fontFamily: sans,
              fontSize: 20,
              fontWeight: 700,
              color: it.active ? C.onBrand : C.textDim,
            }}
          >
            {i + 1}
          </span>
          <span style={{display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0}}>
            <span
              style={{
                fontFamily: mono,
                fontSize: 26,
                fontWeight: 500,
                color: C.text,
                whiteSpace: 'nowrap',
              }}
            >
              {it.check}
            </span>
            <span
              style={{
                fontFamily: sans,
                fontSize: 23,
                fontWeight: 500,
                color: it.active ? C.orangeDeep : C.textDim,
              }}
            >
              {it.ifNot}
            </span>
          </span>
          {it.active ? (
            <span
              style={{
                marginLeft: 'auto',
                alignSelf: 'center',
                flexShrink: 0,
                fontFamily: sans,
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: 1,
                color: C.onBrand,
                background: grad.brand,
                borderRadius: radius.pill,
                padding: '8px 16px',
                whiteSpace: 'nowrap',
              }}
            >
              YOU ARE HERE
            </span>
          ) : null}
        </div>
      ))}
    </div>
  );
};

export type EnvFix = {
  env: string;
  lines: string[];
  note?: string;
};

/**
 * The same fix in every environment it has to be applied in.
 *
 * Stacked rather than tabbed on purpose: troubleshooting reels get screenshotted
 * for later, and a tab the viewer never saw is a tab they cannot paste from.
 */
export const EnvFixList: React.FC<{
  fixes: EnvFix[];
  at?: number;
  stagger?: number;
  width?: number;
}> = ({fixes, at = 0, stagger = 14, width = 900}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();

  return (
    <div style={{width, display: 'flex', flexDirection: 'column', gap: 14}}>
      {fixes.map((f, i) => (
        <div
          key={f.env}
          style={{
            ...enter(frame, fps, at + i * stagger, 16),
            background: C.bg,
            border: `1.5px solid ${C.codeStroke}`,
            borderRadius: radius.md,
            boxShadow: `${shadow.soft}, ${highlight}`,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              padding: '12px 20px',
              background: grad.neutral,
              borderBottom: `1.5px solid ${C.codeStroke}`,
            }}
          >
            <span
              style={{
                fontFamily: sans,
                fontSize: 21,
                fontWeight: 700,
                letterSpacing: 1,
                color: C.onBrand,
                background: grad.brand,
                borderRadius: radius.sm,
                padding: '6px 14px',
              }}
            >
              {f.env}
            </span>
            {f.note ? (
              <span style={{fontFamily: sans, fontSize: 22, fontWeight: 500, color: C.textDim}}>
                {f.note}
              </span>
            ) : null}
          </div>
          <div style={{padding: '15px 20px 17px', display: 'flex', flexDirection: 'column', gap: 7}}>
            {f.lines.map((l) => (
              <span
                key={l}
                style={{
                  fontFamily: mono,
                  fontSize: 25,
                  fontWeight: 500,
                  color: l.startsWith('#') ? C.textFaint : C.text,
                  whiteSpace: 'pre',
                }}
              >
                {l}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
