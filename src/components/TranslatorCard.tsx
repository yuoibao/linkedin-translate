'use client';

import { useState, useEffect } from 'react';
import { COLORS, MODE, Mode, StyleOption, MIN_CHARS, MAX_CHARS } from '@/lib/constants';
import ModeToggle from './ModeToggle';
import StyleSelect from './StyleSelect';
import InputArea from './InputArea';
import OutputArea from './OutputArea';
import CopyButton from './CopyButton';

const PLACEHOLDERS = {
  [MODE.TO_LINKEDIN]: '例如：我每天开会很多，帮客户解决问题。把你的日常工作内容输入进来，获得专业的LinkedIn表述...',
  [MODE.TO_HUMAN]: '例如：Passionate about driving innovative solutions in a dynamic environment。把LinkedIn废话粘贴进来，翻译成人话...',
};

export default function TranslatorCard() {
  const [mode, setMode] = useState<Mode>(MODE.TO_LINKEDIN);
  const [style, setStyle] = useState<StyleOption>('general');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Reset when mode changes
  useEffect(() => {
    setInput('');
    setOutput('');
    setError('');
  }, [mode]);

  const handleTranslate = async () => {
    if (!input.trim()) {
      setError('请输入要翻译的内容');
      return;
    }

    if (input.length < MIN_CHARS) {
      setError('内容太短，请补充更多细节');
      return;
    }

    if (input.length > MAX_CHARS) {
      setError('内容过长，请控制在500字以内');
      return;
    }

    setError('');
    setIsLoading(true);
    setOutput('');

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: input, mode, style }),
      });

      const data = await response.json();

      if (data.success) {
        setOutput(data.result);
      } else {
        setError(data.error?.message || '翻译失败，请重试');
      }
    } catch (err) {
      setError('网络连接失败，请检查网络');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const isTranslateDisabled = isLoading || !input.trim() || input.length > MAX_CHARS;

  return (
    <div
      className="w-full max-w-3xl mx-auto px-4 md:px-6 py-6 rounded-xl shadow-sm border"
      style={{
        backgroundColor: COLORS.background,
        borderColor: COLORS.border,
      }}
    >
      <div className="flex justify-center">
        <ModeToggle mode={mode} onModeChange={setMode} />
      </div>

      <InputArea
        value={input}
        onChange={setInput}
        placeholder={PLACEHOLDERS[mode]}
        disabled={isLoading}
      />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <StyleSelect value={style} onChange={setStyle} disabled={isLoading} />
        <div className="flex gap-3">
          <button
            onClick={handleClear}
            disabled={isLoading}
            className="px-5 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              backgroundColor: COLORS.background,
              color: COLORS.textSecondary,
              borderWidth: '1px',
              borderStyle: 'solid',
              borderColor: COLORS.border,
            }}
          >
            清空
          </button>
          <button
            onClick={handleTranslate}
            disabled={isTranslateDisabled}
            className="px-6 py-2.5 rounded-lg text-sm font-medium text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            style={{
              backgroundColor: isTranslateDisabled ? '#9CA3AF' : COLORS.primary,
            }}
          >
            {isLoading ? (
              <>
                <div
                  className="w-4 h-4 border-2 border-t-transparent rounded-full animate-spin"
                  style={{ borderColor: '#FFFFFF', borderTopColor: 'transparent' }}
                />
                翻译中...
              </>
            ) : (
              <>🚀 翻译</>
            )}
          </button>
        </div>
      </div>

      {error && (
        <div
          className="mb-4 p-3 rounded-lg text-sm"
          style={{
            backgroundColor: '#FEF2F2',
            color: COLORS.error,
            border: `1px solid ${COLORS.error}`,
          }}
        >
          {error}
        </div>
      )}

      <OutputArea value={output} isLoading={isLoading} />

      {output && !isLoading && (
        <div className="flex justify-end">
          <CopyButton text={output} />
        </div>
      )}
    </div>
  );
}
