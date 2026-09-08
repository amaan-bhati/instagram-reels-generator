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
 * Two phases in one beat.
 *
 * Frames 0 to 61: the PetClinic API calling PostgreSQL, Redis and the Mail API
 * itself. No Keploy on screen. This is the state the viewer already recognises.
 *
 * Frame 62 onward: Keploy lands in the middle of those exact paths and starts
 * recording. The hub band is reserved from the first frame and the curves run
 * through it, so nothing moves when it appears; it arrives ON the path.
 *
 * The previous version skipped straight to the second state, and a reviewer
 * read the fan out below Keploy as Keploy turning into Postgres. Showing the
 * first state removes the ambiguity rather than annotating around it.
 *
 * Latencies and call counts are illustrative. DESIGN 0.4 wants real captures,
 * so swap them for a real recording before this ships.
 */
const DEPS: Dep[] = [
  {key: 'postgres', name: 'PostgreSQL', latency: '35ms', calls: '4 calls', fill: 0.58},
  {key: 'redis', name: 'Redis', latency: '12ms', calls: '2 calls', fill: 0.3},
  {key: 'mail', name: 'Mail API', latency: '48ms', calls: '1 call', fill: 0.42},
];

const HUB_AT = 62;

export const S6Record: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const landed = frame >= HUB_AT;

  return (
    <AbsoluteFill>
      <Camera duration={PX.record} zoom={0.02} origin="50% 46%">
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>
              Keploy learns your app
              <br />
              from real traffic.
            </Heading>
          </div>

          <DepFlow
            phase={landed ? 'record' : 'direct'}
            hubAt={HUB_AT}
            route={{method: 'POST', path: '/api/visits', status: '201'}}
            app="PetClinic API"
            dependencies={DEPS}
            flowAt={10}
          />

          <div style={{...enter(frame, fps, 108), marginTop: 4}}>
            <Chip
              label={landed ? 'every call in and out, captured' : 'your app, calling its own dependencies'}
              tone={landed ? 'brand' : 'neutral'}
              size={26}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 128).opacity}>
        It slots into the path you already have.
      </Caption>
    </AbsoluteFill>
  );
};
