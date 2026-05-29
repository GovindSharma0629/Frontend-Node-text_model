// ui.js
// Displays the drag-and-drop UI
// --------------------------------------------------

import { useState, useRef, useCallback } from 'react';
import ReactFlow, { Controls, Background, MiniMap } from 'reactflow';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';
import { ContextMenu } from './components/ContextMenu';
import { InputNode } from './nodes/inputNode';
import { LLMNode } from './nodes/llmNode';
import { OutputNode } from './nodes/outputNode';
import { TextNode } from './nodes/textNode';
import { APINode } from './nodes/apiNode';
import { MathNode } from './nodes/mathNode';
import { FilterNode } from './nodes/filterNode';
import { LoggerNode } from './nodes/loggerNode';
import { DelayNode } from './nodes/delayNode';
import { DatabaseNode } from './nodes/databaseNode';
import { TransformNode } from './nodes/transformNode';
import { ValidatorNode } from './nodes/validatorNode';
import { CacheNode } from './nodes/cacheNode';
import { WebhookNode } from './nodes/webhookNode';

import 'reactflow/dist/style.css';

const gridSize = 20;

// Detects edges that are part of cycles
const findCycleEdges = (nodes, edges) => {
  const nodeIds = nodes.map(n => n.id);
  const adjacency = {};
  const cycleEdges = new Set();

  nodeIds.forEach(id => {
    adjacency[id] = [];
  });

  edges.forEach(edge => {
    if (nodeIds.includes(edge.source) && nodeIds.includes(edge.target)) {
      adjacency[edge.source].push({ target: edge.target, edgeId: edge.id });
    }
  });

  const visited = new Set();
  const recursionStack = new Set();

  const dfs = (nodeId) => {
    visited.add(nodeId);
    recursionStack.add(nodeId);

    for (const { target, edgeId } of adjacency[nodeId]) {
      if (recursionStack.has(target)) {
        cycleEdges.add(edgeId);
      } else if (!visited.has(target)) {
        dfs(target);
      }
    }

    recursionStack.delete(nodeId);
  };

  nodeIds.forEach(id => {
    if (!visited.has(id)) {
      dfs(id);
    }
  });

  return cycleEdges;
};

const getEdgeStyle = (edge, cycleEdges) => {
  const isCycle = cycleEdges.has(edge.id);
  return {
    stroke: isCycle ? '#ef4444' : '#3b82f6',
    strokeWidth: 3,
  };
};
const proOptions = { hideAttribution: true };
const nodeTypes = {
  customInput: InputNode,
  llm: LLMNode,
  customOutput: OutputNode,
  text: TextNode,
  api: APINode,
  math: MathNode,
  filter: FilterNode,
  logger: LoggerNode,
  delay: DelayNode,
  database: DatabaseNode,
  transform: TransformNode,
  validator: ValidatorNode,
  cache: CacheNode,
  webhook: WebhookNode,
};

const nodeDefaults = {
  customInput: {
    inputName: 'input',
    inputType: 'Text',
  },
  llm: {
    model: 'gpt-4o-mini',
    systemPrompt: 'You are a helpful assistant.',
    temperature: 0.2,
  },
  customOutput: {
    outputName: 'output',
    outputType: 'Text',
  },
  text: {
    text: '',
    variables: [],
  },
  api: {
    method: 'GET',
    url: 'https://api.example.com/data',
    body: '',
  },
  math: {
    operation: 'add',
  },
  filter: {
    condition: 'value !== null',
  },
  logger: {
    level: 'info',
    prefix: 'Pipeline',
  },
  delay: {
    delayMs: 1000,
  },
  database: {
    dbType: 'postgresql',
    tableName: 'users',
    query: 'SELECT * FROM',
  },
  transform: {
    transformType: 'json-parse',
    mappingKey: 'data',
  },
  validator: {
    validationType: 'json-schema',
    schema: '{}',
  },
  cache: {
    cacheType: 'memory',
    ttl: 3600,
    maxSize: 1000,
  },
  webhook: {
    method: 'POST',
    url: 'https://example.com/webhook',
    timeout: 30,
  },
};

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
  getNodeID: state.getNodeID,
  addNode: state.addNode,
  onNodesChange: state.onNodesChange,
  onEdgesChange: state.onEdgesChange,
  onConnect: state.onConnect,
  removeEdge: state.removeEdge,
  removeNode: state.removeNode,
  duplicateNode: state.duplicateNode,
});

export const PipelineUI = () => {
    const reactFlowWrapper = useRef(null);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
    const [contextMenu, setContextMenu] = useState(null);
    const [selectedNodeId, setSelectedNodeId] = useState(null);
    const {
      nodes,
      edges,
      getNodeID,
      addNode,
      onNodesChange,
      onEdgesChange,
      onConnect,
      removeEdge,
      removeNode,
      duplicateNode
    } = useStore(selector, shallow);

    // Detect cycles and update edge styles
    const cycleEdges = findCycleEdges(nodes, edges);
    const styledEdges = edges.map(edge => ({
      ...edge,
      style: getEdgeStyle(edge, cycleEdges),
    }));

    const getInitNodeData = (nodeID, type) => {
      return {
        id: nodeID,
        nodeType: type,
        ...(nodeDefaults[type] ?? {}),
      };
    }

    const onDrop = useCallback(
        (event) => {
          event.preventDefault();
          if (!reactFlowInstance) {
            return;
          }
    
          const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
          const rawAppData =
            event?.dataTransfer?.getData('application/reactflow') ||
            event?.dataTransfer?.getData('text/plain');

          if (rawAppData) {
            const appData = JSON.parse(rawAppData);
            const type = appData?.nodeType;
      
            // check if the dropped element is valid
            if (typeof type === 'undefined' || !type) {
              return;
            }
      
            const position = reactFlowInstance.project({
              x: event.clientX - reactFlowBounds.left,
              y: event.clientY - reactFlowBounds.top,
            });

            const nodeID = getNodeID(type);
            const newNode = {
              id: nodeID,
              type,
              position,
              data: getInitNodeData(nodeID, type),
            };
      
            addNode(newNode);
          }
        },
        [reactFlowInstance, getNodeID, addNode]
    );

    const onDragOver = useCallback((event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = 'move';
    }, []);

    const handleNodeContextMenu = useCallback((event, node) => {
      event.preventDefault();
      setSelectedNodeId(node.id);
      setContextMenu({
        x: event.clientX,
        y: event.clientY,
      });
    }, []);

    const handleCloseContextMenu = useCallback(() => {
      setContextMenu(null);
    }, []);

    const handleDuplicateNode = useCallback(() => {
      if (selectedNodeId) {
        duplicateNode(selectedNodeId);
      }
    }, [selectedNodeId, duplicateNode]);

    const handleDeleteNode = useCallback(() => {
      if (selectedNodeId) {
        removeNode(selectedNodeId);
      }
    }, [selectedNodeId, removeNode]);
const defaultEdgeOptions = {

  type: 'smoothstep',

  animated: true,

  style: {
    stroke: '#3b82f6',
    strokeWidth: 3,
  },
};
    return (
        <>
        <div
          ref={reactFlowWrapper}
          style={{width: '100%', height: '100%', backgroundColor: '#0f172a'}}
          onClick={handleCloseContextMenu}
        >
            <ReactFlow
                nodes={nodes}
                edges={styledEdges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onNodeContextMenu={handleNodeContextMenu}
                onEdgeContextMenu={(event, edge) => {
                  event.preventDefault();
                  removeEdge(edge.id);
                }}
                onConnect={onConnect}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onInit={setReactFlowInstance}
                nodeTypes={nodeTypes}
                proOptions={proOptions}
                snapGrid={[gridSize, gridSize]}
                connectionLineType='smoothstep'
                defaultEdgeOptions={defaultEdgeOptions}
                connectionLineStyle={{stroke: '#3b82f6',strokeWidth: 3,}}
                deleteKeyCode={['Backspace', 'Delete']}
                fitView
                panOnDrag={[0, 1]}
                selectionOnDrag
                zoomOnScroll={true}
                panOnScroll={false}
                zoomOnPinch={true}
            >
                <Background gap={24} size={1.2} color="#334155" />
                <Controls position="bottom-right"/>
                <MiniMap style={{backgroundColor: '#1e293b',}} />
            </ReactFlow>
            {contextMenu && (
              <ContextMenu
                x={contextMenu.x}
                y={contextMenu.y}
                options={[
                  {
                    label: 'Duplicate',
                    action: handleDuplicateNode,
                  },
                  {
                    label: 'Delete',
                    action: handleDeleteNode,
                    danger: true,
                  },
                ]}
                onClose={handleCloseContextMenu}
              />
            )}
        </div>
        </>
    )
}
