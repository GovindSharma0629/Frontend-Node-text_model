import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const MathNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const operation = data.operation ?? 'add';

  return (
    <BaseNode
      title="Math Node"
      description="Combines numeric inputs using the selected math operation."
      inputs={[
        { id: 'a' },
        { id: 'b' },
      ]}
      outputs={[{ id: 'result' }]}
    >
      <NodeField label="Operation">
        <select
          value={operation}
          onChange={(event) => updateNodeData(id, { operation: event.target.value })}
          style={nodeControlStyle}
        >
          <option value="add">Add</option>
          <option value="subtract">Subtract</option>
          <option value="multiply">Multiply</option>
          <option value="divide">Divide</option>
          <option value="average">Average</option>
        </select>
      </NodeField>
    </BaseNode>
  );
};
