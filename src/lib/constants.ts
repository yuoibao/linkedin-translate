export const COLORS = {
  primary: '#0A66C2',
  primaryDark: '#004182',
  secondary: '#7B68EE',
  background: '#FFFFFF',
  cardBg: '#F7F9FA',
  textPrimary: '#1D1D1F',
  textSecondary: '#6B7280',
  success: '#10B981',
  error: '#EF4444',
  border: '#E5E7EB',
  tabInactive: '#F3F4F6',
} as const;

export const STYLE_OPTIONS = [
  { value: 'general', label: '通用' },
  { value: 'startup', label: '创业圈' },
  { value: 'consulting', label: '咨询腔' },
] as const;

export const MODE = {
  TO_LINKEDIN: 'to_linkedin',
  TO_HUMAN: 'to_human',
} as const;

export type StyleOption = typeof STYLE_OPTIONS[number]['value'];
export type Mode = typeof MODE[keyof typeof MODE];

export const MAX_CHARS = 500;
export const MIN_CHARS = 10;
