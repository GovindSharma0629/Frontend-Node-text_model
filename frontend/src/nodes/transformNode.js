import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const TransformNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const transformType = data.transformType ?? 'json-parse';
  const mappingKey = data.mappingKey ?? 'data';

  return (
    <BaseNode
      title="Transform"
      description="Transforms incoming data, such as parsing JSON, flattening, or grouping."
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'output' }]}
      width={260}
    >
      <NodeField label="Type">
        <select
          value={transformType}
          onChange={(event) => updateNodeData(id, { transformType: event.target.value })}
          style={nodeControlStyle}
        >
          <option>json-parse</option>
          <option>json-stringify</option>
          <option>csv-to-json</option>
          <option>flatten</option>
          <option>group-by</option>
        </select>
      </NodeField>
      <NodeField label="Key">
        <input
          type="text"
          value={mappingKey}
          onChange={(event) => updateNodeData(id, { mappingKey: event.target.value })}
          style={nodeControlStyle}
        />
      </NodeField>
    </BaseNode>
  );
};
