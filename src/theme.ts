import { createTheme, ThemeOptions } from '@mui/material/styles';

// Color Palette - Green Theme
const colors = {
  primary: '#04BF33',        // Bright green
  secondary: '#C1D9C7',      // Light green/mint
  background: '#F2F2F2',
  surface: '#F9FAFB',
  textPrimary: '#8C8C88',
  accent: '#078C03',         // Darker green
  dark: '#022601',           // Almost black green
  darkSecondary: '#067302',  // Very dark green
  darkTertiary: '#078C03',   // Dark green
  white: '#F2F2F2',
  error: '#d32f2f',
  warning: '#ed6c02',
  info: '#0288d1',
  success: '#04BF33',        // Use primary green for success
};

// Theme configuration
const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: colors.primary,      // #04BF33 - Bright green
      light: colors.secondary,   // #C1D9C7 - Light green
      dark: colors.darkTertiary, // #078C03 - Dark green
      contrastText: colors.white,
    },
    secondary: {
      main: colors.secondary,    // #C1D9C7 - Light green
      light: '#E8F5E9',          // Lighter green
      dark: colors.accent,       // #078C03 - Darker green
      contrastText: colors.dark,
    },
    background: {
      default: colors.background,
      paper: colors.surface,
    },
    text: {
      primary: colors.textPrimary,
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
    error: {
      main: colors.error,
      light: '#ef5350',
      dark: '#c62828',
    },
    warning: {
      main: colors.warning,
      light: '#ff9800',
      dark: '#e65100',
    },
    info: {
      main: colors.info,
      light: '#03a9f4',
      dark: '#01579b',
    },
    success: {
      main: colors.success,      // #04BF33 - Bright green
      light: colors.secondary,   // #C1D9C7 - Light green
      dark: colors.darkTertiary, // #078C03 - Dark green
    },
    divider: 'rgba(0, 0, 0, 0.08)',
  },
  typography: {
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontWeight: 700,
      fontSize: '2.5rem',
      lineHeight: 1.2,
      color: colors.dark,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h2: {
      fontWeight: 700,
      fontSize: '2rem',
      lineHeight: 1.3,
      color: colors.dark,
      '@media (max-width:600px)': {
        fontSize: '1.75rem',
      },
    },
    h3: {
      fontWeight: 600,
      fontSize: '1.75rem',
      lineHeight: 1.4,
      color: colors.dark,
      '@media (max-width:600px)': {
        fontSize: '1.5rem',
      },
    },
    h4: {
      fontWeight: 600,
      fontSize: '1.5rem',
      lineHeight: 1.4,
      color: colors.dark,
    },
    h5: {
      fontWeight: 600,
      fontSize: '1.25rem',
      lineHeight: 1.5,
      color: colors.dark,
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
      lineHeight: 1.5,
      color: colors.dark,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.textPrimary,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
      color: colors.textPrimary,
    },
    button: {
      fontWeight: 600,
      textTransform: 'none',
      fontSize: '0.95rem',
    },
    caption: {
      fontSize: '0.75rem',
      lineHeight: 1.5,
      color: colors.textPrimary,
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.08)',
    '0 4px 12px rgba(0,0,0,0.1)',
    '0 6px 16px rgba(0,0,0,0.12)',
    '0 8px 20px rgba(0,0,0,0.14)',
    '0 10px 24px rgba(0,0,0,0.16)',
    '0 12px 28px rgba(0,0,0,0.18)',
    '0 14px 32px rgba(0,0,0,0.2)',
    '0 16px 36px rgba(0,0,0,0.22)',
    '0 18px 40px rgba(0,0,0,0.24)',
    '0 20px 44px rgba(0,0,0,0.26)',
    '0 22px 48px rgba(0,0,0,0.28)',
    '0 24px 52px rgba(0,0,0,0.3)',
    '0 26px 56px rgba(0,0,0,0.32)',
    '0 28px 60px rgba(0,0,0,0.34)',
    '0 30px 64px rgba(0,0,0,0.36)',
    '0 32px 68px rgba(0,0,0,0.38)',
    '0 34px 72px rgba(0,0,0,0.4)',
    '0 36px 76px rgba(0,0,0,0.42)',
    '0 38px 80px rgba(0,0,0,0.44)',
    '0 40px 84px rgba(0,0,0,0.46)',
    '0 42px 88px rgba(0,0,0,0.48)',
    '0 44px 92px rgba(0,0,0,0.5)',
    '0 46px 96px rgba(0,0,0,0.52)',
    '0 48px 100px rgba(0,0,0,0.54)',
  ],
  spacing: 8,
  components: {
    // Button Component Overrides
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: 'none',
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 4px 12px rgba(108, 115, 61, 0.3)',
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          backgroundColor: colors.primary,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors.secondary,
            boxShadow: '0 4px 12px rgba(108, 115, 61, 0.3)',
          },
        },
        outlined: {
          borderColor: colors.primary,
          color: colors.primary,
          '&:hover': {
            borderColor: colors.secondary,
            backgroundColor: 'rgba(157, 166, 93, 0.08)',
          },
        },
        text: {
          color: colors.primary,
          '&:hover': {
            backgroundColor: 'rgba(108, 115, 61, 0.08)',
          },
        },
        sizeLarge: {
          padding: '12px 24px',
          fontSize: '1.1rem',
        },
        sizeSmall: {
          padding: '6px 12px',
          fontSize: '0.875rem',
        },
      },
    },
    // AppBar Component Overrides
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.dark,
          color: colors.white,
          boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
        },
      },
    },
    // Card Component Overrides
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          border: `1px solid ${colors.background}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 8px 30px rgba(108,115,61,0.2)',
          },
        },
      },
    },
    // Paper Component Overrides
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
        elevation2: {
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
        elevation3: {
          boxShadow: '0 6px 16px rgba(0,0,0,0.12)',
        },
      },
    },
    // TextField Component Overrides
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 8,
            backgroundColor: colors.surface,
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.primary,
            },
          },
        },
      },
    },
    // InputBase Component Overrides
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
    // Chip Component Overrides
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 500,
        },
        colorPrimary: {
          backgroundColor: colors.primary,
          color: colors.white,
          '&:hover': {
            backgroundColor: colors.secondary,
          },
        },
      },
    },
    // ListItemButton Component Overrides
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '4px 8px',
          transition: 'all 0.2s ease',
          '&:hover': {
            backgroundColor: 'rgba(157, 166, 93, 0.15)',
            transform: 'translateX(4px)',
          },
          '&.Mui-selected': {
            backgroundColor: 'rgba(108, 115, 61, 0.2)',
            '&:hover': {
              backgroundColor: 'rgba(108, 115, 61, 0.25)',
            },
          },
        },
      },
    },
    // Drawer Component Overrides
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRadius: '0 12px 12px 0',
        },
      },
    },
    // Container Component Overrides
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: 24,
          paddingRight: 24,
          '@media (max-width:600px)': {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
  },
};

// Create and export the theme
const theme = createTheme(themeOptions);

// Export color constants for direct use if needed
export { colors };
export default theme;

