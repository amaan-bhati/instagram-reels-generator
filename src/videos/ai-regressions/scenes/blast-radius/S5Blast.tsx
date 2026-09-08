import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {FeatureMap, type Feature} from '../../../../kit/FeatureMap';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {colors as C} from '../../../../theme';
import {D} from '../../timeline';

/**
 * The blast radius: the core argument of the reel.
 * The AI's change is local. The damage is not. And its own suite stays green,
 * because it only ever tested the thing it was looking at.
 */
const FEATURES: Feature[] = [
  {label: '/api/owners', state: 'ok', breaksAt: 76},
  {label: '/api/visits', state: 'edited'},
  {label: '/api/pettypes', state: 'ok', breaksAt: 94},
  {label: '/api/vets', state: 'ok'},
  {label: '/api/pets', state: 'ok', breaksAt: 112},
  {label: '/api/specialties', state: 'ok'},
];

export const S5Blast: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s5Blast} zoom={0.03}>
        <Stage gap={30}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={52}>
              But the fix reached
              <br />
              further than the fix.
            </Heading>
          </div>

          <div style={enter(frame, fps, 10)}>
            <FeatureMap features={FEATURES} source={1} rippleAt={50} />
          </div>

          <div style={{display: 'flex', gap: 14, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 126)}>
              <Chip label="1 endpoint changed" tone="orange" size={27} />
            </div>
            <div style={enter(frame, fps, 132)}>
              <Chip label="3 broken elsewhere" tone="fail" size={27} />
            </div>
            <div style={enter(frame, fps, 138)}>
              <Chip label="AI never checked them" tone="pass" size={27} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 152).opacity}>
        <span style={{color: C.text}}>One fix. Three regressions.</span>
        <br />
        <span style={{color: C.exposed}}>Straight to production.</span>
      </Caption>
    </AbsoluteFill>
  );
};
