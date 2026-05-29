import { useState } from 'react';
import { Handle, Position } from 'reactflow';

export const nodeControlStyle = {
  width: '100%',
  boxSizing: 'border-box',
  background: '#111827',
  color: '#f3f4f6',
  border: '1px solid #374151',
  borderRadius: '8px',
  padding: '8px',
  outline: 'none',
};

export const nodeTextareaStyle = {
  ...nodeControlStyle,
  resize: 'none',
  lineHeight: 1.4,
};

export const NodeField = ({ label, children }) => (
  <label
    className="nodrag"
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      fontSize: '12px',
      color: '#cbd5e1',
    }}
  >
    <span>{label}</span>
    {children}
  </label>
);

export const BaseNode = ({
  title,
  description,
  inputs = [],
  outputs = [],
  children,
  width = 260,
  minHeight = 120,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const handleTop = (index) => 58 + index * 28;
  const minNodeHeight = Math.max(
    minHeight,
    96 + Math.max(inputs.length, outputs.length) * 28
  );

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={description}
      style={{
        width: width,
        minHeight: minNodeHeight,

        background: '#1b1f27',

        color: '#f3f4f6',

        border: '1px solid #3b4252',

        borderRadius: '10px',

        padding: '12px',

        position: 'relative',

        boxShadow: '0 8px 24px rgba(0,0,0,0.45)',

        backdropFilter: 'blur(8px)',

        transition: 'all 0.2s ease',
      }}
    >

      {/* TITLE */}

      <div
        style={{
          fontSize: '15px',

          fontWeight: '600',

          marginBottom: '12px',

          color: '#60a5fa',

          borderBottom: '1px solid #374151',

          paddingBottom: '8px',
        }}
      >
        {title}
      </div>

      {description && isHovered && (
        <div
          className="nodrag"
          style={{
            position: 'absolute',
            left: '12px',
            right: '12px',
            top: 'calc(100% + 8px)',
            zIndex: 20,
            pointerEvents: 'none',
            padding: '8px 10px',
            borderRadius: '8px',
            background: '#020617',
            border: '1px solid #60a5fa',
            color: '#e2e8f0',
            fontSize: '12px',
            lineHeight: 1.35,
            boxShadow: '0 10px 24px rgba(0,0,0,0.45)',
          }}
        >
          {description}
        </div>
      )}


      {/* INPUT HANDLES */}

      {inputs.map((input, index) => (

        <Handle
          key={input.id}

          type="target"

          position={Position.Left}

          id={input.id}

          style={{
            top: handleTop(index),

            background: '#ffffff',

            width: 10,

            height: 10,

            border: '2px solid #1e40af',
          }}
        />

      ))}


      {/* NODE CONTENT */}

      <div
        style={{
          display: 'flex',

          flexDirection: 'column',

          gap: '10px',
        }}
      >
        {children}
      </div>


      {/* OUTPUT HANDLES */}

      {outputs.map((output, index) => (

        <Handle
          key={output.id}

          type="source"

          position={Position.Right}

          id={output.id}

          style={{
            top: handleTop(index),

            background: '#ffffff',

            width: 10,

            height: 10,

            border: '2px solid #2563eb',
          }}
        />

      ))}

    </div>
  );
};
