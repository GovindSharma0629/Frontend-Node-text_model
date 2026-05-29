import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {
    const sectionStyle = {
        fontSize: '11px',
        fontWeight: '700',
        color: '#60a5fa',
        marginTop: '16px',
        marginBottom: '10px',
        marginLeft: '2px',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
    };

    const dividerStyle = {
        height: '1px',
        background: 'linear-gradient(90deg, #3b4252 0%, transparent 100%)',
        margin: '12px 0',
    };

    return (
        <div style={{
            padding: '16px',
            backgroundColor: '#1b2331',
            borderRight: '1px solid #3b4252',
            overflowY: 'auto',
            height: '100vh',
            width: '300px',
            flex: '0 0 300px',
        }}>
            <div style={{
                fontSize: '14px',
                fontWeight: '700',
                color: '#f3f4f6',
                marginBottom: '16px',
                paddingBottom: '12px',
                borderBottom: '1px solid #3b4252',
            }}>
                Node Library
            </div>

            <div style={sectionStyle}>Core Nodes</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
            </div>

            <div style={dividerStyle} />

            <div style={sectionStyle}>Processing</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='api' label='API' />
                <DraggableNode type='transform' label='Transform' />
                <DraggableNode type='database' label='Database' />
                <DraggableNode type='webhook' label='Webhook' />
            </div>

            <div style={dividerStyle} />

            <div style={sectionStyle}>Utilities</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <DraggableNode type='math' label='Math' />
                <DraggableNode type='filter' label='Filter' />
                <DraggableNode type='validator' label='Validator' />
                <DraggableNode type='cache' label='Cache' />
                <DraggableNode type='logger' label='Logger' />
                <DraggableNode type='delay' label='Delay' />
            </div>
        </div>
    );
};
