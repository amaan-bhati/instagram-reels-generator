import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Stage} from '../../../../kit/Stack';
import {DecisionBranch} from '../../../../kit/TlsFlow';
import {Caption, Heading} from '../../../../kit/Text';
import {HT} from '../../timelineHttps';

/**
 * Because the two failure modes leave different evidence, one question
 * separates them. This is the part a viewer can actually run.
 */
export const H4Diagnostic: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={HT.diagnostic} zoom={0.022} origin="50% 46%">
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>So check one thing first.</Heading>
          </div>
          <DecisionBranch
            at={14}
            width={900}
            question="is mocks.yaml empty too?"
            left={{
              answer: 'YES',
              verdict: 'Keploy is not in the path.',
              detail: 'A wiring problem. Check the command and the privileges.',
            }}
            right={{
              answer: 'NO',
              verdict: 'Keploy is in the path.',
              detail: 'It just cannot decrypt. A certificate problem.',
            }}
          />
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 120).opacity}>
        Two different bugs. One question.
      </Caption>
    </AbsoluteFill>
  );
};
