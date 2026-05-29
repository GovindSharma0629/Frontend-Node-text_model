// draggableNode.js
import { useState } from 'react';

const nodeDescriptions = {
  customInput: 'Starts a pipeline by providing text, number, boolean, or JSON input.',
  customOutput: 'Collects the final pipeline result and formats it for output.',
  text: 'Builds a text template and creates input handles for variables like {{ input }}.',
  llm: 'Sends a prompt to a selected language model and returns the response.',
  api: 'Calls an HTTP API with the configured method, URL, and optional body.',
  math: 'Combines numeric inputs using the selected math operation.',
  filter: 'Routes data into matched or rejected outputs based on a condition.',
  logger: 'Records a message with the selected log level and prefix.',
  delay: 'Pauses the pipeline for the configured number of milliseconds.',
  database: 'Runs a database query against the selected database type and table.',
  transform: 'Transforms incoming data, such as parsing JSON, flattening, or grouping.',
  validator: 'Checks incoming data and routes it to valid or invalid outputs.',
  cache: 'Stores incoming data in the selected cache backend for faster reuse.',
  webhook: 'Sends pipeline data to an external webhook endpoint.',
};

export const DraggableNode = ({ type, label }) => {
    const [isHovered, setIsHovered] = useState(false);
    const description = nodeDescriptions[type];

    const onDragStart = (event, nodeType) => {
      const appData = { nodeType }
      event.currentTarget.style.cursor = 'grabbing';
      const payload = JSON.stringify(appData);
      event.dataTransfer.setData('application/reactflow', payload);
      event.dataTransfer.setData('text/plain', payload);
      event.dataTransfer.effectAllowed = 'move';
    };

    return (
      <div
        className={type}
        onDragStart={(event) => onDragStart(event, type)}
        onDragEnd={(event) => (event.currentTarget.style.cursor = 'grab')}
        style={{
          cursor: 'grab',
          minWidth: '90px',
          height: '56px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          borderRadius: '8px',
          backgroundColor: '#2d3748',
          justifyContent: 'center',
          flexDirection: 'column',
          border: '1px solid #4a5568',
          transition: 'all 0.2s ease',
          fontSize: '12px',
          fontWeight: '500',
          userSelect: 'none',
        }}
        onMouseEnter={(e) => {
          setIsHovered(true);
          e.currentTarget.style.backgroundColor = '#374151';
          e.currentTarget.style.borderColor = '#60a5fa';
          e.currentTarget.style.boxShadow = '0 0 8px rgba(96, 165, 250, 0.2)';
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          e.currentTarget.style.backgroundColor = '#2d3748';
          e.currentTarget.style.borderColor = '#4a5568';
          e.currentTarget.style.boxShadow = 'none';
        }}
        title={description}
        draggable
      >
          <span style={{ color: '#e2e8f0' }}>{label}</span>
          {description && isHovered && (
            <span
              style={{
                position: 'absolute',
                left: '0',
                top: '62px',
                zIndex: 30,
                width: '240px',
                pointerEvents: 'none',
                padding: '8px 10px',
                borderRadius: '8px',
                background: '#020617',
                border: '1px solid #60a5fa',
                color: '#e2e8f0',
                fontSize: '12px',
                lineHeight: 1.35,
                textAlign: 'left',
                boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
              }}
            >
              {description}
            </span>
          )}
      </div>
    );
  };
  
