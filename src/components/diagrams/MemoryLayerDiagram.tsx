
import { useEffect, useState } from 'react';
import {
  ReactFlow,
  Background,
  Node,
  Edge,
  Position,
  MarkerType,
  useNodesState,
  useEdgesState
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial nodes for the memory layer diagram
const initialNodes: Node[] = [
  {
    id: 'agent1',
    type: 'default',
    data: { label: 'Agent 1' },
    position: { x: 100, y: 100 },
    style: { 
      background: 'linear-gradient(to right, #4f46e5, #7c3aed)', 
      color: 'white',
      borderRadius: '12px',
      width: 120,
      border: 'none',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'agent2',
    type: 'default',
    data: { label: 'Agent 2' },
    position: { x: 300, y: 100 },
    style: { 
      background: 'linear-gradient(to right, #4f46e5, #7c3aed)', 
      color: 'white',
      borderRadius: '12px',
      width: 120,
      border: 'none',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'agent3',
    type: 'default',
    data: { label: 'Agent 3' },
    position: { x: 500, y: 100 },
    style: { 
      background: 'linear-gradient(to right, #4f46e5, #7c3aed)', 
      color: 'white',
      borderRadius: '12px',
      width: 120,
      border: 'none',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'memory',
    type: 'default',
    data: { label: 'Shared Memory Layer' },
    position: { x: 300, y: 250 },
    style: { 
      backgroundColor: '#ede9fe', 
      borderRadius: '12px', 
      width: 250,
      border: 'none',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'collective',
    type: 'default',
    data: { label: 'Collective Intelligence' },
    position: { x: 300, y: 350 },
    style: { 
      backgroundColor: '#dbeafe', 
      borderRadius: '8px', 
      width: 180,
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
  },
];

// Initial edges for the memory layer diagram
const initialEdges: Edge[] = [
  {
    id: 'agent1-memory',
    source: 'agent1',
    target: 'memory',
    animated: true,
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
  },
  {
    id: 'agent2-memory',
    source: 'agent2',
    target: 'memory',
    animated: true,
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
  },
  {
    id: 'agent3-memory',
    source: 'agent3',
    target: 'memory',
    animated: true,
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
  },
  {
    id: 'memory-agent1',
    source: 'memory',
    target: 'agent1',
    animated: true,
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' },
  },
  {
    id: 'memory-agent2',
    source: 'memory',
    target: 'agent2',
    animated: true,
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' },
  },
  {
    id: 'memory-agent3',
    source: 'memory',
    target: 'agent3',
    animated: true,
    style: { stroke: '#818cf8' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#818cf8' },
  },
  {
    id: 'memory-collective',
    source: 'memory',
    target: 'collective',
    animated: true,
    style: { stroke: '#3b82f6' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
  },
];

export function MemoryLayerDiagram() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  
  return (
    <div className="h-[300px] w-full bg-background rounded-lg">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#f1f5f9" variant="dots" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
