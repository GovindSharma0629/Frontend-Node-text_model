import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const WebhookNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const method = data.method ?? 'POST';
  const url = data.url ?? 'https://example.com/webhook';
  const timeout = data.timeout ?? 30;

  return (
    <BaseNode
      title="Webhook"
      description="Sends pipeline data to an external webhook endpoint."
      inputs={[{ id: 'payload' }]}
      outputs={[{ id: 'response' }]}
      width={300}
    >
      <NodeField label="Method">
        <select
          value={method}
          onChange={(event) => updateNodeData(id, { method: event.target.value })}
          style={nodeControlStyle}
        >
          <option>POST</option>
          <option>PUT</option>
          <option>PATCH</option>
          <option>DELETE</option>
        </select>
      </NodeField>
      <NodeField label="URL">
        <input
          type="text"
          value={url}
          onChange={(event) => updateNodeData(id, { url: event.target.value })}
          style={nodeControlStyle}
          placeholder="https://..."
        />
      </NodeField>
      <NodeField label="Timeout (s)">
        <input
          type="number"
          value={timeout}
          onChange={(event) => updateNodeData(id, { timeout: Number(event.target.value) })}
          style={nodeControlStyle}
          min="1"
        />
      </NodeField>
    </BaseNode>
  );
};
