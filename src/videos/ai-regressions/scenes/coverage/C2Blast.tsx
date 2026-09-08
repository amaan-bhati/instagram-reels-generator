import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {FeatureMap, type Feature} from '../../../../kit/FeatureMap';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {colors as C} from '../../../../theme';
import {CV} from '../../timelineCoverage';

const FEATURES: Feature[] = [
  {label: '/api/owners', state: 'ok', breaksAt: 48},
  {label: '/api/visits', state: 'edited'},
  {label: '/api/pettypes', state: 'ok', breaksAt: 60},
  {label: '/api/vets', state: 'ok'},
  {label: '/api/pets', state: 'ok', breaksAt: 72},
  {label: '/api/specialties', state: 'ok'},
];

export const C2Blast: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={CV.blast} zoom={0.028}>
        <Stage gap={28}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={52}>
              Then it changed one thing,
              <br />
              and broke three others.
            </Heading>
          </div>
          <div style={enter(frame, fps, 4)}>
            <FeatureMap features={FEATURES} source={1} rippleAt={28} />
          </div>
          <div style={{display: 'flex', gap: 13, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 84)}>
              <Chip label="1 endpoint changed" tone="orange" size={27} />
            </div>
            <div style={enter(frame, fps, 89)}>
              <Chip label="3 broken elsewhere" tone="fail" size={27} />
            </div>
            <div style={enter(frame, fps, 94)}>
              <Chip label="AI never checked them" tone="pass" size={27} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 100).opacity}>
        <span style={{color: C.text}}>Regressions shipped.</span>
        <br />
        <span style={{color: C.exposed}}>Your users found them first.</span>
      </Caption>
    </AbsoluteFill>
  );
};
