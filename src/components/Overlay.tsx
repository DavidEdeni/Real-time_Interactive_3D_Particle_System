import { Github, Info, MousePointer2 } from 'lucide-react'

interface OverlayProps {
  currentPreset: 'nebula' | 'vortex' | 'aurora'
  onPresetChange: (preset: 'nebula' | 'vortex' | 'aurora') => void
}

export default function Overlay({ currentPreset, onPresetChange }: OverlayProps) {
  return (
    <div className="overlay">
      <div className="header animate-fade-in">
        <div className="glass-panel">
          <h1>Particle Entropy</h1>
          <p className="info-text">
            A real-time interactive 3D simulation exploring generative fluid dynamics and particle life.
          </p>
          <div className="controls">
            {(['nebula', 'vortex', 'aurora'] as const).map((p) => (
              <button
                key={p}
                className={currentPreset === p ? 'active' : ''}
                onClick={() => onPresetChange(p)}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="footer animate-fade-in">
        <div className="glass-panel" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MousePointer2 size={16} color="var(--accent-cyan)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>MOVE MOUSE TO INTERACT</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Info size={16} color="var(--accent-magenta)" />
            <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>REACT + THREE.JS</span>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '12px' }}>
          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'white' }}
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </div>
  )
}
