'use client';

import React, { useState, useEffect } from 'react';
import ReactFlow, { 
  Background, 
  Controls, 
  MiniMap, 
  Node, 
  Edge,
  ConnectionMode,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
  Handle,
  Position
} from 'reactflow';
import 'reactflow/dist/style.css';
import ragWorkflowData from './Chatbot.json';

// Custom node component with handles and icons
const getNodeIcon = (nodeType: string) => {
  // Chat Trigger
  if (nodeType?.includes('chatTrigger')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
        <svg className="w-7 h-7 text-gray-700 dark:text-gray-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4l4 4 4-4h4c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>
        </svg>
      </div>
    );
  }
  // Webhook
  if (nodeType?.includes('webhook')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-pink-200 dark:border-pink-400">
        <svg className="w-7 h-7 text-pink-600 dark:text-pink-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z"/>
        </svg>
      </div>
    );
  }
  // Edit Fields
  if (nodeType?.includes('set')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-purple-200 dark:border-purple-400">
        <svg className="w-7 h-7 text-purple-600 dark:text-purple-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
        </svg>
      </div>
    );
  }
  // RAG AI Agent
  if (nodeType?.includes('agent')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-400">
        <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A2,2 0 0,1 14,4C14,4.74 13.6,5.39 13,5.73V7H14A7,7 0 0,1 21,14H22A1,1 0 0,1 23,15V18A1,1 0 0,1 22,19H21V20A2,2 0 0,1 19,22H5A2,2 0 0,1 3,20V19H2A1,1 0 0,1 1,18V15A1,1 0 0,1 2,14H3A7,7 0 0,1 10,7H11V5.73C10.4,5.39 10,4.74 10,4A2,2 0 0,1 12,2M7.5,13A2.5,2.5 0 0,0 5,15.5A2.5,2.5 0 0,0 7.5,18A2.5,2.5 0 0,0 10,15.5A2.5,2.5 0 0,0 7.5,13M16.5,13A2.5,2.5 0 0,0 14,15.5A2.5,2.5 0 0,0 16.5,18A2.5,2.5 0 0,0 19,15.5A2.5,2.5 0 0,0 16.5,13Z"/>
        </svg>
      </div>
    );
  }
  // OpenAI Chat Model
  if (nodeType?.includes('openai')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-green-200 dark:border-green-400">
        <svg className="w-7 h-7 text-green-600 dark:text-green-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8M12,10A2,2 0 0,0 10,12A2,2 0 0,0 12,14A2,2 0 0,0 14,12A2,2 0 0,0 12,10Z"/>
        </svg>
      </div>
    );
  }
  // Pinecone Vector Store
  if (nodeType?.includes('pinecone')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-blue-200 dark:border-blue-400">
        <svg className="w-7 h-7 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"/>
        </svg>
      </div>
    );
  }
  // Embeddings
  if (nodeType?.includes('embeddings')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-orange-200 dark:border-orange-400">
        <svg className="w-7 h-7 text-orange-600 dark:text-orange-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,12.5A1.5,1.5 0 0,1 10.5,11A1.5,1.5 0 0,1 12,9.5A1.5,1.5 0 0,1 13.5,11A1.5,1.5 0 0,1 12,12.5M12,7.2C9.9,7.2 8.2,8.9 8.2,11C8.2,13.1 9.9,14.8 12,14.8C14.1,14.8 15.8,13.1 15.8,11C15.8,8.9 14.1,7.2 12,7.2Z"/>
        </svg>
      </div>
    );
  }
  // Simple Memory
  if (nodeType?.includes('memory')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-indigo-200 dark:border-indigo-400">
        <svg className="w-7 h-7 text-indigo-600 dark:text-indigo-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12,3C7.58,3 4,4.79 4,7C4,9.21 7.58,11 12,11C16.42,11 20,9.21 20,7C20,4.79 16.42,3 12,3M4,9V12C4,14.21 7.58,16 12,16C16.42,16 20,14.21 20,12V9C20,11.21 16.42,13 12,13C7.58,13 4,11.21 4,9M4,14V17C4,19.21 7.58,21 12,21C16.42,21 20,19.21 20,17V14C20,16.21 16.42,18 12,18C7.58,18 4,16.21 4,14Z"/>
        </svg>
      </div>
    );
  }
  // Respond to Webhook
  if (nodeType?.includes('respondToWebhook')) {
    return (
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-emerald-200 dark:border-emerald-400">
        <svg className="w-7 h-7 text-emerald-600 dark:text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
          <path d="M2,21L23,12L2,3V10L17,12L2,14V21Z"/>
        </svg>
      </div>
    );
  }
  // Default
  return (
    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
      <svg className="w-7 h-7 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 24 24">
        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
      </svg>
    </div>
  );
};

const CustomNode = ({ data }: { data: any }) => (
  <div className="px-6 py-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-md min-w-[160px] max-w-[200px] relative">
    <Handle type="target" position={Position.Top} />
    <Handle type="source" position={Position.Bottom} />
    <div className="flex flex-col items-center gap-3">
      {getNodeIcon(data.nodeType)}
      <div className="text-sm font-medium text-center text-gray-800 dark:text-gray-200 truncate w-full">
        {data.label}
      </div>
    </div>
  </div>
);

const nodeTypes = {
  custom: CustomNode,
};

export default function N8NWorkflowPage() {
  const [workflow, setWorkflow] = useState(ragWorkflowData);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [workflowId, setWorkflowId] = useState('');
  const [n8nDomain, setN8nDomain] = useState(process.env.NEXT_PUBLIC_N8N_DOMAIN || 'https://sridurgal.app.n8n.cloud');

  // Convert N8N workflow to React Flow format
  const convertWorkflowToFlow = (workflowData: any) => {
    console.log('Converting workflow data:', workflowData);
    
    // Use custom node type and expand positions for better spacing
    const SPACING_FACTOR = 1.5;
    const flowNodes: Node[] = workflowData.nodes.map((node: any) => ({
      id: node.id,
      type: 'custom',
      data: { 
        label: node.name,
        nodeType: node.type,
        parameters: node.parameters 
      },
      position: {
        x: node.position[0] * SPACING_FACTOR,
        y: node.position[1] * SPACING_FACTOR,
      },
    }));

    console.log('Flow nodes:', flowNodes);
    console.log('Connections data:', workflowData.connections);

    // Create simple sequential flow edges for now
    const flowEdges: Edge[] = [];
    
    console.log('Creating simple sequential connections for debugging');
    const sortedNodes = flowNodes.sort((a, b) => a.position.x - b.position.x);
    for (let i = 0; i < sortedNodes.length - 1; i++) {
      const edge = {
        id: `simple-${i}`,
        source: sortedNodes[i].id,
        target: sortedNodes[i + 1].id,
      };
      flowEdges.push(edge);
    }

    console.log('Final edges:', flowEdges);
    setNodes(flowNodes);
    setEdges(flowEdges);
  };

  // Load sample workflow on component mount
  useEffect(() => {
    convertWorkflowToFlow(workflow);
  }, []);

  return (
    <div className="h-[calc(100vh-9rem)] flex flex-col bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="flex-none border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800/50">
        <div className="px-4 py-4">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white/90 md:text-2xl">
                N8N Workflow Viewer
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-400 md:text-base">
                Visualize and explore your N8N workflows in an interactive flow diagram
              </p>
            </div>
            
            {/* Controls */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    N8N Domain
                  </label>
                  <input
                    type="text"
                    value={''}
                    onChange={(e) => setN8nDomain(e.target.value)}
                    placeholder="https://your-n8n-domain.com"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm 
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    Workflow ID
                  </label>
                  <input
                    type="text"
                    value={workflowId}
                    onChange={(e) => setWorkflowId(e.target.value)}
                    placeholder="Enter workflow ID"
                    className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md text-sm
                             bg-white dark:bg-gray-800 text-gray-900 dark:text-white
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-medium rounded-md 
                         hover:from-blue-700 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
                  title="Feature coming soon - n8n Cloud requires authentication"
                >
                  Fetch Workflow
                </button>
              </div>
            </div>
            
            {/* Note about fetch feature */}
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              <span className="flex items-center gap-1">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                This is a demo/test system. Below is a sample RAG workflow.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Workflow Visualization */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.3, minZoom: 0.5, maxZoom: 1.5 }}
          className="bg-gray-50 dark:bg-gray-900"
          nodesDraggable={true}
          nodesConnectable={true}
          elementsSelectable={true}
        >
          <Background 
            color="#d1d5db"
            className="dark:opacity-30"
            gap={16} 
            variant={"dots" as any}
          />
          <Controls 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
          />
          <MiniMap 
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
            maskColor="rgba(0, 0, 0, 0.1)"
            nodeColor={() => '#3b82f6'}
          />
          
          <Panel position="top-left" className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700">
            <div className="text-sm font-medium text-gray-900 dark:text-white">
              {workflow.name || 'RAG Workflow'}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400 mt-1">
              {nodes.length} nodes • {edges.length} connections
            </div>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 dark:text-green-400">Active Workflow</span>
            </div>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
