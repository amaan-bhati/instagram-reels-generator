import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, settle} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {canvas} from '../../../../theme';
import {TestRunStack, type RunItem} from '../../../../kit/TestRunStack';
import {Caption, Heading} from '../../../../kit/Text';
import {AT} from '../../timelineFromAudio11';

/**
 * The closer.
 *
 * This used to be a five row strip crammed under the replay diagram, and the
 * beat after it was a Buggy panel with a confidence score. Both are gone: the
 * verification gets its own beat with eleven rows, and the reel ends here.
 *
 * The verdict panel was reporting what this scene shows. Four failures landing
 * in front of you is the same information as a card saying one test failed,
 * except you watch it happen and it costs 4.5s less.
 *
 * Eleven rows and four failures, because five rows with one failure read as a
 * tidy demo. A real run is messier than that, and the pile underneath says
 * these eleven are only the top of it.
 */
const RUN: RunItem[] = [
  {at: 8, result: 'pass', w: 0.72},
  {at: 15, result: 'pass', w: 0.54},
  {at: 22, result: 'fail', w: 0.83},
  {at: 29, result: 'pass', w: 0.46},
  {at: 36, result: 'pass', w: 0.66},
  {at: 43, result: 'fail', w: 0.58},
  {at: 50, result: 'pass', w: 0.78},
  {at: 57, result: 'fail', w: 0.5},
  {at: 64, result: 'pass', w: 0.62},
  {at: 71, result: 'pass', w: 0.74},
  {at: 78, result: 'fail', w: 0.68},
];

/**
 * NO VERTICAL CENTRING, for the same reason as the opening beat.
 *
 * `Stage` centres its content in the safe band, which is correct when the
 * content is all present from frame one. Here it is not: eleven rows arrive one
 * at a time, so centring grew the block in both directions and walked the
 * heading up the screen for four seconds while the viewer was reading it.
 *
 * The block is pinned to a top derived from the FINAL measured height, so the
 * heading sits from the first frame exactly where it ends up, and the rows fill
 * in underneath. The camera origin sits on the heading too, because pushIn
 * scales the scene and anything above the origin travels upward with it.
 */
const ROW_H = 34;
const ROW_GAP = 8;
const STACK_DEPTH = 4;

const H_HEADING = 52;
const H_CHIP = 52;
const H_STACK = RUN.length * ROW_H + (RUN.length - 1) * ROW_GAP;
const H_GHOSTS = STACK_DEPTH * 9;
const GAPS = 18 + 22;
const TOTAL = H_HEADING + H_CHIP + H_STACK + H_GHOSTS + GAPS;
const TOP = canvas.safeTop + Math.round((canvas.stageBottom - canvas.safeTop - TOTAL) / 2);

export const Y9Verify: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera
        duration={AT.verify}
        zoom={0.018}
        origin={`50% ${((TOP + 6) / canvas.height) * 100}%`}
      >
        <AbsoluteFill>
          <div
            style={{
              position: 'absolute',
              top: TOP,
              left: canvas.gutter,
              right: canvas.gutter,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* opacity only. The shared `enter` also rises 26px, which would
                move the one element that must not move. */}
            <div style={{opacity: settle(frame, fps, 0), height: H_HEADING, marginBottom: 18}}>
              <Heading size={44}>And Keploy verifies each one instantly.</Heading>
            </div>

            <div style={{...enter(frame, fps, 8), height: H_CHIP, marginBottom: 22}}>
              <Chip
                label="every test and every edge case, checked and verified"
                tone="brand"
                size={24}
              />
            </div>

            <div style={{height: H_STACK}}>
              <TestRunStack
                items={RUN}
                depth={STACK_DEPTH}
                width={880}
                rowHeight={ROW_H}
              />
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
      <Caption opacity={enter(frame, fps, 92).opacity}>
        Every test, every edge case, end to end, in one run.
      </Caption>
    </AbsoluteFill>
  );
};
