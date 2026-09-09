import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {FeatureMap, type Feature} from '../../../../kit/FeatureMap';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {colors as C} from '../../../../theme';
import {AT} from '../../timelineFromAudio';

/**
 * v2 said "then it changed one thing, and broke three others", which is a fact
 * rather than an explanation. Three things are now stated instead of one:
 *
 *   the change was small, the blast radius was not
 *   its own tests still passed, so nothing warned anybody
 *   the people who found the regressions were the users, not you
 *
 * The middle chip is the important one. Without it the viewer assumes CI would
 * have caught this, and the whole reel loses its problem.
 */
const FEATURES: Feature[] = [
  {label: 'a', state: 'ok', breaksAt: 52},
  {label: 'b', state: 'edited'},
  {label: 'c', state: 'ok', breaksAt: 66},
  {label: 'd', state: 'ok'},
  {label: 'e', state: 'ok', breaksAt: 80},
  {label: 'f', state: 'ok'},
];

export const W2Blast: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={AT.blast} zoom={0.028}>
        <Stage gap={26}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>
              AI changed one thing.
              <br />
              The blast radius did the rest.
            </Heading>
          </div>
          <div style={enter(frame, fps, 8)}>
            <FeatureMap features={FEATURES} source={1} rippleAt={30} labelMode="skeleton" />
          </div>
          <div style={{display: 'flex', gap: 12, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 96)}>
              <Chip label="1 endpoint changed" tone="orange" size={26} />
            </div>
            <div style={enter(frame, fps, 102)}>
              <Chip label="3 broken elsewhere" tone="fail" size={26} />
            </div>
            <div style={enter(frame, fps, 108)}>
              <Chip label="its own tests still passed" tone="pass" size={26} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 120).opacity}>
        <span style={{color: C.text}}>So the regressions shipped.</span>
        <br />
        <span style={{color: C.exposed}}>Your users found them before you did.</span>
      </Caption>
    </AbsoluteFill>
  );
};
