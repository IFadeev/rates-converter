import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        'reaction-bg': {
          DEFAULT: 'hsl(var(--reaction-bg))',
        },
        bar: 'hsl(var(--bar))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
        nunito: ['var(--font-nunito)', 'sans-serif'],
        serif: ['var(--font-playfair)', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'hsl(var(--foreground))',
            '[class~="lead"]': {
              color: 'hsl(var(--muted-foreground))',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: 'hsl(var(--foreground))',
              fontWeight: '700',
            },
            'ol > li::marker': {
              color: 'hsl(var(--primary))',
            },
            'ul > li::marker': {
              color: 'hsl(var(--primary))',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
            blockquote: {
              color: 'hsl(var(--muted-foreground))',
              borderLeftColor: 'hsl(var(--primary))',
              fontStyle: 'italic',
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            code: {
              color: 'hsl(var(--accent-foreground))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '4px',
              padding: '2px 6px',
              fontWeight: '500',
            },
            'pre code': {
              color: 'hsl(var(--accent-foreground))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '8px',
              padding: '0',
            },
            pre: {
              color: 'hsl(var(--accent-foreground))',
              backgroundColor: 'hsl(var(--muted))',
              borderRadius: '8px',
              padding: '16px',
              overflowX: 'auto',
            },
            // Можно кастомизировать другие элементы при необходимости
          },
        },
        invert: {
          css: {
            color: 'hsl(var(--muted-foreground))',
            '[class~="lead"]': {
              color: 'hsl(var(--muted-foreground))',
            },
            a: {
              color: 'hsl(var(--primary))',
            },
            strong: {
              color: 'hsl(var(--foreground))',
            },
            'ol > li::marker': {
              color: 'hsl(var(--primary))',
            },
            'ul > li::marker': {
              color: 'hsl(var(--primary))',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
            },
            blockquote: {
              color: 'hsl(var(--muted-foreground))',
              borderLeftColor: 'hsl(var(--primary))',
            },
            h1: {
              color: 'hsl(var(--foreground))',
            },
            h2: {
              color: 'hsl(var(--foreground))',
            },
            h3: {
              color: 'hsl(var(--foreground))',
            },
            h4: {
              color: 'hsl(var(--foreground))',
            },
            code: {
              color: 'hsl(var(--accent-foreground))',
              backgroundColor: 'hsl(var(--muted))',
            },
            pre: {
              color: 'hsl(var(--accent-foreground))',
              backgroundColor: 'hsl(var(--muted))',
            },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
