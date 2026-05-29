import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const InputNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const inputName = data.inputName ?? 'input';
  const inputType = data.inputType ?? 'Text';

  return (
    <BaseNode
      title="Input Node"
      description="Starts a pipeline by providing text, number, boolean, or JSON input."
      outputs={[{ id: 'value' }]}
    >
      <NodeField label="Name">
        <input
          value={inputName}
          onChange={(event) => updateNodeData(id, { inputName: event.target.value })}
          style={nodeControlStyle}
        />
      </NodeField>
      <NodeField label="Type">
        <select
          value={inputType}
          onChange={(event) => updateNodeData(id, { inputType: event.target.value })}
          style={nodeControlStyle}
        >
          <option>Text</option>
          <option>Number</option>
          <option>Boolean</option>
          <option>JSON</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
