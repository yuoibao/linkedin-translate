import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'LinkedIn Speak Translator - 大白话与LinkedIn腔互译',
  description:
    '免费在线工具，把大白话翻译成地道LinkedIn表述，或把LinkedIn废话翻译成人话。支持多种语气风格。',
  keywords: 'LinkedIn翻译, LinkedIn文案, LinkedIn优化, 简历翻译, 职场表达',
  openGraph: {
    title: 'LinkedIn Speak Translator - 大白话与LinkedIn腔互译',
    description:
      '免费在线工具，把大白话翻译成地道LinkedIn表述，或把LinkedIn废话翻译成人话。',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen flex flex-col" style={{ backgroundColor: '#FFFFFF' }}>
        {children}
      </body>
    </html>
  );
}
