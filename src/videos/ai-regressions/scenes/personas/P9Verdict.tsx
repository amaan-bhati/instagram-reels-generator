import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Stage} from '../../../../kit/Stack';
import {SuiteRow} from '../../../../kit/TestCaseCard';
import {Caption, Heading} from '../../../../kit/Text';
import {AssertionRow, VerdictCard} from '../../../../kit/VerdictCard';
import {mono} from '../../../../kit/fonts';
import {PS} from '../../timelinePersonas';

/** The /api/pettypes regression from scene 2, caught. Shortest explanation of the three cuts. */
export const P9Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={PS.verdict} zoom={0.02} origin="50% 44%">
        <Stage gap={20}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={46}>And catches the one you missed.</Heading>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <div style={enter(frame, fps, 4)}>
              <SuiteRow name="Delete_Visit" count={7} status="fail" width={900} fontSize={29} />
            </div>
            <div style={enter(frame, fps, 9)}>
              <SuiteRow name="Vet_CRUD_Lifecycle" count={7} status="pass" width={900} fontSize={29} />
            </div>
          </div>

          <div style={enter(frame, fps, 18)}>
            <VerdictCard
              suite="Delete_Visit"
              step="Get PetType ID for Snake"
              badge="Buggy"
              confidence={95}
              countAt={40}
              width={900}
              explanation={
                <>
                  Returned 404. The endpoint{' '}
                  <span style={{fontFamily: mono, fontSize: 27, whiteSpace: 'nowrap'}}>
                    /api/pettypes
                  </span>{' '}
                  no longer resolves, so the recorded request cannot complete.
                </>
              }
            />
          </div>

          <div style={enter(frame, fps, 62)}>
            <AssertionRow got="404" want="200" width={900} />
          </div>

          <div style={{...enter(frame, fps, 78), marginTop: 4}}>
            <Chip label="fix it yourself, or hand it to your AI" tone="brand" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 90).opacity}>
        Before your users do.
      </Caption>
    </AbsoluteFill>
  );
};
