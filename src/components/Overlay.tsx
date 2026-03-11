import { Github, Info, MousePointer2, Camera, Palette } from 'lucide-react'

interface OverlayProps {
  currentPreset: string
  onPresetChange: (preset: string) => void
  currentColor: string
  onColorChange: (color: string) => void
  tension: number
  isDetecting: boolean
  videoRef: React.RefObject<HTMLVideoElement>
}

export default function Overlay({ 
  currentPreset, 
  onPresetChange, 
  currentColor, 
  onColorChange, 
  tension, 
  isDetecting, 
  videoRef 
}: OverlayProps) {
  const presets = ['heart', 'flower', 'saturn', 'buddha', 'fireworks', 'sphere']

  return (
    <div className="overlay">
      <div className="header animate-fade-in">
        <div className="glass-panel" style={{ width: '320px' }}>
          <h1>Particle Entropy</h1>
          <p className="info-text">
            Use AI-powered hand gestures or buttons to reshape the simulation.
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
        </div>
      </div>

      <div className="footer animate-fade-in">
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div className="glass-panel" style={{ 
            width: '180px', 
            height: '135px', 
            padding: '4px', 
            overflow: 'hidden',
            position: 'relative'
          }}>
            <video 
              ref={videoRef} 
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover', 
                borderRadius: '12px',
                transform: 'scaleX(-1)'
              }} 
            />
            <div style={{ 
              position: 'absolute', 
              bottom: '8px', 
              left: '8px', 
              background: 'rgba(0,0,0,0.6)', 
              padding: '2px 8px', 
              borderRadius: '4px',
              fontSize: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <div style={{ 
                width: '6px', 
                height: '6px', 
                borderRadius: '50%', 
                background: isDetecting ? 'var(--accent-cyan)' : '#ff4444' 
              }} />
              {isDetecting ? `TRACKING: ${(tension * 100).toFixed(0)}%` : 'NO HAND'}
            </div>
          </div>

          <div className="glass-panel" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Camera size={16} color="var(--accent-cyan)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>FIST TO CONTRACT</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Info size={16} color="var(--accent-magenta)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>MEDIA PIPE AI</span>
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
