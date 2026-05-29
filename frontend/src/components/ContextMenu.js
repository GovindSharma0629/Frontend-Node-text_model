export const ContextMenu = ({ x, y, options, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        left: `${x}px`,
        top: `${y}px`,
        backgroundColor: '#1b1f27',
        border: '1px solid #3b4252',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
        zIndex: 1000,
        minWidth: '180px',
        overflow: 'hidden',
      }}
      onContextMenu={(e) => e.preventDefault()}
    >
      {options.map((option, idx) => (
        <button
          key={idx}
          onClick={() => {
            option.action();
            onClose();
          }}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '10px 16px',
            backgroundColor: 'transparent',
            border: 'none',
            color: option.danger ? '#ef4444' : '#f3f4f6',
            fontSize: '14px',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
            borderBottom: idx < options.length - 1 ? '1px solid #374151' : 'none',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#2d3748';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};
