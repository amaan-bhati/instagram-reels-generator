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
import {S} from '../../timelineShort';

/** The regression that shipped in scene 2, caught. Same endpoint, closed loop. */
export const SH6Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={S.verdict} zoom={0.022} origin="50% 44%">
        <Stage gap={20}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={46}>And catches the regression you missed.</Heading>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <div style={enter(frame, fps, 8)}>
              <SuiteRow name="Delete_Visit" count={7} status="fail" width={900} fontSize={29} />
            </div>
            <div style={enter(frame, fps, 14)}>
              <SuiteRow name="Vet_CRUD_Lifecycle" count={7} status="pass" width={900} fontSize={29} />
            </div>
          </div>

          <div style={enter(frame, fps, 36)}>
            <VerdictCard
              suite="Delete_Visit"
              step="Get PetType ID for Snake"
              badge="Buggy"
              confidence={95}
              countAt={68}
              width={900}
              explanation={
                <>
                  Returned 404 for this step. The endpoint{' '}
                  <span style={{fontFamily: mono, fontSize: 27, whiteSpace: 'nowrap'}}>
                    /api/pettypes
                  </span>{' '}
                  no longer resolves, so the recorded request cannot complete.
                </>
              }
            />
          </div>

          <div style={enter(frame, fps, 100)}>
            <AssertionRow got="404" want="200" width={900} />
          </div>

          <div style={{...enter(frame, fps, 122), marginTop: 4}}>
            <Chip label="fix it yourself, or hand it to your AI" tone="brand" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 142).opacity}>
        Before your users do.
      </Caption>
    </AbsoluteFill>
  );
};
