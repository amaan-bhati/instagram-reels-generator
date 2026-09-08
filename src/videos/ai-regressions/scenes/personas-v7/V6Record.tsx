import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {DepFlow, type Dep} from '../../../../kit/DepFlow';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {QA} from '../../timelinePersonasV7';

/**
 * One card for the app, with its route folded in. The separate request card
 * above it was saying the same thing a second time.
 *
 * Still two phases: the app calling its own dependencies for the first two
 * seconds, then Keploy landing on those exact paths. That sequence is what
 * stopped the diagram reading as Keploy turning into Postgres.
 *
 * Latencies and call counts are illustrative. Swap for a real capture.
 */
const DEPS: Dep[] = [
  {key: 'postgres', name: 'Postgres', latency: '35ms', calls: '4 calls', fill: 0.58},
  {key: 'redis', name: 'Redis', latency: '12ms', calls: '2 calls', fill: 0.3},
  {key: 'mail', name: 'Mail API', latency: '48ms', calls: '1 call', fill: 0.42},
];

const HUB_AT = 56;

export const V6Record: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const landed = frame >= HUB_AT;

  return (
    <AbsoluteFill>
      <Camera duration={QA.record} zoom={0.02} origin="50% 44%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>
              Keploy learns your app
              <br />
              from your real traffic.
            </Heading>
          </div>

          <DepFlow
            cards="oneCard"
            phase={landed ? 'record' : 'direct'}
            hubAt={HUB_AT}
            app="Your app"
            dependencies={DEPS}
            flowAt={8}
          />

          <div style={{...enter(frame, fps, 100), marginTop: 8}}>
            <Chip
              label={landed ? 'every call in and out, captured' : 'your app, calling its own dependencies'}
              tone={landed ? 'brand' : 'neutral'}
              size={26}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 118).opacity}>
        It slots into the path you already have.
      </Caption>
    </AbsoluteFill>
  );
};
