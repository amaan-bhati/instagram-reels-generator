import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {Stage} from '../../../../kit/Stack';
import {TlsFlow} from '../../../../kit/TlsFlow';
import {Caption, Heading} from '../../../../kit/Text';
import {HT} from '../../timelineHttps';

/**
 * The explanation, and the reason the symptom looks so strange.
 *
 * Keploy captures ingress and egress as two separate things. Ingress becomes
 * test cases, egress becomes mocks. Over HTTPS the ingress hop is encrypted so
 * no request can be lifted out of it, while the hop to a local Postgres is
 * still plaintext and records perfectly. The tool is succeeding and failing on
 * the same run, which is exactly what "mocks only" is.
 */
export const H3Why: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={HT.why} zoom={0.022} origin="50% 46%">
        <Stage gap={24}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={48}>Keploy records two streams.</Heading>
          </div>

          <TlsFlow
            at={12}
            width={900}
            rows={[
              {label: 'Client'},
              {label: 'Keploy', sub: '+ your Gin app', keploy: true},
              {label: 'Postgres'},
            ]}
            edges={[
              {label: 'TLS encrypted', detail: 'ingress: no test case', tone: 'fail', locked: true},
              {label: 'plaintext', detail: 'egress: mock written', tone: 'pass'},
            ]}
          />

          <div style={{...enter(frame, fps, 112), marginTop: 6}}>
            <Chip label="which is why mocks.yaml fills up anyway" tone="orange" size={26} />
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 134).opacity}>
        One stream it can read. One it cannot.
      </Caption>
    </AbsoluteFill>
  );
};
