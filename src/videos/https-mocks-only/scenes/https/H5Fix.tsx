import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter, typeChars} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {Chip} from '../../../../kit/Chip';
import {CodeCard} from '../../../../kit/CodeCard';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {HT} from '../../timelineHttps';

/**
 * The fix, kept honest.
 *
 * SSL_CERT_FILE is standard Go behaviour: crypto/x509 reads it on Unix to
 * override the system CA bundle. That part is verifiable and stated plainly.
 * The certificate PATH is deliberately written as a placeholder and flagged on
 * screen, because it moves between Keploy versions and setups, and a wrong
 * absolute path in a tutorial is worse than no path at all.
 */
const CODE = [
  '# 1. locate Keploy CA certificate',
  '#    path varies by version, check yours',
  'KEPLOY_CA=/path/to/keploy/ca.crt',
  '',
  '# 2. make the Go runtime trust it',
  'export SSL_CERT_FILE=$KEPLOY_CA',
  '',
  '# 3. record again',
  'keploy record -c "go run ."',
];
const BLOCK = CODE.join('\n');

export const H5Fix: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const typed = typeChars(BLOCK, frame, 20, 62, fps);

  return (
    <AbsoluteFill>
      <Camera duration={HT.fix} zoom={0.024} origin="50% 46%">
        <Stage gap={22}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={46}>
              Give the app a trust store
              <br />
              that includes Keploy.
            </Heading>
          </div>

          <div style={enter(frame, fps, 12)}>
            <CodeCard
              title="fix"
              lines={CODE}
              revealChars={typed.length}
              width={900}
              fontSize={27}
              lineNumbers={false}
            />
          </div>

          <div style={{display: 'flex', gap: 13, marginTop: 6, flexWrap: 'wrap', justifyContent: 'center'}}>
            <div style={enter(frame, fps, 145)}>
              <Chip label="SSL_CERT_FILE is standard Go, not Keploy specific" tone="neutral" size={25} />
            </div>
            <div style={enter(frame, fps, 153)}>
              <Chip label="confirm the CA path for your version" tone="orange" size={25} />
            </div>
          </div>
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 175).opacity}>
        Trust the CA, then record again.
      </Caption>
    </AbsoluteFill>
  );
};
