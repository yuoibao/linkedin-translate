'use client';

import { COLORS, MAX_CHARS } from '@/lib/constants';

interface InputAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  disabled?: boolean;
}

export default function InputArea({
  value,
  onChange,
  placeholder,
  disabled,
}: InputAreaProps) {
  const charCount = value.length;
  const isOverLimit = charCount > MAX_CHARS;

  return (
    <div className="mb-4">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full h-40 p-4 rounded-lg border text-base resize-none focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed placeholder:text-gray-400"
        style={{
          borderColor: isOverLimit ? COLORS.error : COLORS.border,
          backgroundColor: COLORS.background,
          color: COLORS.textPrimary,
        }}
      />
      <div
        className="text-right text-sm mt-1"
        style={{ color: isOverLimit ? COLORS.error : COLORS.textSecondary }}
      >
        {charCount}/{MAX_CHARS} 字
      </div>
    </div>
  );
}
