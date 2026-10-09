import { useEffect, useRef, useState } from 'react';
import {
  Bot,
  X,
  Send,
  Mic,
  MicOff,
  Sparkles,
  LoaderCircle,
  MessageCircle,
} from 'lucide-react';
import './CampusAIAssistant.css';

const suggestions = [
  'What is my next class?',
  'Check my attendance',
  'Help me apply for leave',
  'Show my pending requests',
];

export default function CampusAIAssistant() {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hi! I'm your CampusConnect AI assistant. How can I help you today?",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceError, setVoiceError] = useState('');

  const bottomRef = useRef(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => () => recognitionRef.current?.abort(), []);

  function toggleVoice() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setVoiceError('Voice input is not supported in this browser.');
      return;
    }

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-IN';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.onresult = (event) => {
      setMessage((previous) =>
        `${previous} ${event.results[0][0].transcript}`.trim()
      );
      setVoiceError('');
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      setListening(false);
      setVoiceError(
        event.error === 'not-allowed'
          ? 'Allow microphone access to use voice input.'
          : 'Voice input could not start. Please try again.'
      );
    };

    recognitionRef.current = recognition;

    try {
      recognition.start();
      setListening(true);
      setVoiceError('');
    } catch {
      setListening(false);
      setVoiceError('Voice input could not start. Please try again.');
    }
  }

  async function sendMessage(text = message) {
    const question = text.trim();
    if (!question || loading) return;

    const updatedMessages = [
      ...messages,
      { role: 'user', content: question },
    ];

    setMessages(updatedMessages);
    setMessage('');
    setLoading(true);

    try {
      const response = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: question }),
      });

      if (!response.ok) {
        throw new Error('Assistant service is unavailable.');
      }

      const data = await response.json();
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content: data.reply || 'I could not find an answer.',
        },
      ]);
    } catch {
      setMessages((previous) => [
        ...previous,
        {
          role: 'assistant',
          content:
            'I could not connect to the AI service. Please check your server and try again.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="campus-ai">
      <button
        type="button"
        className={`campus-ai-trigger${open ? ' active' : ''}`}
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? 'Close Campus AI Assistant' : 'Open Campus AI Assistant'}
        aria-expanded={open}
        aria-controls="campus-ai-panel"
        title="Campus AI Assistant"
      >
        {open ? <X size={22} /> : <Bot size={23} />}
        {!open && <span className="campus-ai-dot" />}
      </button>

      {open && (
        <section
          className="campus-ai-panel"
          id="campus-ai-panel"
          aria-label="Campus AI Assistant"
        >
          <header className="campus-ai-header">
            <div className="campus-ai-avatar" aria-hidden="true">
              <Sparkles size={21} />
            </div>
            <div className="campus-ai-heading">
              <strong>Campus AI</strong>
              <span><i /> Your campus assistant</span>
            </div>
            <button
              type="button"
              className="campus-ai-close"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
            >
              <X size={19} />
            </button>
          </header>

          <div className="campus-ai-messages" role="log" aria-live="polite" aria-relevant="additions">
            {messages.map((item, index) => (
              <div key={`${item.role}-${index}`} className={`campus-ai-message ${item.role}`}>
                {item.role === 'assistant' && <Bot size={17} aria-hidden="true" />}
                <p>{item.content}</p>
              </div>
            ))}

            {messages.length === 1 && (
              <div className="campus-ai-suggestions">
                <span>Try asking</span>
                {suggestions.map((suggestion) => (
                  <button
                    type="button"
                    key={suggestion}
                    onClick={() => sendMessage(suggestion)}
                    disabled={loading}
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div className="campus-ai-loading" role="status">
                <LoaderCircle size={18} />
                Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            className="campus-ai-form"
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
          >
            <input
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Ask anything about your campus..."
              aria-label="Message the AI assistant"
              disabled={loading}
            />
            <button
              type="button"
              onClick={toggleVoice}
              className={listening ? 'voice-active' : ''}
              aria-label={listening ? 'Stop voice input' : 'Speak'}
              title={listening ? 'Stop listening' : 'Speak'}
            >
              {listening ? <MicOff size={19} /> : <Mic size={19} />}
            </button>
            <button
              type="submit"
              disabled={!message.trim() || loading}
              aria-label="Send message"
              title="Send message"
            >
              <Send size={19} />
            </button>
          </form>
          <span className="campus-ai-voice-status" aria-live="polite">
            {listening ? 'Listening...' : voiceError}
          </span>

          <footer className="campus-ai-footer">
            <MessageCircle size={13} aria-hidden="true" />
            AI can make mistakes. Verify important information.
          </footer>
        </section>
      )}
    </div>
  );
}