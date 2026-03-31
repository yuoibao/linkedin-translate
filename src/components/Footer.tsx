import { COLORS } from '@/lib/constants';

export default function Footer() {
  return (
    <footer
      className="border-t py-6"
      style={{ borderColor: COLORS.border }}
    >
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <p className="text-sm" style={{ color: COLORS.textSecondary }}>
          © 2026 LinkedIn Speak Translator ·{' '}
          <a href="#" className="hover:underline" style={{ color: COLORS.primary }}>
            隐私政策
          </a>
        </p>
      </div>
    </footer>
  );
}
