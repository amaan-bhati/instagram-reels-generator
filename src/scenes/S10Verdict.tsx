import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../lib/anim';
import {Camera} from '../kit/Camera';
import {Chip} from '../kit/Chip';
import {Stage} from '../kit/Stack';
import {SuiteRow} from '../kit/TestCaseCard';
import {Caption, Heading} from '../kit/Text';
import {AssertionRow, VerdictCard} from '../kit/VerdictCard';
import {mono} from '../kit/fonts';
import {D} from '../timeline';

/**
 * The result, not the command. Failing suites first, then Keploy's own
 * explanation panel with its confidence, then the assertion that failed,
 * then the out: fix it yourself or hand it to your AI.
 *
 * Modelled on the real Keploy UI (screenshot in brand/).
 */
export const S10Verdict: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={D.s10Verdict} zoom={0.022} origin="50% 44%">
        <Stage gap={20}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={46}>And it shows you exactly what broke.</Heading>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: 12}}>
            <div style={enter(frame, fps, 10)}>
              <SuiteRow name="Delete_Visit" count={7} status="fail" width={900} fontSize={29} />
            </div>
            <div style={enter(frame, fps, 16)}>
              <SuiteRow name="Vet_CRUD_Lifecycle" count={7} status="pass" width={900} fontSize={29} />
            </div>
          </div>

          <div style={enter(frame, fps, 40)}>
            <VerdictCard
              suite="Delete_Visit"
              step="Get PetType ID for Snake"
              badge="Buggy"
              confidence={95}
              countAt={74}
              width={900}
              explanation={
                <>
                  Returned 404 for this step. The endpoint{' '}
                  <span style={{fontFamily: mono, fontSize: 27, whiteSpace: 'nowrap'}}>
                    /api/pettypes
                  </span>{' '}
                  no longer resolves, so the recorded request cannot complete. This contradicts
                  the documented API schema.
                </>
              }
            />
          </div>

          <div style={enter(frame, fps, 106)}>
            <AssertionRow got="404" want="200" width={900} />
          </div>

          <div style={{...enter(frame, fps, 130), marginTop: 4}}>
            <Chip label="fix it yourself, or hand it to your AI" tone="brand" size={27} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 152).opacity}>
        What broke, why, and how sure it is.
      </Caption>
    </AbsoluteFill>
  );
};
