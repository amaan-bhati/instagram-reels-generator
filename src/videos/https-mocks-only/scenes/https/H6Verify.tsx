import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import {enter} from '../../../../lib/anim';
import {Camera} from '../../../../kit/Camera';
import {FileTree, type TreeNode} from '../../../../kit/FileTree';
import {Stage} from '../../../../kit/Stack';
import {Caption, Heading} from '../../../../kit/Text';
import {HT} from '../../timelineHttps';

/** Same tree as scene 1, one badge different. The fix reads as a diff. */
const TREE: TreeNode[] = [
  {name: 'keploy/', depth: 0, kind: 'dir'},
  {name: 'mocks.yaml', depth: 1, kind: 'file', status: 'filled', note: '6 mocks'},
  {name: 'test-set-0/', depth: 1, kind: 'dir'},
  {name: 'tests/', depth: 2, kind: 'dir', status: 'filled', note: '4 test cases'},
];

export const H6Verify: React.FC = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  return (
    <AbsoluteFill>
      <Camera duration={HT.verify} zoom={0.026}>
        <Stage gap={26}>
          <div style={{...enter(frame, fps, 0), marginBottom: 2}}>
            <Heading size={50}>Then the tree fills in.</Heading>
          </div>
          <FileTree nodes={TREE} title="keploy" at={14} stagger={7} width={900} />
        </Stage>
      </Camera>
      <Caption opacity={enter(frame, fps, 110).opacity}>
        Same command. Same app. Now over TLS.
      </Caption>
    </AbsoluteFill>
  );
};
