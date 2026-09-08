import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DepFlow, type Dep} from '../../../../kit/DepFlow';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {PX} from '../../timelinePersonasV4';

/**
 * Replay, with Keploy as the actor rather than the observer.
 *
 * Recording is something done TO the app. Replay is something Keploy does, and
 * the old version did not show that: it looked like the app making the same
 * calls again with Keploy watching. Now the dependency cards are dashed and
 * read `mocked`, the traffic dots run UPWARD from the mocks back to Keploy,
 * and the app is labelled `under test`. Keploy asks, the mocks answer, the
 * real database is never touched.
 */
const DEPS: Dep[] = [
  {key: 'postgres', name: 'PostgreSQL', latency: '0ms', calls: '4 calls', fill: 0.58},
  {key: 'redis', name: 'Redis', latency: '0ms', calls: '2 calls', fill: 0.3},
  {key: 'mail', name: 'Mail API', latency: '0ms', calls: '1 call', fill: 0.42},
];

export const S8Replay: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PX.replay} zoom={0.02} origin="50% 46%">
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>Then Keploy replays every one.</Heading>
          </div>

          <DepFlow
            phase="replay"
            hubAt={4}
            route={{method: 'POST', path: '/api/visits', status: 'replay'}}
            app="PetClinic API"
            dependencies={DEPS}
            flowAt={14}
          />

          <div style={{display: 'flex', gap: 12, marginTop: 4, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 74)}>
              <Chip label="Keploy answers, not your database" tone="brand" size={26} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 98).opacity}>
        Any drift shows up instantly.
      </Caption>
    </AbsoluteFill>
  );
};
