import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>
      <PipelineToolbar />
      <div style={{ flex: 1, minWidth: 0, position: 'relative' }}>
        <PipelineUI />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
