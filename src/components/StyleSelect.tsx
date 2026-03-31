'use client';

import { COLORS, STYLE_OPTIONS, StyleOption } from '@/lib/constants';

interface StyleSelectProps {
  value: StyleOption;
  onChange: (style: StyleOption) => void;
  disabled?: boolean;
}

export default function StyleSelect({ value, onChange, disabled }: StyleSelectProps) {
  return (
    <div className="flex items-center gap-2">
      <label
        className="text-sm font-medium"
        style={{ color: COLORS.textSecondary }}
      >
        语气风格
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as StyleOption)}
        disabled={disabled}
        className="px-3 py-2 rounded-lg text-sm border focus:outline-none focus:ring-2 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        style={{
          borderColor: COLORS.border,
          backgroundColor: COLORS.background,
          color: COLORS.textPrimary,
        }}
      >
        {STYLE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
