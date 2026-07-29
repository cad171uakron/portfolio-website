import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Carter Dockery | Software Developer & Data Engineer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: 'linear-gradient(135deg, #070d1a 0%, #0d1f3c 50%, #070d1a 100%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(56,189,248,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orbs */}
        <div
          style={{
            position: 'absolute',
            top: '80px',
            right: '120px',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(56,189,248,0.12) 0%, transparent 70%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: '100px',
            width: '240px',
            height: '240px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(129,140,248,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Domain badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '9999px',
            background: 'rgba(56,189,248,0.08)',
            border: '1px solid rgba(56,189,248,0.25)',
            marginBottom: '36px',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#4ade80',
            }}
          />
          <span style={{ color: '#38bdf8', fontSize: '16px', fontFamily: 'monospace' }}>
            carterdockery.com
          </span>
        </div>

        {/* Name */}
        <h1
          style={{
            fontSize: '80px',
            fontWeight: '800',
            color: '#f0f6ff',
            margin: '0 0 16px 0',
            lineHeight: '1',
            position: 'relative',
            letterSpacing: '-2px',
          }}
        >
          Carter Dockery
        </h1>

        {/* Role tags */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            marginBottom: '48px',
            position: 'relative',
            flexWrap: 'wrap',
          }}
        >
          {['Software Developer', 'Data & BI Engineer', 'IT Professional'].map((role) => (
            <span
              key={role}
              style={{
                fontSize: '20px',
                color: '#38bdf8',
                padding: '6px 18px',
                borderRadius: '8px',
                background: 'rgba(56,189,248,0.08)',
                border: '1px solid rgba(56,189,248,0.2)',
              }}
            >
              {role}
            </span>
          ))}
        </div>

        {/* Stat pills */}
        <div
          style={{
            display: 'flex',
            gap: '32px',
            position: 'relative',
          }}
        >
          {[
            { value: '360K+', label: 'Records Processed' },
            { value: '6', label: 'Projects' },
            { value: '12', label: 'Casino Games' },
            { value: '3+', label: 'Years Experience' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '32px', fontWeight: '700', color: '#38bdf8', lineHeight: '1' }}>
                {stat.value}
              </span>
              <span style={{ fontSize: '14px', color: '#64748b' }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
