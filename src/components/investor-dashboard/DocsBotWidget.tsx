'use client';

import React, { useState, useEffect } from 'react';
import { useTheme } from "@/context/ThemeContext";
import axios from 'axios';

declare global {
  interface Window {
    DocsBotAI?: any;
  }
}

const TEAM_ID = 'r5DFHTmBuQSdYrUAhqXk';
const BOT_ID = 'vPCRFfIbGuVNMeJi08nt';
const API_KEY = 'YOUR_DOCSBOT_API_KEY'; // Store securely!

export default function CustomDocsBotChat() {
  const [messages, setMessages] = useState([{ role: 'bot', content: 'How can I help you?' }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();

  // Set background color based on theme
  const chatBg = theme === "dark" ? "#18181b" : "#fff";
  const buttonBg = theme === "dark" ? "#6366f1" : "#2563eb";
  const buttonColor = theme === "dark" ? "#fff" : "#fff";

  useEffect(() => {
    if (typeof window !== 'undefined' && window.DocsBotAI) {
      const isDark = document.documentElement.classList.contains('dark');
      window.DocsBotAI.init({
        id: 'YOUR_ID_HERE',
        options: {
          customCSS: `
            .docsbot-chat-inner-container {
              border-radius: 0;
              background: ${isDark ? '#18181b' : '#fff'};
            }
            .docsbot-user-chat-message {
              background-color: #00BCD4;
              color: #fff;
            }
            .docsbot-chat-message {
              color: ${isDark ? '#fff' : '#222'};
            }
            .docsbot-chat-header {
              background: ${isDark ? '#23263a' : '#465fff'};
              color: #fff;
            }
          `,
        },
      });
    }
  }, [theme]);

  function updateDocsBotTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    window.DocsBotAI?.setOptions?.({
      customCSS: `
        .docsbot-chat-inner-container {
          background: ${isDark ? '#18181b' : '#fff'};
        }
        /* ...other styles... */
      `
    });
  }

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages([...messages, { role: 'user', content: input }]);
    setLoading(true);

    try {
      const res = await axios.post(
        `https://api.docsbot.ai/teams/${TEAM_ID}/bots/${BOT_ID}/chat`,
        { message: input },
        { headers: { Authorization: `Bearer ${API_KEY}` } }
      );
      setMessages(msgs => [...msgs, { role: 'bot', content: res.data.reply }]);
    } catch (err) {
      setMessages(msgs => [...msgs, { role: 'bot', content: 'Error: Could not get response.' }]);
    }
    setInput('');
    setLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      {open ? (
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              zIndex: 10000,
              background: chatBg,
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              padding: 0,
              color: buttonColor,
            }}
            aria-label="Close chat"
          >
            ×
          </button>
          <div className="your-chat-container" style={{
            background: chatBg,
            color: 'var(--your-text-color)',
            borderRadius: 12,
            padding: 16,
            maxWidth: 400,
            margin: '0 auto'
          }}>
            <div style={{ minHeight: 200 }}>
              {messages.map((msg, i) => (
                <div key={i} style={{
                  textAlign: msg.role === 'user' ? 'right' : 'left',
                  margin: '8px 0'
                }}>
                  <span style={{
                    background: msg.role === 'user' ? '#6366f1' : '#23263a',
                    color: '#fff',
                    borderRadius: 8,
                    padding: '6px 12px',
                    display: 'inline-block'
                  }}>
                    {msg.content}
                  </span>
                </div>
              ))}
              {loading && <div>...</div>}
            </div>
            <div style={{ marginTop: 12 }}>
              <input
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && sendMessage()}
                style={{ width: '80%', padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
                placeholder="Type your message..."
              />
              <button onClick={sendMessage} disabled={loading} style={{
                marginLeft: 8, padding: '8px 16px', borderRadius: 6, background: '#6366f1', color: '#fff', border: 'none'
              }}>
                Send
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setOpen(true)}
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: buttonBg,
            color: buttonColor,
            border: 'none',
            boxShadow: '0 4px 24px rgba(0,0,0,0.12)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 32,
            padding: 0,
          }}
          aria-label="Open chat"
        >
          💬
        </button>
      )}
    </div>
  );
} 