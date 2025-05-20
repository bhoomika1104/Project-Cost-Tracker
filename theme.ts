import { extendTheme, theme as baseTheme } from '@chakra-ui/react';
import type { ThemeConfig } from '@chakra-ui/react';

const colors = {
  ...baseTheme.colors, // include default chakra colors like blue, purple, etc.
  black: {
    500: '#000000',
    contrastText: '#FFFFFF',
  },
  darkRed: {
    500: '#C8102E',
    contrastText: '#FFFFFF',
  },
  brightPink: {
    500: '#FF0054',
    contrastText: '#FFFFFF',
  },
  lightPink: {
    500: '#FADADD',
    contrastText: '#000000',
  },
};

const fonts = {
  heading: `'Inter', sans-serif`,
  body: `'Inter', sans-serif`,
  mono: `'Fira Code', monospace`,
};

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const components = {
  Button: {
    baseStyle: {
      borderRadius: '12px',
      transition: 'transform 0.2s ease-out',
      _active: {
        transform: 'scale(0.98)',
      },
      bg: colors.brightPink[500],
      color: 'white',
      _hover: {
        filter: 'brightness(0.9)',
      },
    },
    variants: {
      matte: {
        bg: colors.brightPink[500],
        boxShadow: 'none',
      },
    },
  },
  Card: {
    baseStyle: {
      borderRadius: '12px',
      border: `0.8px solid ${colors.lightPink[500]}`,
      bg: colors.lightPink[500],
      backdropFilter: 'blur(4px)',
      backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent)`,
      backgroundSize: '20px 20px',
      boxShadow: '0 4px 12px rgba(200, 0, 84, 0.08)',
      padding: '1rem',
    },
  },
  Table: {
    baseStyle: {
      th: {
        bgGradient: 'linear(to-br, #C8102E, #FF0054)',
        color: 'white',
      },
      tbody: {
        tr: {
          bg: colors.lightPink[500],
          _hover: {
            bg: 'rgba(255, 0, 84, 0.05)',
          },
        },
      },
    },
  },
  Input: {
    baseStyle: {
      field: {
        borderRadius: '12px',
        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.03)',
        _focus: {
          boxShadow: `0 0 0 2px ${colors.brightPink[500]}`,
          borderColor: 'transparent',
        },
      },
    },
  },
};

const styles = {
  global: {
    body: {
      bg: colors.lightPink[500],
      color: colors.black[500],
      fontFamily: fonts.body,
      lineHeight: '1.6',
    },
    'h1, h2, h3, h4, h5, h6': {
      fontWeight: 600,
      color: colors.black[500],
      fontFamily: fonts.heading,
    },
    code: {
      fontFamily: fonts.mono,
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  fonts,
  components,
  styles,
  space: {
    px: '1px',
    0: '0',
    1: '4px',
    2: '8px',
    3: '12px',
    4: '16px',
    5: '20px',
    6: '24px',
    8: '32px',
    10: '40px',
    12: '48px',
    16: '64px',
    20: '80px',
    24: '96px',
  },
});

export default theme;
