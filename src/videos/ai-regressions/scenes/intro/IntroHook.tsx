import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {DotGrid} from '../../../../kit/DotGrid';
import {WordFlash, spreadWords, type FlashWord} from '../../../../kit/WordFlash';

/**
 * The opening hook, one word at a time.
 *
 * Grouped as the brief described, so "the tests" and "with AI" each land as a
 * single beat rather than being split into filler words. Two words carry the
 * gradient instead of the stroke: `break`, which is the threat, and `AI`, which
 * is the cause. Everything between them is outlined black, so the two coloured
 * beats are the only things the eye is pulled to.
 *
 * TIMING IS PROVISIONAL. `spreadWords` distributes the words across the span by
 * syllable count, which is a reasonable guess and nothing more. Once the
 * recording with this line exists, the onsets come from the audio instead and
 * every word lands on the syllable that says it.
 */
const UNITS = [
  'your', 'app', 'is', 'going', 'to', 'break', 'in', 'production',
  'if', "you're", 'still', 'writing', 'the tests', 'with AI',
];
const HIT = new Set(['break', 'with AI']);

export const IntroHook: React.FC<{
  /** real onsets in frames, one per unit. Omit to fall back to even spread. */
  onsets?: number[];
}> = ({onsets}) => {
  const {durationInFrames} = useVideoConfig();
  useCurrentFrame();

  const words: FlashWord[] = onsets
    ? UNITS.map((word, i) => ({word, at: onsets[i], hit: HIT.has(word)}))
    : spreadWords(UNITS, 2, durationInFrames - 6).map((w) => ({
        ...w,
        hit: HIT.has(w.word),
      }));

  return (
    <AbsoluteFill>
      <DotGrid />
      <WordFlash words={words} size={132} strokeWidth={14} />
    </AbsoluteFill>
  );
};
