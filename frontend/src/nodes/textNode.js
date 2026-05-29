import { BaseNode, NodeField, nodeTextareaStyle } from '../components/BaseNode';
import { useStore } from '../store';

const variableRegex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;

const extractVariables = (value) => {
  return Array.from(
    new Set([...value.matchAll(variableRegex)].map((match) => match[1]))
  );
};

export const TextNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const setEdges = useStore((state) => state.setEdges);
  const text = data.text ?? '';
  const variables = extractVariables(text);

  const dynamicInputs = variables.map(variable => ({
    id: variable,
  }));
  const lines = text.split('\n');
  const longestLine = lines.reduce((longest, line) => Math.max(longest, line.length), 0);
  const textareaRows = Math.min(12, Math.max(4, lines.length + Math.floor(longestLine / 45)));
  const nodeWidth = Math.min(560, Math.max(280, longestLine * 7 + 80));

  const handleTextChange = (event) => {
    const nextText = event.target.value;
    const nextVariables = extractVariables(nextText);

    updateNodeData(id, {
      text: nextText,
      variables: nextVariables,
    });

    setEdges((currentEdges) => currentEdges.filter((edge) => {
      if (edge.target !== id || !edge.targetHandle) {
        return true;
      }

      return nextVariables.includes(edge.targetHandle);
    }));
  };

  return (
    <BaseNode
      title="Text Node"
      description="Builds a text template and creates input handles for variables like {{ input }}."
      inputs={dynamicInputs}
      outputs={[{ id: 'output' }]}
      width={nodeWidth}
      minHeight={160}
    >
      <NodeField label="Template">
        <textarea
          value={text}
          onChange={handleTextChange}
          placeholder="Type {{ input }} here..."
          rows={textareaRows}
          style={{
            ...nodeTextareaStyle,
            minHeight: `${textareaRows * 24}px`,
          }}
        />
      </NodeField>
    </BaseNode>
  );
};
