
import { useState, useEffect } from 'react';
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

// Initial nodes for the continuous improvement diagram
const initialNodes: Node[] = [
  {
    id: 'user',
    type: 'default',
    data: { label: 'User' },
    position: { x: 100, y: 150 },
    style: { 
      backgroundColor: '#fef9c3', 
      borderRadius: '50%',
      width: 80,
      height: 80,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'agent',
    type: 'default',
    data: { label: 'Mandate Agent' },
    position: { x: 300, y: 150 },
    style: { 
      background: 'linear-gradient(to right, #4f46e5, #7c3aed)', 
      color: 'white',
      borderRadius: '12px',
      width: 140,
      border: 'none',
      fontWeight: 'bold',
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'feedback',
    type: 'default',
    data: { label: 'Learning & Adaptation' },
    position: { x: 300, y: 250 },
    style: { 
      backgroundColor: '#dbeafe', 
      borderRadius: '8px', 
      width: 180,
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
  },
  {
    id: 'improved',
    type: 'default',
    data: { label: 'Improved Recommendations' },
    position: { x: 100, y: 250 },
    style: { 
      backgroundColor: '#d1fae5', 
      borderRadius: '8px', 
      width: 180,
      border: 'none',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
    },
  },
];

// Initial edges for the continuous improvement diagram
const initialEdges: Edge[] = [
  {
    id: 'user-agent',
    source: 'user',
    target: 'agent',
    label: 'Interaction',
    labelStyle: { fill: '#64748b', fontWeight: 500 },
    labelBgStyle: { fill: '#f8fafc' },
    animated: true,
    style: { stroke: '#6366f1' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#6366f1' },
  },
  {
    id: 'agent-feedback',
    source: 'agent',
    target: 'feedback',
    animated: true,
    style: { stroke: '#3b82f6' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#3b82f6' },
  },
  {
    id: 'feedback-improved',
    source: 'feedback',
    target: 'improved',
    animated: true,
    style: { stroke: '#10b981' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#10b981' },
  },
  {
    id: 'improved-user',
    source: 'improved',
    target: 'user',
    label: 'Better Results',
    labelStyle: { fill: '#64748b', fontWeight: 500 },
    labelBgStyle: { fill: '#f8fafc' },
    animated: true,
    style: { stroke: '#059669' },
    markerEnd: { type: MarkerType.ArrowClosed, color: '#059669' },
  },
];

export function ContinuousImprovementDiagram() {
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
