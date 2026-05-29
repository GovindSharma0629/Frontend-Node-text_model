import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const FilterNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const condition = data.condition ?? 'value !== null';

  return (
    <BaseNode
      title="Filter Node"
      description="Routes data into matched or rejected outputs based on a condition."
      inputs={[{ id: 'data' }]}
      outputs={[{ id: 'matched' }, { id: 'rejected' }]}
      width={290}
    >
      <NodeField label="Condition">
        <input
          value={condition}
          onChange={(event) => updateNodeData(id, { condition: event.target.value })}
          style={nodeControlStyle}
        />
      </NodeField>
    </BaseNode>
  );
};
