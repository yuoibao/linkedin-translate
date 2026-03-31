'use client';

import { useState } from 'react';
import { COLORS } from '@/lib/constants';

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
}

export default function CopyButton({ text, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text || disabled) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || !text}
      className="mt-4 px-6 py-2.5 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      style={{
        backgroundColor: copied ? COLORS.success : COLORS.background,
        color: copied ? '#FFFFFF' : COLORS.textSecondary,
        borderWidth: '1px',
        borderStyle: 'solid',
        borderColor: copied ? COLORS.success : COLORS.border,
      }}
    >
      {copied ? (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M13.5 2.5L6 10l-3-3 1-1 2 2 6-6 1.5 1.5z" />
          </svg>
          已复制 ✓
        </>
      ) : (
        <>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
            <rect x="4" y="4" width="9" height="9" rx="1" />
            <path d="M3 12V3a1 1 0 011-1h9" />
          </svg>
          复制结果
        </>
      )}
    </button>
  );
}
