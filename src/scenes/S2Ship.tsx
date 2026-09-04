import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, typeChars} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {CodeCard} from '../kit/CodeCard';
import {Stage} from '../kit/Stack';
import {Caption, Sub} from '../kit/Text';
import {colors as C} from '../theme';
import {D} from '../timeline';

const CODE = [
  'export async function checkout(req, res) {',
  '  const cart = await getCart(req.userId)',
  '  const off = discount(cart, req.body.code)',
  '  return res.json({ total: cart.total - off })',
  '}',
];

const BLOCK = CODE.join('\n');

export const S2Ship: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const typed = typeChars(BLOCK, frame, 22, 78, fps);

  return (
    <AbsoluteFill>
      <Camera duration={D.s2Ship} zoom={0.03}>
        <Stage gap={30}>
          <div style={{...enter(frame, fps, 0), display: 'flex', alignItems: 'center', gap: 16}}>
            <Sub size={30} color={C.textFaint}>
              you asked for
            </Sub>
            <Chip label="add discount codes at checkout" tone="orange" size={28} />
          </div>
          <div style={enter(frame, fps, 12)}>
            <CodeCard
              title="checkout.js"
              chip={<Chip label="AI-generated" tone="neutral" size={22} />}
              lines={CODE}
              revealChars={typed.length}
              width={900}
              fontSize={27}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 88).opacity}>
        It writes the feature — and the test that checks it.
      </Caption>
    </AbsoluteFill>
  );
};
