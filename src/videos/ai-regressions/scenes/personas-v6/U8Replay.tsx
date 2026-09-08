import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {DepFlow, type Dep} from '../../../../kit/DepFlow';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PZ} from '../../timelinePersonasV6';

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

export const U8Replay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PZ.replay} zoom={0.02} origin="50% 46%">
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


        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 90).opacity}>
        Against the mocks it captured, not your database.
      </Caption>
    </AbsoluteFill>
  );
};
