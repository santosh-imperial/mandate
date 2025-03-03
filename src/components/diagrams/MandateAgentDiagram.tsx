
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

// Initial nodes for the agent diagram
const initialNodes: Node[] = [
  {
    id: 'agent',
    type: 'default',
    data: { label: 'Mandate AI Agent' },
    position: { x: 250, y: 100 },
    style: { 
      background: 'linear-gradient(to right, #4f46e5, #7c3aed)', 
      color: 'white',
      width: 180,
      borderRadius: '12px',
      border: 'none',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'llm',
    type: 'default',
    data: { label: 'Large Language Model' },
    position: { x: 250, y: 250 },
    style: { 
      backgroundColor: '#f3f4f6', 
      borderRadius: '8px', 
      width: 180,
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'tools',
    type: 'default',
    data: { label: 'Tool Use' },
    position: { x: 100, y: 350 },
    style: { 
      backgroundColor: '#dbeafe', 
      borderRadius: '8px', 
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'knowledge',
    type: 'default',
    data: { label: 'Knowledge Base' },
    position: { x: 250, y: 350 },
    style: { 
      backgroundColor: '#ecfdf5', 
      borderRadius: '8px', 
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'compute',
    type: 'default',
    data: { label: 'Compute Access' },
    position: { x: 400, y: 350 },
    style: { 
      backgroundColor: '#fef3c7', 
      borderRadius: '8px', 
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
  },
];

// Initial edges for the agent diagram
const initialEdges: Edge[] = [
  {
    id: 'agent-llm',
    source: 'agent',
    target: 'llm',
    animated: true,
    style: { stroke: '#4f46e5' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#4f46e5' },
  },
  {
    id: 'llm-tools',
    source: 'llm',
    target: 'tools',
    animated: true,
    style: { stroke: '#3b82f6' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
  },
  {
    id: 'llm-knowledge',
    source: 'llm',
    target: 'knowledge',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'llm-compute',
    source: 'llm',
    target: 'compute',
    animated: true,
    style: { stroke: '#f59e0b' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#f59e0b' },
  },
];

export function MandateAgentDiagram() {
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
        attributionPosition="bottom-right"
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#f1f5f9" gap={12} size={1} />
      </ReactFlow>
    </div>
  );
}
