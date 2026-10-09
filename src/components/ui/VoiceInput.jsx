import { useEffect, useRef, useState } from 'react';
import { Mic, MicOff } from 'lucide-react';
import './VoiceInput.css';

export default function VoiceInput({
  value = '',
  onChange,
  placeholder = 'Type or speak here...',
  multiline = false,
  name,
  className = '',
  lang = 'en-IN',
  disabled = false,
  ...props
}) {
  const [listening, setListening] = useState(false);
  const [supported] = useState(
    () =>
      typeof window !== 'undefined' &&
      Boolean(window.SpeechRecognition || window.webkitSpeechRecognition)
  );
  const [errorMessage, setErrorMessage] = useState('');
  const recognitionRef = useRef(null);
  const valueRef = useRef(value);
  const onChangeRef = useRef(onChange);

  useEffect(() => {
    valueRef.current = value;
    onChangeRef.current = onChange;
  }, [value, onChange]);

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return undefined;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript.trim();
      if (!transcript || !onChangeRef.current) return;

      const currentValue = valueRef.current.trim();
      onChangeRef.current({
        target: {
          name,
          value: currentValue ? `${currentValue} ${transcript}` : transcript,
        },
      });
      setErrorMessage('');
    };

    recognition.onend = () => setListening(false);
    recognition.onerror = (event) => {
      setListening(false);
      setErrorMessage(
        event.error === 'not-allowed'
          ? 'Allow microphone access to use voice typing.'
          : 'Voice typing could not start. Please try again.'
      );
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.abort();
      recognitionRef.current = null;
    };
  }, [lang, name]);

  const toggleListening = () => {
    const recognition = recognitionRef.current;
    if (!recognition) return;

    setErrorMessage('');
    if (listening) {
      recognition.stop();
      setListening(false);
      return;
    }

    try {
      recognition.start();
      setListening(true);
    } catch {
      setListening(false);
      setErrorMessage('Voice typing could not start. Please try again.');
    }
  };

  const sharedProps = {
    name,
    value,
    onChange,
    placeholder,
    className,
    disabled,
    ...props,
  };

  return (
    <div className="voice-input-wrapper">
      {multiline ? (
        <textarea {...sharedProps} />
      ) : (
        <input {...sharedProps} />
      )}

      <button
        type="button"
        className={`voice-input-button${listening ? ' is-listening' : ''}`}
        onClick={toggleListening}
        disabled={!supported || disabled}
        aria-label={
          !supported
            ? 'Voice input is not supported'
            : listening
              ? 'Stop voice typing'
              : 'Start voice typing'
        }
        title={
          !supported
            ? 'Voice typing is not supported in this browser'
            : listening
              ? 'Stop listening'
              : 'Start voice typing'
        }
      >
        {listening ? <MicOff size={18} /> : <Mic size={18} />}
      </button>

      <span className="voice-input-status" aria-live="polite">
        {listening
          ? 'Listening...'
          : errorMessage || (!supported ? 'Voice typing is not supported in this browser.' : '')}
      </span>
    </div>
  );
}