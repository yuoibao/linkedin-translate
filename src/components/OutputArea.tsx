'use client';

import { COLORS } from '@/lib/constants';

interface OutputAreaProps {
  value: string;
  isLoading?: boolean;
}

export default function OutputArea({ value, isLoading }: OutputAreaProps) {
  if (isLoading) {
    return (
      <div
        className="w-full h-40 p-4 rounded-lg border flex items-center justify-center"
        style={{
          borderColor: COLORS.border,
          backgroundColor: COLORS.cardBg,
        }}
      >
        <div className="flex items-center gap-3" style={{ color: COLORS.textSecondary }}>
          <div
            className="w-5 h-5 border-2 border-t-transparent rounded-full animate-spin"
            style={{ borderColor: COLORS.primary, borderTopColor: 'transparent' }}
          />
          <span>翻译中...</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-40 p-4 rounded-lg border text-base overflow-auto whitespace-pre-wrap"
      style={{
        borderColor: value ? COLORS.border : COLORS.border,
        backgroundColor: COLORS.cardBg,
        color: value ? COLORS.textPrimary : COLORS.textSecondary,
      }}
    >
      {value || '翻译结果将在这里显示'}
    </div>
  );
}
