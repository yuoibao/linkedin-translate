'use client';

import { COLORS } from '@/lib/constants';

export default function Header() {
  return (
    <header
      className="border-b"
      style={{ borderColor: COLORS.border }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: COLORS.primary }}
          >
            in
          </div>
          <h1
            className="text-xl font-bold"
            style={{ color: COLORS.textPrimary }}
          >
            LinkedIn Speak Translator
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-6">
          <a
            href="#"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: COLORS.textSecondary }}
          >
            关于
          </a>
          <a
            href="#"
            className="text-sm font-medium hover:opacity-70 transition-opacity"
            style={{ color: COLORS.textSecondary }}
          >
            使用指南
          </a>
        </nav>
        <button
          className="md:hidden p-2 rounded-lg"
          style={{ backgroundColor: COLORS.cardBg }}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke={COLORS.textSecondary}
            strokeWidth="2"
          >
            <path d="M3 12h18M3 6h18M3 18h18" />
          </svg>
        </button>
      </div>
    </header>
  );
}
