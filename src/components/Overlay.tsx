import { Github, Info, MousePointer2, Palette, Sliders } from 'lucide-react'

interface OverlayProps {
  currentPreset: string
  onPresetChange: (preset: string) => void
  currentColor: string
  onColorChange: (color: string) => void
  shapeSize: number
  onShapeSizeChange: (size: number) => void
  particleSize: number
  onParticleSizeChange: (size: number) => void
}

export default function Overlay({ 
  currentPreset, 
  onPresetChange, 
  currentColor, 
  onColorChange, 
  shapeSize, 
  onShapeSizeChange, 
  particleSize, 
  onParticleSizeChange
}: OverlayProps) {
  const presets = ['heart', 'flower', 'saturn', 'buddha', 'fireworks', 'sphere']

  return (
    <div className="overlay">
      <div className="header animate-fade-in">
        <div className="glass-panel" style={{ width: '320px' }}>
          <h1>Particle Entropy</h1>
          <p className="info-text">
            Use the controls and presets to transform the 3D particle system.
          </p>
          
          <div className="control-group" style={{ marginTop: '20px' }}>
            <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', display: 'block', marginBottom: '8px' }}>
              SHAPE PRESETS
            </span>
            <div className="controls" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {presets.map((p) => (
                <button
                  key={p}
                  className={currentPreset === p ? 'active' : ''}
                  onClick={() => onPresetChange(p)}
                  style={{ marginTop: 0 }}
                >
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="control-group" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Palette size={14} color="var(--accent-gold)" />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>PARTICLE COLOR</span>
            </div>
            <input 
              type="color" 
              value={currentColor} 
              onChange={(e) => onColorChange(e.target.value)}
              style={{ 
                width: '100%', 
                height: '32px', 
                border: 'none', 
                borderRadius: '4px', 
                background: 'rgba(255,255,255,0.1)',
                cursor: 'pointer'
              }}
            />
          </div>

          <div className="control-group" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sliders size={14} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                SHAPE SCALE ({shapeSize.toFixed(2)}x)
              </span>
            </div>
            <input 
              type="range" 
              min="0.1" 
              max="2.5" 
              step="0.05"
              value={shapeSize} 
              onChange={(e) => onShapeSizeChange(parseFloat(e.target.value))}
              style={{ 
                width: '100%', 
                accentColor: 'var(--accent-cyan)',
                cursor: 'pointer'
              }}
            />
          </div>

          <div className="control-group" style={{ marginTop: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <Sliders size={14} color="var(--accent-magenta)" />
              <span style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)' }}>
                PARTICLE SIZE ({particleSize.toFixed(2)})
              </span>
            </div>
            <input 
              type="range" 
              min="0.01" 
              max="0.5" 
              step="0.01"
              value={particleSize} 
              onChange={(e) => onParticleSizeChange(parseFloat(e.target.value))}
              style={{ 
                width: '100%', 
                accentColor: 'var(--accent-magenta)',
                cursor: 'pointer'
              }}
            />
          </div>
        </div>
      </div>

      <div className="footer animate-fade-in">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="glass-panel" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <MousePointer2 size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>DRAG TO ROTATE / SCROLL TO ZOOM</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} color="var(--accent-magenta)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>INTERACTIVE 3D PARTICLES</span>
            </div>
          </div>
        </div>
        
        <div className="glass-panel" style={{ padding: '12px', height: 'fit-content' }}>
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
