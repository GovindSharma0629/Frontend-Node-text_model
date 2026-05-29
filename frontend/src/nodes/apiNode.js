import { BaseNode, NodeField, nodeControlStyle, nodeTextareaStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const APINode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const method = data.method ?? 'GET';
  const url = data.url ?? 'https://api.example.com/data';
  const body = data.body ?? '';

  return (
    <BaseNode
      title="API Node"
      description="Calls an HTTP API with the configured method, URL, and optional body."
      inputs={[{ id: 'request' }]}
      outputs={[{ id: 'response' }]}
      width={300}
    >
      <NodeField label="Method">
        <select
          value={method}
          onChange={(event) => updateNodeData(id, { method: event.target.value })}
          style={nodeControlStyle}
        >
          <option>GET</option>
          <option>POST</option>
          <option>PUT</option>
          <option>PATCH</option>
          <option>DELETE</option>
        </select>
      </NodeField>
      <NodeField label="URL">
        <input
          value={url}
          onChange={(event) => updateNodeData(id, { url: event.target.value })}
          style={nodeControlStyle}
        />
      </NodeField>
      <NodeField label="Body">
        <textarea
          value={body}
          onChange={(event) => updateNodeData(id, { body: event.target.value })}
          rows={3}
          style={nodeTextareaStyle}
        />
      </NodeField>
    </BaseNode>
  );
};
