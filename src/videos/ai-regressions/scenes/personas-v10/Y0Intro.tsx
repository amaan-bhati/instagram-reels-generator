import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, settle} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DotGrid} from '../../../../kit/DotGrid';
import {FailureBanner} from '../../../../kit/TestRunStack';
import {WritingList, type WrittenRow} from '../../../../kit/WritingList';
import {Heading} from '../../../../kit/Text';
import {canvas} from '../../../../theme';
import {AT} from '../../timelineFromAudio11';

/**
 * The opening beat: the claim, then the proof of it, in one frame.
 *
 * NO VERTICAL CENTRING. Every other scene in this reel centres its content in
 * the safe band, which is right when the content is all present from the first
 * frame. Here it is not: rows arrive one at a time and a banner lands at the
 * end, so centring made the block grow downward AND upward, and the heading
 * crept up the screen for four seconds. A heading that moves while you are
 * reading it is worse than a heading in a slightly wrong place.
 *
 * So the block is pinned to a fixed top, computed from the FINAL height. The
 * heading sits from frame one exactly where it sits at the end, and everything
 * else fills in underneath it.
 */
const ROWS: WrittenRow[] = [
  {at: 16, w: 0.68},
  {at: 25, w: 0.52},
  {at: 34, w: 0.79},
  {at: 43, w: 0.44},
  {at: 52, w: 0.63},
  {at: 61, w: 0.74},
  {at: 70, w: 0.57},
];

const LIST_W = 880;
const ROW_H = 40;
const GAP = 8;

/** Measured end state, so the pin can be derived instead of guessed. */
const H_HEADING = 100;
const H_CHIP = 50;
const H_LIST = ROWS.length * ROW_H + (ROWS.length - 1) * GAP;
const H_BANNER = 86;
const GAPS = 20 + 20 + 24;
const TOTAL = H_HEADING + H_CHIP + H_LIST + H_BANNER + GAPS;
const TOP = canvas.safeTop + Math.round((canvas.stageBottom - canvas.safeTop - TOTAL) / 2);

export const Y0Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <DotGrid />
      {/*
        Camera origin sits ON the heading, not at 40% height.
        pushIn scales the whole scene, and anything above the origin travels
        upward as it does. With the origin on the heading the heading is the
        fixed point of the transform and the rest of the block grows away from
        it, which keeps the camera moving (DESIGN 0.5) without moving the one
        element that must not move.
      */}
      <Camera duration={AT.intro} zoom={0.018} origin={`50% ${((TOP + 6) / canvas.height) * 100}%`}>
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
            {/*
              Opacity only. The shared `enter` helper also rises 26px, which is
              right for content arriving into a settled layout and wrong for a
              heading whose whole job is to be already in place.
            */}
            <div
              style={{
                opacity: settle(frame, fps, 0),
                height: H_HEADING,
                marginBottom: 20,
              }}
            >
              <Heading size={42}>
                Your app is going to break in production
                <br />
                if you&rsquo;re writing the tests with AI.
              </Heading>
            </div>

            <div style={{...enter(frame, fps, 10), height: H_CHIP, marginBottom: 20}}>
              <Chip label="AI writing your tests" tone="neutral" size={26} />
            </div>

            <div style={{height: H_LIST}}>
              <WritingList rows={ROWS} width={LIST_W} rowHeight={ROW_H} gap={GAP} />
            </div>

            <div style={{marginTop: 24, height: H_BANNER}}>
              <FailureBanner label="N number of features broke in production" at={92} width={LIST_W} />
            </div>
          </div>
        </AbsoluteFill>
      </Camera>
    </AbsoluteFill>
  );
};
