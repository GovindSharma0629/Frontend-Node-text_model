import { BaseNode, NodeField, nodeControlStyle } from '../components/BaseNode';
import { useStore } from '../store';

export const CacheNode = ({ id, data = {} }) => {
  const updateNodeData = useStore((state) => state.updateNodeData);
  const cacheType = data.cacheType ?? 'memory';
  const ttl = data.ttl ?? 3600;
  const maxSize = data.maxSize ?? 1000;

  return (
    <BaseNode
      title="Cache"
      description="Stores incoming data in the selected cache backend for faster reuse."
      inputs={[{ id: 'input' }]}
      outputs={[{ id: 'cached' }]}
      width={260}
    >
      <NodeField label="Type">
        <select
          value={cacheType}
          onChange={(event) => updateNodeData(id, { cacheType: event.target.value })}
          style={nodeControlStyle}
        >
          <option>memory</option>
          <option>redis</option>
          <option>memcached</option>
          <option>file</option>
        </select>
      </NodeField>
      <NodeField label="TTL (seconds)">
        <input
          type="number"
          value={ttl}
          onChange={(event) => updateNodeData(id, { ttl: Number(event.target.value) })}
          style={nodeControlStyle}
          min="1"
        />
      </NodeField>
      <NodeField label="Max Size">
        <input
          type="number"
          value={maxSize}
          onChange={(event) => updateNodeData(id, { maxSize: Number(event.target.value) })}
          style={nodeControlStyle}
          min="1"
        />
      </NodeField>
    </BaseNode>
  );
};
