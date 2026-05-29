import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const DelayNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const delayMs = data.delayMs ?? 1000;

  return (
    <BaseNode
      title="Delay Node"
      description="Pauses the pipeline for the configured number of milliseconds."
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
    >
      <NodeField label="Delay (ms)">
        <input
          type="number"
          min="0"
          step="100"
          value={delayMs}
          onChange={(event) => updateNodeData(id, { delayMs: Number(event.target.value) })}
          style={nodeControlStyle}
        />
      </NodeField>
    </BaseNode>
  );
};
