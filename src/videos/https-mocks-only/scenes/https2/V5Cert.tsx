import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {EnvFixList, type EnvFix} from '../../../../kit/Checklist';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {H2} from '../../timelineHttps2';

/**
 * The same certificate, in the three places the brief named.
 *
 * Every command here is standard platform behaviour, not a Keploy invention,
 * which is why it is safe to show concretely:
 *   local   SSL_CERT_FILE is read by Go crypto/x509 on unix
 *   docker  /usr/local/share/ca-certificates + update-ca-certificates is the
 *           documented Debian and Ubuntu trust store flow
 *   go      SSL_CERT_DIR is the directory form of the same lookup
 *
 * The one thing that genuinely varies, the CA path itself, stays a placeholder
 * with a chip saying so. See SCRIPT-HTTPS-V2.md.
 */
const FIXES: EnvFix[] = [
  {
    env: 'LOCAL MACHINE',
    note: 'run before keploy record',
    lines: ['export SSL_CERT_FILE=/path/to/keploy/ca.crt'],
  },
  {
    env: 'DOCKER',
    note: 'bake it into the image',
    lines: [
      'COPY ca.crt /usr/local/share/ca-certificates/',
      'RUN update-ca-certificates',
    ],
  },
  {
    env: 'GO RUNTIME',
    note: 'what actually reads it',
    lines: ['crypto/x509  ->  SSL_CERT_FILE, SSL_CERT_DIR'],
  },
];

export const V5Cert: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={H2.cert} zoom={0.02} origin="50% 46%">
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={46}>
              So trust the CA wherever
              <br />
              the app actually runs.
            </Heading>
          </div>

          <EnvFixList fixes={FIXES} at={14} stagger={30} width={900} />

          <div style={{display: 'flex', gap: 13, marginTop: 8, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 190)}>
              <Chip label="all three are standard platform behaviour" tone="neutral" size={25} />
            </div>
            <div style={enter(frame, fps, 198)}>
              <Chip label="confirm the CA path for your version" tone="orange" size={25} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 224).opacity}>
        One certificate. Three places to install it.
      </Caption>
    </AbsoluteFill>
  );
};
