'use client';

import React, { useState } from 'react';

export default function DocsBotWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: 'fixed', bottom: 16, right: 16, zIndex: 9999 }}>
      {open ? (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10000,
              background: '#fff',
              border: 'none',
              borderRadius: '50%',
              width: 32,
              height: 32,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            aria-label="Close chat"
          >
            ×
          </button>
          <iframe
            src="https://docsbot.ai/iframe/r5DFHTmBuQSdYrUAhqXk/vPCRFfIbGuVNMeJi08nt"
            width="360"
            height="500"
            frameBorder="0"
            allowTransparency={true}
            scrolling="no"
            style={{
              border: 'none',
              borderRadius: 12,
              boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
              background: '#fff',
              display: 'block',
            }}
            title="DocsBot AI Chatbot"
          />
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: 56,
            height: 56,
            borderRadius: '50%',
            background: '#2563eb',
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 28,
            padding: 0,
          }}
          aria-label="Open chat"
        >
          <img
            src="/ai-logo.png"
            alt="Chat"
            style={{ width: 32, height: 32, objectFit: 'contain', borderRadius: '50%' }}
          />
        </button>
      )}
    </div>
  );
} 