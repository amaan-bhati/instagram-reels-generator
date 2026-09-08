import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DepFlow, type Dep} from '../../../../kit/DepFlow';
import {Stage} from '../../../../kit/Stack';
import {TestRunStack, type RunItem} from '../../../../kit/TestRunStack';
import {Caption, Heading} from '../../../../kit/Text';
import {PY} from '../../timelinePersonasV5';

/**
 * "REPLAYING EVERY ONE" was a label with nothing behind it, and a reviewer
 * asked the obvious question: replaying WHAT?
 *
 * So the answer is on screen underneath the diagram. Every recorded case lands
 * as a pending row, then resolves to pass or fail, sitting on top of a deeper
 * pile of ghost rows. Keploy calls the mocks, the mocks answer, and the verdict
 * arrives, all in one frame.
 *
 * Four pass, one fails. The failure is the one the verdict beat then opens up.
 */
const DEPS: Dep[] = [
  {key: 'postgres', name: 'Postgres', latency: '0ms', calls: '4 calls', fill: 0.58},
  {key: 'redis', name: 'Redis', latency: '0ms', calls: '2 calls', fill: 0.3},
  {key: 'mail', name: 'Mail API', latency: '0ms', calls: '1 call', fill: 0.42},
];

const RUN: RunItem[] = [
  {at: 54, result: 'pass', w: 0.72},
  {at: 62, result: 'pass', w: 0.54},
  {at: 70, result: 'fail', w: 0.83},
  {at: 78, result: 'pass', w: 0.46},
  {at: 86, result: 'pass', w: 0.66},
];

export const T8Replay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PY.replay} zoom={0.016} origin="50% 42%">
        <Stage gap={18}>
          <div style={{...enter(frame, fps, 0), marginBottom: 0}}>
            <Heading size={46}>Then it replays every recorded case.</Heading>
          </div>

          <DepFlow
            cards="oneCard"
            phase="replay"
            hubAt={4}
            app="Your app"
            dependencies={DEPS}
            flowAt={12}
          />

          <div style={{...enter(frame, fps, 44), marginTop: 6}}>
            <Chip label="Keploy answers, not your database" tone="brand" size={25} />
          </div>

          <div style={{marginTop: 4}}>
            <TestRunStack items={RUN} depth={4} width={880} rowHeight={40} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 132).opacity}>
        Every case it recorded. Verified, one by one.
      </Caption>
    </AbsoluteFill>
  );
};
