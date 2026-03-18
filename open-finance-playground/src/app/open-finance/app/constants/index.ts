// Constants for the Open Finance playground

export const FONT_FAMILIES = [
  { value: 'Figtree', label: 'Figtree' },
  { value: 'Inter', label: 'Inter' },
  { value: 'DM Sans', label: 'DM Sans' },
  { value: 'Poppins', label: 'Poppins' },
  { value: 'Roboto', label: 'Roboto' },
] as const;

export const LAYOUT_OPTIONS = [
  { value: 'boxed', label: 'Boxed' },
  { value: 'fluid', label: 'Fluid' },
  { value: 'centered', label: 'Centered' },
] as const;

export const FONT_WEIGHTS = [
  { value: 'light', label: 'Light (300)' },
  { value: 'regular', label: 'Regular (400)' },
  { value: 'medium', label: 'Medium (500)' },
  { value: 'semibold', label: 'Semibold (600)' },
  { value: 'bold', label: 'Bold (700)' },
] as const;

export const BORDER_RADIUS_OPTIONS = [
  { value: '0px', label: 'None' },
  { value: '4px', label: 'Small' },
  { value: '8px', label: 'Medium' },
  { value: '12px', label: 'Large' },
  { value: '16px', label: 'X-Large' },
] as const;

export const LABEL_POSITIONS = [
  { value: 'above', label: 'Above' },
  { value: 'floating', label: 'Floating' },
  { value: 'inline', label: 'Inline' },
] as const;

export const DEFAULT_COLORS = {
  primary: '#005FF6',
  background: '#FFFFFF',
  text: '#111111',
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  gray: {
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
  }
} as const;
