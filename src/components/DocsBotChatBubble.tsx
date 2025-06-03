"use client";

import React, { useState, useRef, useEffect } from 'react';

const TEAM_ID = 'r5DFHTmBuQSdYrUAhqXk';
const BOT_ID = 'vPCRFfIbGuVNMeJi08nt';
const API_URL = `https://app.docsbot.ai/api/chat/${TEAM_ID}/${BOT_ID}`;

function sendMessageToDocsBot(message: string) {
  return fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ message }),
  })
    .then((res) => res.json())
    .then((data) => data.response || 'No response');
}

const AGENT_NAME = 'Adora AI agent';
const AGENT_COLOR = '#4F6AFB';
const AGENT_AVATAR = (
  <span style={{
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: '50%',
    background: AGENT_COLOR,
    color: '#fff',
    fontWeight: 700,
    fontSize: 18,
    marginRight: 8,
    boxShadow: '0 1px 4px rgba(79,106,251,0.10)'
  }}>A</span>
);

export default function DocsBotChatBubble() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'What can I help you with?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { role: 'user', text: input };
    setMessages((msgs) => [...msgs, userMsg]);
    setInput('');
    setLoading(true);
    try {
      const botReply = await sendMessageToDocsBot(input);
      setMessages((msgs) => [...msgs, { role: 'bot', text: botReply }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { role: 'bot', text: 'Sorry, there was an error.' }]);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = () => {
    setMessages([{ role: 'bot', text: 'What can I help you with?' }]);
    setInput('');
  };

  return (
    <>
      {/* Floating Chat Bubble */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: AGENT_COLOR,
            color: '#fff',
            border: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            zIndex: 9999,
            fontSize: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-label="Open chat"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
        </button>
      )}
      {/* Chat Window */}
      {open && (
        <div
          style={{
            position: 'fixed',
            right: 24,
            bottom: 24,
            width: 380,
            maxWidth: '95vw',
            height: 540,
            background: '#fff',
            borderRadius: 18,
            boxShadow: '0 8px 32px rgba(79,106,251,0.18)',
            zIndex: 10000,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            fontFamily: 'Inter, Arial, sans-serif',
          }}
        >
          {/* Header */}
          <div style={{
            background: AGENT_COLOR,
            color: '#fff',
            padding: '16px 18px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTopLeftRadius: 18,
            borderTopRightRadius: 18,
            fontWeight: 600,
            fontSize: 18,
            letterSpacing: 0.2,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {AGENT_AVATAR}
              <span>{AGENT_NAME}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <button onClick={handleRefresh} title="Restart chat" style={{ background: 'none', border: 'none', color: '#fff', fontSize: 20, cursor: 'pointer', marginRight: 4 }}>
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24"><path d="M4 4v5h.582M20 20v-5h-.581M5.21 17.89A9 9 0 1 1 12 21a9 9 0 0 1-6.79-3.11" /></svg>
              </button>
              <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', fontSize: 24, cursor: 'pointer' }} aria-label="Close chat">×</button>
            </div>
          </div>
          {/* Messages */}
          <div style={{ flex: 1, overflowY: 'auto', padding: 18, background: '#f7f8fa', display: 'flex', flexDirection: 'column' }}>
            {messages.map((msg, i) => (
              <div key={i} style={{
                marginBottom: 14,
                display: 'flex',
                justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                alignItems: 'flex-end',
              }}>
                {msg.role === 'bot' && AGENT_AVATAR}
                <span
                  style={{
                    display: 'inline-block',
                    background: msg.role === 'user' ? AGENT_COLOR : '#fff',
                    color: msg.role === 'user' ? '#fff' : '#222',
                    borderRadius: msg.role === 'user' ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    padding: '10px 16px',
                    maxWidth: '75%',
                    wordBreak: 'break-word',
                    fontSize: 15,
                    boxShadow: msg.role === 'user' ? '0 2px 8px rgba(79,106,251,0.10)' : '0 1px 4px rgba(0,0,0,0.04)',
                    marginLeft: msg.role === 'bot' ? 0 : 8,
                    marginRight: msg.role === 'user' ? 0 : 8,
                  }}
                >
                  {msg.text}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          {/* Input */}
          <form onSubmit={handleSend} style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid #ececec', padding: '14px 16px', background: '#fff', gap: 8 }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message..."
              style={{
                flex: 1,
                border: 'none',
                outline: 'none',
                fontSize: 16,
                padding: '10px 12px',
                background: '#f7f8fa',
                borderRadius: 12,
                color: '#222',
                boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
              }}
              disabled={loading}
            />
            <button type="submit" disabled={loading || !input.trim()} style={{ background: AGENT_COLOR, color: '#fff', border: 'none', borderRadius: 8, padding: '10px 20px', fontWeight: 600, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
              {loading ? (
                <span style={{ display: 'inline-block', width: 18, height: 18, border: '2px solid #fff', borderTop: '2px solid #4F6AFB', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              ) : (
                'Send'
              )}
            </button>
          </form>
          <style>{`
            @keyframes spin { 100% { transform: rotate(360deg); } }
          `}</style>
        </div>
      )}
    </>
  );
} 