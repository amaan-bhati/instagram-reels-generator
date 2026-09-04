import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Stage} from '../kit/Stack';
import {Heading, KeployMark, Sub} from '../kit/Text';
import {colors as C} from '../theme';
import {D} from '../timeline';

export const S7Payoff: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s7Payoff} zoom={0.026}>
        <Stage gap={30}>
          <div style={enter(frame, fps, 0)}>
            <Heading size={72}>Ship with AI.</Heading>
          </div>
          <div style={{...enter(frame, fps, 8), marginTop: -12}}>
            <Heading size={72} color={C.orangeDeep}>
              Just don&rsquo;t let it
              <br />
              grade its own homework.
            </Heading>
          </div>
          <div style={{...enter(frame, fps, 24), marginTop: 22}}>
            <Sub size={34}>
              Keploy replays your real traffic
              <br />
              to catch what changed.
            </Sub>
          </div>
          <div style={{...enter(frame, fps, 36), marginTop: 26}}>
            <KeployMark size={52} />
          </div>
        </Stage>
      </Camera>
    </AbsoluteFill>
  );
};
