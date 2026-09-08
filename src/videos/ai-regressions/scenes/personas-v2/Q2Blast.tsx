import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {FeatureMap, type Feature} from '../../../../kit/FeatureMap';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {colors as C} from '../../../../theme';
import {PV} from '../../timelinePersonasV2';

/**
 * 5.5s instead of 4.0s, and the tiles no longer carry readable paths.
 *
 * A viewer reported reading the endpoint names instead of the headline. The
 * paths were never the message: three of six broke is. So the labels are
 * shimmer bars and the eye has nothing to parse except the colour and count.
 */
const FEATURES: Feature[] = [
  {label: 'a', state: 'ok', breaksAt: 48},
  {label: 'b', state: 'edited'},
  {label: 'c', state: 'ok', breaksAt: 62},
  {label: 'd', state: 'ok'},
  {label: 'e', state: 'ok', breaksAt: 76},
  {label: 'f', state: 'ok'},
];

export const Q2Blast: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PV.blast} zoom={0.028}>
        <Stage gap={28}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={52}>
              Then it changed one thing,
              <br />
              and broke three others.
            </Heading>
          </div>
          <div style={enter(frame, fps, 8)}>
            <FeatureMap features={FEATURES} source={1} rippleAt={28} labelMode="skeleton" />
          </div>
          <div style={{display: 'flex', gap: 13, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 92)}>
              <Chip label="1 changed" tone="orange" size={27} />
            </div>
            <div style={enter(frame, fps, 98)}>
              <Chip label="3 broken elsewhere" tone="fail" size={27} />
            </div>
            <div style={enter(frame, fps, 104)}>
              <Chip label="AI never checked them" tone="pass" size={27} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 116).opacity}>
        <span style={{color: C.text}}>Regressions shipped.</span>
        <br />
        <span style={{color: C.exposed}}>Your users found them first.</span>
      </Caption>
    </AbsoluteFill>
  );
};
