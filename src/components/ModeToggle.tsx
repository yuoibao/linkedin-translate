'use client';

import { COLORS, Mode, MODE } from '@/lib/constants';

interface ModeToggleProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}

export default function ModeToggle({ mode, onModeChange }: ModeToggleProps) {
  return (
    <div
      className="inline-flex rounded-lg p-1 mb-6"
      style={{ backgroundColor: COLORS.tabInactive }}
    >
      <button
        onClick={() => onModeChange(MODE.TO_LINKEDIN)}
        className={`px-4 md:px-6 py-2 rounded-md text-sm md:text-base font-medium transition-all ${
          mode === MODE.TO_LINKEDIN ? 'shadow-sm' : ''
        }`}
        style={{
          backgroundColor: mode === MODE.TO_LINKEDIN ? COLORS.background : 'transparent',
          color: mode === MODE.TO_LINKEDIN ? COLORS.primary : COLORS.textSecondary,
        }}
      >
        大白话 → LinkedIn
      </button>
      <button
        onClick={() => onModeChange(MODE.TO_HUMAN)}
        className={`px-4 md:px-6 py-2 rounded-md text-sm md:text-base font-medium transition-all ${
          mode === MODE.TO_HUMAN ? 'shadow-sm' : ''
        }`}
        style={{
          backgroundColor: mode === MODE.TO_HUMAN ? COLORS.background : 'transparent',
          color: mode === MODE.TO_HUMAN ? COLORS.primary : COLORS.textSecondary,
        }}
      >
        LinkedIn → 人话
      </button>
    </div>
  );
}
