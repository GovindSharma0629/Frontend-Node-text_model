import { BaseNode, NodeField, nodeControlStyle, nodeTextareaStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const LLMNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const model = data.model ?? 'gpt-4o-mini';
  const systemPrompt = data.systemPrompt ?? 'You are a helpful assistant.';
  const temperature = data.temperature ?? 0.2;

  return (
    <BaseNode
      title="LLM Node"
      description="Sends a prompt to a selected language model and returns the response."
      inputs={[{ id: 'prompt' }]}
      outputs={[{ id: 'response' }]}
      width={300}
    >
      <NodeField label="Model">
        <select
          value={model}
          onChange={(event) => updateNodeData(id, { model: event.target.value })}
          style={nodeControlStyle}
        >
          <option>gpt-4o-mini</option>
          <option>gpt-4.1-mini</option>
          <option>claude-3-haiku</option>
          <option>gemini-1.5-flash</option>
        </select>
      </NodeField>
      <NodeField label="System prompt">
        <textarea
          value={systemPrompt}
          onChange={(event) => updateNodeData(id, { systemPrompt: event.target.value })}
          rows={3}
          style={nodeTextareaStyle}
        />
      </NodeField>
      <NodeField label="Temperature">
        <input
          type="number"
          min="0"
          max="1"
          step="0.1"
          value={temperature}
          onChange={(event) => updateNodeData(id, { temperature: Number(event.target.value) })}
          style={nodeControlStyle}
        />
      </NodeField>
    </BaseNode>
  );
};
