// store.js

import { create } from "zustand";
import {
    addEdge,
    applyNodeChanges,
    applyEdgeChanges,
    MarkerType,
  } from 'reactflow';

export const useStore = create((set, get) => ({
    nodeIDs: {},
    nodes: [],
    edges: [],
    getNodeID: (type) => {
        const newIDs = {...get().nodeIDs};
        if (newIDs[type] === undefined) {
            newIDs[type] = 0;
        }
        newIDs[type] += 1;
        set({nodeIDs: newIDs});
        return `${type}-${newIDs[type]}`;
    },
    addNode: (node) => {
        set((state) => ({
            nodes: [...state.nodes, node]
        }));
    },
    setEdges: (edgesOrUpdater) => {
        set((state) => ({
            edges: typeof edgesOrUpdater === 'function'
                ? edgesOrUpdater(state.edges)
                : edgesOrUpdater
        }));
    },
    removeEdge: (edgeId) => {
        set((state) => ({
            edges: state.edges.filter((edge) => edge.id !== edgeId)
        }));
    },
    removeNode: (nodeId) => {
        set((state) => ({
            nodes: state.nodes.filter((node) => node.id !== nodeId),
            edges: state.edges.filter((edge) =>
                edge.source !== nodeId && edge.target !== nodeId
            )
        }));
    },
    onNodesChange: (changes) => {
      const removedNodeIds = new Set(
        changes
          .filter((change) => change.type === 'remove')
          .map((change) => change.id)
      );

      set((state) => ({
        nodes: applyNodeChanges(changes, state.nodes),
        edges: removedNodeIds.size
          ? state.edges.filter(
              (edge) =>
                !removedNodeIds.has(edge.source) &&
                !removedNodeIds.has(edge.target)
            )
          : state.edges,
      }));
    },
    onEdgesChange: (changes) => {
      set((state) => ({
        edges: applyEdgeChanges(changes, state.edges),
      }));
    },
    onConnect: (connection) => {
      set((state) => ({
        edges: addEdge({
          ...connection,
          type: 'smoothstep',
          animated: true,
          style: {
            stroke: '#3b82f6',
            strokeWidth: 3,
          },
          markerEnd: {
            type: MarkerType.Arrow,
            height: '20px',
            width: '20px',
          },
        }, state.edges),
      }));
    },
    updateNodeData: (nodeId, updates) => {
      set((state) => ({
        nodes: state.nodes.map((node) => {
          if (node.id !== nodeId) {
            return node;
          }

          return {
            ...node,
            data: {
              ...node.data,
              ...updates,
            },
          };
        }),
      }));
    },
    updateNodeField: (nodeId, fieldName, fieldValue) => {
      get().updateNodeData(nodeId, { [fieldName]: fieldValue });
    },
    duplicateNode: (nodeId) => {
      const state = get();
      const nodeToDuplicate = state.nodes.find(node => node.id === nodeId);

      if (!nodeToDuplicate) return;

      const newId = get().getNodeID(nodeToDuplicate.type);
      const clonedData = JSON.parse(JSON.stringify(nodeToDuplicate.data ?? {}));
      const newNode = {
        id: newId,
        type: nodeToDuplicate.type,
        position: {
          x: (nodeToDuplicate.position?.x ?? 0) + 80,
          y: (nodeToDuplicate.position?.y ?? 0) + 80,
        },
        data: {
          ...clonedData,
          id: newId,
        },
      };

      set((state) => ({
        nodes: [...state.nodes, newNode],
      }));
    },
  }));
