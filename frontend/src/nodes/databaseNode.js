import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const DatabaseNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const dbType = data.dbType ?? 'postgresql';
  const tableName = data.tableName ?? 'users';
  const query = data.query ?? 'SELECT * FROM';

  return (
    <BaseNode
      title="Database"
      description="Runs a database query against the selected database type and table."
      inputs={[{ id: 'trigger' }]}
      outputs={[{ id: 'result' }]}
      width={280}
    >
      <NodeField label="Type">
        <select
          value={dbType}
          onChange={(event) => updateNodeData(id, { dbType: event.target.value })}
          style={nodeControlStyle}
        >
          <option>postgresql</option>
          <option>mysql</option>
          <option>mongodb</option>
          <option>sqlite</option>
        </select>
      </NodeField>
      <NodeField label="Table">
        <input
          type="text"
          value={tableName}
          onChange={(event) => updateNodeData(id, { tableName: event.target.value })}
          style={nodeControlStyle}
        />
      </NodeField>
      <NodeField label="Query">
        <input
          type="text"
          value={query}
          onChange={(event) => updateNodeData(id, { query: event.target.value })}
          style={nodeControlStyle}
          placeholder="SELECT..."
        />
      </NodeField>
    </BaseNode>
  );
};
