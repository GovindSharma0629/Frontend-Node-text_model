import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const OutputNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const outputName = data.outputName ?? 'output';
  const outputType = data.outputType ?? 'Text';

  return (
    <BaseNode
      title="Output Node"
      description="Collects the final pipeline result and formats it for output."
      inputs={[{ id: 'input' }]}
    >
      <NodeField label="Name">
        <input
          value={outputName}
          onChange={(event) => updateNodeData(id, { outputName: event.target.value })}
          style={nodeControlStyle}
        />
      </NodeField>
      <NodeField label="Format">
        <select
          value={outputType}
          onChange={(event) => updateNodeData(id, { outputType: event.target.value })}
          style={nodeControlStyle}
        >
          <option>Text</option>
          <option>JSON</option>
          <option>Markdown</option>
          <option>File</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
