import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Checklist, type Check} from '../../../../kit/Checklist';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {H2} from '../../timelineHttps2';

/**
 * Ordered so each check rules out a whole class of cause, cheapest first.
 *
 * 1 and 2 and 3 are all "Keploy never got into the path". If any of them is the
 * problem, mocks.yaml would ALSO be empty. Since it is not, they are already
 * eliminated, and 4 is the only row left. Marking it is what turns a list of
 * things to try into a diagnosis.
 */
const CHECKS: Check[] = [
  {
    check: 'is mocks.yaml populated?',
    ifNot: 'if it is empty, Keploy never attached at all',
  },
  {
    check: 'did keploy start the app, with -c?',
    ifNot: 'attaching to an already running process misses the sockets',
  },
  {
    check: 'enough privileges for eBPF?',
    ifNot: 'without root or CAP_BPF the hooks never load',
  },
  {
    check: 'does the app trust Keploy CA?',
    ifNot: 'traffic is seen, but stays encrypted. This is mocks only.',
    active: true,
  },
];

export const V4Checklist: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={H2.checklist} zoom={0.02} origin="50% 46%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={46}>Work down the list, cheapest first.</Heading>
          </div>
          <Checklist items={CHECKS} at={14} stagger={26} width={900} />
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 178).opacity}>
        Mocks exist, so one to three already passed.
      </Caption>
    </AbsoluteFill>
  );
};
