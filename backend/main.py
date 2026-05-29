from collections import deque
from typing import Any, Dict, List

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PipelinePayload(BaseModel):
    nodes: List[Dict[str, Any]] = Field(default_factory=list)
    edges: List[Dict[str, Any]] = Field(default_factory=list)


def pipeline_is_dag(nodes: List[Dict[str, Any]], edges: List[Dict[str, Any]]) -> bool:
    node_ids = [node.get("id") for node in nodes]
    if any(node_id is None for node_id in node_ids):
        return False

    unique_node_ids = set(node_ids)
    if len(unique_node_ids) != len(node_ids):
        return False

    adjacency = {node_id: [] for node_id in unique_node_ids}
    indegree = {node_id: 0 for node_id in unique_node_ids}

    for edge in edges:
        source = edge.get("source")
        target = edge.get("target")

        if source not in unique_node_ids or target not in unique_node_ids:
            return False

        adjacency[source].append(target)
        indegree[target] += 1

    queue = deque(node_id for node_id, degree in indegree.items() if degree == 0)
    visited = 0

    while queue:
        node_id = queue.popleft()
        visited += 1

        for next_node_id in adjacency[node_id]:
            indegree[next_node_id] -= 1
            if indegree[next_node_id] == 0:
                queue.append(next_node_id)

    return visited == len(unique_node_ids)


@app.get('/')
def read_root():
    return {'Ping': 'Pong'}

@app.post('/pipelines/parse')
def parse_pipeline(pipeline: PipelinePayload):
    return {
        'num_nodes': len(pipeline.nodes),
        'num_edges': len(pipeline.edges),
        'is_dag': pipeline_is_dag(pipeline.nodes, pipeline.edges),
    }
