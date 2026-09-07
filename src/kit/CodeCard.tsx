import React from 'react';
import {colors as C, highlight, radius, shadow, type as T} from '../theme';
import {mono, sans} from './fonts';
import {hl, TOK} from './hl';

export type Mark = {line: number; match: string; tone: 'fail' | 'orange' | 'pass'};
export type Tint = {line: number; tone: 'fail' | 'pass' | 'orange'};

const tintBg = {
  fail: C.exposedBg,
  pass: 'rgba(5,150,105,0.12)',
  orange: 'rgba(242,106,33,0.10)',
};

/** DESIGN §5: red OUTLINE box for the failure token, orange FILL for the cause. */
const markStyle = (tone: Mark['tone']): React.CSSProperties =>
  tone === 'fail'
    ? {
        border: `2.5px solid ${C.exposed}`,
        borderRadius: 6,
        padding: '1px 6px',
        margin: '0 -2px',
        color: C.exposed,
        fontWeight: 500,
      }
    : tone === 'orange'
      ? {
          background: 'rgba(242,106,33,0.22)',
          borderRadius: 6,
          padding: '1px 6px',
          margin: '0 -2px',
          color: C.orangeDeep,
          fontWeight: 500,
        }
      : {
          background: 'rgba(5,150,105,0.18)',
          borderRadius: 6,
          padding: '1px 6px',
          margin: '0 -2px',
          color: C.masked,
          fontWeight: 500,
        };

const Spans: React.FC<{text: string}> = ({text}) => (
  <>
    {hl(text).map((tk, i) => (
      <span key={i} style={{color: TOK[tk.c]}}>
        {tk.t}
      </span>
    ))}
  </>
);

const Line: React.FC<{text: string; mark?: Mark}> = ({text, mark}) => {
  if (!mark || !text.includes(mark.match)) return <Spans text={text} />;
  const i = text.indexOf(mark.match);
  return (
    <>
      <Spans text={text.slice(0, i)} />
      <span style={{...markStyle(mark.tone), fontFamily: mono}}>{mark.match}</span>
      <Spans text={text.slice(i + mark.match.length)} />
    </>
  );
};

export const CodeCard: React.FC<{
  title: string;
  chip?: React.ReactNode;
  lines: string[];
  /** Progressive reveal across the whole block. Omit to show all. */
  revealChars?: number;
  marks?: Mark[];
  tints?: Tint[];
  width?: number;
  fontSize?: number;
  lineNumbers?: boolean;
  style?: React.CSSProperties;
}> = ({
  title,
  chip,
  lines,
  revealChars,
  marks = [],
  tints = [],
  width = 900,
  fontSize = T.code,
  lineNumbers = true,
  style,
}) => {
  // Progressive reveal: walk the block char-by-char across lines.
  let budget = revealChars ?? Infinity;
  const shown = lines.map((l) => {
    if (budget <= 0) return null;
    const take = Math.min(l.length, budget);
    budget -= l.length + 1; // +1 for the newline
    return l.slice(0, take);
  });

  return (
    <div
      style={{
        width,
        background: C.codeBg,
        border: `1.5px solid ${C.codeStroke}`,
        borderRadius: radius.lg,
        boxShadow: `${shadow.card}, ${highlight}`,
        overflow: 'hidden',
        ...style,
      }}
    >
      {/* title bar */}
      <div
        style={{
          background: C.codeBar,
          borderBottom: `1.5px solid ${C.codeStroke}`,
          padding: '20px 28px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <div style={{display: 'flex', gap: 9}}>
          {[C.textFaint, C.textFaint, C.textFaint].map((d, i) => (
            <div key={i} style={{width: 12, height: 12, borderRadius: 99, background: d, opacity: 0.55}} />
          ))}
        </div>
        <span style={{fontFamily: mono, fontSize: 25, color: C.textDim, fontWeight: 500}}>{title}</span>
        <div style={{marginLeft: 'auto', fontFamily: sans}}>{chip}</div>
      </div>

      {/* code body */}
      <div style={{padding: '26px 28px 30px'}}>
        {lines.map((raw, i) => {
          const text = shown[i];
          const tint = tints.find((t) => t.line === i);
          const mark = marks.find((m) => m.line === i);
          return (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 22,
                alignItems: 'baseline',
                background: tint ? tintBg[tint.tone] : undefined,
                borderLeft: tint ? `4px solid ${tint.tone === 'fail' ? C.exposed : tint.tone === 'pass' ? C.masked : C.orange}` : '4px solid transparent',
                margin: '0 -28px',
                padding: '5px 28px 5px 24px',
                minHeight: fontSize * 1.62,
              }}
            >
              {lineNumbers && (
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: fontSize - 3,
                    color: C.textFaint,
                    width: 30,
                    textAlign: 'right',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
              )}
              <span
                style={{
                  fontFamily: mono,
                  fontSize,
                  lineHeight: 1.62,
                  whiteSpace: 'pre', // DESIGN §2: nowrap, lines must not wrap
                  color: C.text,
                }}
              >
                {text === null ? '' : <Line text={text} mark={mark} />}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
