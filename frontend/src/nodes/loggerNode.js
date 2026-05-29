import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const LoggerNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const level = data.level ?? 'info';
  const prefix = data.prefix ?? 'Pipeline';

  return (
    <BaseNode
      title="Logger Node"
      description="Records a message with the selected log level and prefix."
      inputs={[{ id: 'message' }]}
      outputs={[{ id: 'logged' }]}
    >
      <NodeField label="Level">
        <select
          value={level}
          onChange={(event) => updateNodeData(id, { level: event.target.value })}
          style={nodeControlStyle}
        >
          <option value="debug">Debug</option>
          <option value="info">Info</option>
          <option value="warn">Warn</option>
          <option value="error">Error</option>
        </select>
      </NodeField>
      <NodeField label="Prefix">
        <input
          value={prefix}
          onChange={(event) => updateNodeData(id, { prefix: event.target.value })}
          style={nodeControlStyle}
        />
      </NodeField>
    </BaseNode>
  );
};
