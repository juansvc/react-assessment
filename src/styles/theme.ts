export const theme = {
  colors: {
    primary: '#4285f4',
    primaryDark: '#3367d6',
    secondary: '#f1f3f4',
    secondaryDark: '#e8eaed',
    text: '#202124',
    textLight: '#5f6368',
    background: '#f4f6f8',
    white: '#ffffff',
    error: '#d93025',
    errorLight: '#fce8e6',
    success: '#0f9d58',
    successLight: '#e6f4ea',
  },
  fontSizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    md: '1rem',      // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    xxl: '1.5rem',   // 24px
    xxxl: '2rem',    // 32px
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },
  space: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    xxl: '3rem',     // 48px
  },
  borderRadius: {
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '1rem',      // 16px
  },
  shadows: {
    sm: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    md: '0 3px 6px rgba(0,0,0,0.15), 0 2px 4px rgba(0,0,0,0.12)',
    lg: '0 10px 20px rgba(0,0,0,0.15), 0 3px 6px rgba(0,0,0,0.10)',
  },
  breakpoints: {
    xs: '320px',
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
  },
  mq: {
    xs: `@media (min-width: 320px)`,
    sm: `@media (min-width: 576px)`,
    md: `@media (min-width: 768px)`,
    lg: `@media (min-width: 992px)`,
    xl: `@media (min-width: 1200px)`,
  },
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
  },
} as const;

export type Theme = typeof theme;