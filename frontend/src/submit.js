// submit.js

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const nodes = useStore((state) => state.nodes);
    const edges = useStore((state) => state.edges);

    const handleSubmit = async () => {
        setIsSubmitting(true);

        try {
            const response = await fetch('http://localhost:8000/pipelines/parse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ nodes, edges }),
            });

            if (!response.ok) {
                throw new Error(`Request failed with status ${response.status}`);
            }

            const result = await response.json();
            alert(
                `Pipeline Summary\n\n` +
                `Nodes: ${result.num_nodes}\n` +
                `Edges: ${result.num_edges}\n` +
                `Is DAG: ${result.is_dag ? 'Yes' : 'No'}`
            );
        } catch (error) {
            alert(`Unable to submit pipeline. ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div style={{
            position: 'fixed',
            left: '50%',
            bottom: '24px',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <button
                type="button"
                onClick={handleSubmit}
                disabled={isSubmitting}
                style={{
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    color: '#f8fafc',
                    background: isSubmitting ? '#1e40af' : '#2563eb',
                    border: '1px solid #60a5fa',
                    borderRadius: '8px',
                    padding: '12px 24px',
                    fontWeight: '600',
                    fontSize: '14px',
                    boxShadow: '0 10px 24px rgba(37, 99, 235, 0.35)',
                    opacity: isSubmitting ? 0.75 : 1,
                    transition: 'all 0.2s ease',
                }}
                onMouseEnter={(e) => {
                    if (!isSubmitting) {
                        e.target.style.background = '#1d4ed8';
                        e.target.style.boxShadow = '0 15px 35px rgba(37, 99, 235, 0.45)';
                    }
                }}
                onMouseLeave={(e) => {
                    if (!isSubmitting) {
                        e.target.style.background = '#2563eb';
                        e.target.style.boxShadow = '0 10px 24px rgba(37, 99, 235, 0.35)';
                    }
                }}
            >
                {isSubmitting ? 'Submitting...' : 'Submit Pipeline'}
            </button>
        </div>
    );
}
