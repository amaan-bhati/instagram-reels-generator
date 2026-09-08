import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Stage} from '../../../../kit/Stack';
import {TestRunStack, type RunItem} from '../../../../kit/TestRunStack';
import {Caption, Heading} from '../../../../kit/Text';
import {QA} from '../../timelinePersonasV7';

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
  {at: 14, result: 'pass', w: 0.72},
  {at: 22, result: 'pass', w: 0.54},
  {at: 30, result: 'fail', w: 0.83},
  {at: 38, result: 'pass', w: 0.46},
  {at: 46, result: 'pass', w: 0.66},
  {at: 54, result: 'fail', w: 0.58},
  {at: 62, result: 'pass', w: 0.78},
  {at: 70, result: 'fail', w: 0.5},
  {at: 78, result: 'pass', w: 0.62},
  {at: 86, result: 'pass', w: 0.74},
  {at: 94, result: 'fail', w: 0.68},
];

export const V9Verify: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={QA.verify} zoom={0.018} origin="50% 44%">
        <Stage gap={18}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={44}>And Keploy verifies each one instantly.</Heading>
          </div>

          <div style={{...enter(frame, fps, 8), marginBottom: 4}}>
            <Chip label="every test and every edge case, checked and verified" tone="brand" size={24} />
          </div>

          <TestRunStack items={RUN} depth={4} width={880} rowHeight={34} />
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 150).opacity}>
        Every test, every edge case, end to end, in one run.
      </Caption>
    </AbsoluteFill>
  );
};
