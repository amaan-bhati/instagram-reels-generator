import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../lib/anim';
import {Camera} from '../../kit/Camera';
import {Chip} from '../../kit/Chip';
import {FeatureMap, type Feature} from '../../kit/FeatureMap';
import {Stage} from '../../kit/Stack';
import {Caption, Heading} from '../../kit/Text';
import {colors as C} from '../../theme';
import {S} from '../../timelineShort';

/**
 * The entire problem in one beat. No scene explaining that AI writes its own
 * tests, no scene asking it to cover the gaps. The shockwave says it: one
 * change, three things broken, and nothing was watching.
 */
const FEATURES: Feature[] = [
  {label: '/api/owners', state: 'ok', breaksAt: 66},
  {label: '/api/visits', state: 'edited'},
  {label: '/api/pettypes', state: 'ok', breaksAt: 82},
  {label: '/api/vets', state: 'ok'},
  {label: '/api/pets', state: 'ok', breaksAt: 98},
  {label: '/api/specialties', state: 'ok'},
];

export const SH2Blast: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={S.blast} zoom={0.03}>
        <Stage gap={28}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={52}>
              Then it changed one thing,
              <br />
              and broke three others.
            </Heading>
          </div>

          <div style={enter(frame, fps, 8)}>
            <FeatureMap features={FEATURES} source={1} rippleAt={42} />
          </div>

          <div style={{display: 'flex', gap: 13, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 112)}>
              <Chip label="1 endpoint changed" tone="orange" size={27} />
            </div>
            <div style={enter(frame, fps, 118)}>
              <Chip label="3 broken elsewhere" tone="fail" size={27} />
            </div>
            <div style={enter(frame, fps, 124)}>
              <Chip label="AI never checked them" tone="pass" size={27} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 140).opacity}>
        <span style={{color: C.text}}>Regressions shipped.</span>
        <br />
        <span style={{color: C.exposed}}>Your users found them first.</span>
      </Caption>
    </AbsoluteFill>
  );
};
