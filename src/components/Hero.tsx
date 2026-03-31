import { COLORS } from '@/lib/constants';

export default function Hero() {
  return (
    <section className="py-8 md:py-12">
      <div className="max-w-5xl mx-auto px-4 md:px-6 text-center">
        <h2
          className="text-2xl md:text-3xl font-bold mb-4"
          style={{ color: COLORS.textPrimary }}
        >
          大白话 <span className="mx-2">↔</span> LinkedIn腔
          <span className="ml-2" style={{ color: COLORS.primary }}>
            一键互译
          </span>
        </h2>
        <p
          className="text-base md:text-lg max-w-2xl mx-auto"
          style={{ color: COLORS.textSecondary }}
        >
          让每个人都能写出地道的LinkedIn文案，让阅读LinkedIn不再费脑
        </p>
      </div>
    </section>
  );
}
