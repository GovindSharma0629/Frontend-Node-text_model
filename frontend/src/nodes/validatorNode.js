import { BaseNode, NodeField, nodeControlStyle, nodeTextareaStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const ValidatorNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const validationType = data.validationType ?? 'json-schema';
  const schema = data.schema ?? '{}';

  return (
    <BaseNode
      title="Validator"
      description="Checks incoming data and routes it to valid or invalid outputs."
      inputs={[{ id: 'data' }]}
      outputs={[{ id: 'valid' }, { id: 'invalid' }]}
      width={280}
    >
      <NodeField label="Type">
        <select
          value={validationType}
          onChange={(event) => updateNodeData(id, { validationType: event.target.value })}
          style={nodeControlStyle}
        >
          <option>json-schema</option>
          <option>regex</option>
          <option>type-check</option>
          <option>email</option>
          <option>url</option>
        </select>
      </NodeField>
      <NodeField label="Schema">
        <textarea
          value={schema}
          onChange={(event) => updateNodeData(id, { schema: event.target.value })}
          rows={3}
          style={nodeTextareaStyle}
        />
      </NodeField>
    </BaseNode>
  );
};
