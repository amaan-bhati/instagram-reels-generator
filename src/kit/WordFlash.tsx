import React from 'react';
import {AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig} from 'remotion';
import {settle} from '../lib/anim';
import {colors as C} from '../theme';
import {sans} from './fonts';

export type FlashWord = {
  word: string;
  /** frame this word appears. It leaves when the next one arrives. */
  at: number;
  /** emphasise this word: gradient fill instead of solid */
  hit?: boolean;
};

/**
 * One word at a time, dead centre, each replacing the last.
 *
 * The whole point is that a scrolling viewer cannot skim it. A full sentence on
 * screen gets read in a glance and then ignored; a single word that keeps being
 * replaced holds the eye because there is always exactly one thing to read and
 * it is about to change.
 *
 * The stroke is doing real work rather than decoration. A reel gets watched at
 * arm's length on a bright screen, often over a busy feed, and a heavy outline
 * keeps the glyph edges separated from the background at any size. Rendered
 * with -webkit-text-stroke plus paint-order so the stroke sits BEHIND the fill:
 * without paint-order the outline eats into the letterforms and thins them.
 */
export const WordFlash: React.FC<{
  words: FlashWord[];
  /** frame the last word clears. Defaults to holding to the end of the scene. */
  endAt?: number;
  size?: number;
  strokeWidth?: number;
  /**
   * Stroke colour. Defaults to brand orange, because a stroke in the same
   * colour as the fill is invisible: it only thickens the letters. A
   * contrasting rim is what actually separates the glyph from a bright feed.
   */
  strokeColor?: string;
}> = ({words, endAt, size = 128, strokeWidth = 16, strokeColor = C.orangeDeep}) => {
  const frame = useCurrentFrame();
  const {fps, durationInFrames} = useVideoConfig();
  const last = endAt ?? durationInFrames;

  const idx = words.reduce((acc, w, i) => (frame >= w.at ? i : acc), -1);
  if (idx < 0) return null;

  const current = words[idx];
  const next = words[idx + 1];
  const out = next ? next.at : last;

  // pop in on the settled spring, then a small drift so it is never static
  const k = settle(frame, fps, current.at);
  const life = interpolate(frame, [current.at, out], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  // fade only in the last sliver of its life, so the swap reads as a cut
  const fade = interpolate(life, [0, 0.06, 0.86, 1], [0, 1, 1, 0.15], {
    extrapolateRight: 'clamp',
  });
  const scale = 0.82 + k * 0.18 + life * 0.03;

  /*
   * Drawn as SVG text rather than styled HTML.
   *
   * -webkit-text-stroke was the obvious route and it does not deliver here:
   * the stroke is centred on the glyph outline so half of it hides under the
   * fill, and in this renderer it came out as a hairline regardless of the
   * width given, in px or unitless. Two stacked HTML layers did not fix it
   * either.
   *
   * SVG text with paint-order="stroke" is specified rather than vendor
   * prefixed: the stroke is painted first, at full width, and the fill lands
   * on top of it. That produces the rim the eye registers while scrolling,
   * with the width actually being the width asked for.
   */
  const W = 1080;
  const H = Math.round(size * 1.9);

  return (
    <AbsoluteFill style={{alignItems: 'center', justifyContent: 'center'}}>
      <svg
        width={W}
        height={H}
        viewBox={`0 0 ${W} ${H}`}
        style={{opacity: fade, transform: `scale(${scale})`, overflow: 'visible'}}
      >
        <text
          x={W / 2}
          y={H / 2}
          textAnchor="middle"
          dominantBaseline="central"
          fontFamily={sans}
          fontWeight={700}
          fontSize={size}
          letterSpacing={-3}
          fill={current.hit ? C.orangeDeep : C.text}
          stroke={current.hit ? C.text : strokeColor}
          strokeWidth={strokeWidth}
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {current.word}
        </text>
      </svg>
    </AbsoluteFill>
  );
};

/**
 * Spreads words across a span, weighted by syllable count so longer words get
 * longer on screen. Only a fallback: real onsets from the recording are always
 * better, and scripts-audio-timeline.mjs can supply them.
 */
export const spreadWords = (
  words: string[],
  startFrame: number,
  endFrame: number,
): {word: string; at: number}[] => {
  const syll = (w: string) =>
    Math.max(1, (w.toLowerCase().replace(/[^a-z]/g, '').match(/[aeiouy]+/g) ?? ['a']).length);
  const weights = words.map(syll);
  const total = weights.reduce((a, b) => a + b, 0);
  const span = endFrame - startFrame;
  let acc = 0;
  return words.map((w, i) => {
    const at = Math.round(startFrame + (acc / total) * span);
    acc += weights[i];
    return {word: w, at};
  });
};
