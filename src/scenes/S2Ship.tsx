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

/** One example for the whole reel: PetClinic. */
const CODE = [
  'export async function createVisit(req, res) {',
  '  const pet = await getPet(req.body.petId)',
  '  const visit = await book(pet, req.body.at)',
  '  return res.json({ id: visit.id, at: visit.at })',
  '}',
];
const BLOCK = CODE.join('\n');

export const S2Ship: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const typed = typeChars(BLOCK, frame, 12, 132, fps);

  return (
    <AbsoluteFill>
      <Camera duration={D.s2Ship} zoom={0.03}>
        <Stage gap={28}>
          <div style={{...enter(frame, fps, 0), display: 'flex', alignItems: 'center', gap: 16}}>
            <Sub size={29} color={C.textFaint}>
              you asked for
            </Sub>
            <Chip label="let owners book a visit online" tone="orange" size={27} />
          </div>
          <div style={enter(frame, fps, 10)}>
            <CodeCard
              title="visit.controller.js"
              chip={<Chip label="AI-generated" tone="neutral" size={22} />}
              lines={CODE}
              revealChars={typed.length}
              width={900}
              fontSize={27}
            />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 58).opacity}>
        It writes the feature. And the test that checks it.
      </Caption>
    </AbsoluteFill>
  );
};
