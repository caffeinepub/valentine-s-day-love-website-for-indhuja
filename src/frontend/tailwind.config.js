import typography from '@tailwindcss/typography';
import containerQueries from '@tailwindcss/container-queries';
import animate from 'tailwindcss-animate';

/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['index.html', 'src/**/*.{js,ts,jsx,tsx,html,css}'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            colors: {
                border: 'oklch(var(--border))',
                input: 'oklch(var(--input))',
                ring: 'oklch(var(--ring) / <alpha-value>)',
                background: 'oklch(var(--background))',
                foreground: 'oklch(var(--foreground))',
                primary: {
                    DEFAULT: 'oklch(var(--primary) / <alpha-value>)',
                    foreground: 'oklch(var(--primary-foreground))'
                },
                secondary: {
                    DEFAULT: 'oklch(var(--secondary) / <alpha-value>)',
                    foreground: 'oklch(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'oklch(var(--destructive) / <alpha-value>)',
                    foreground: 'oklch(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'oklch(var(--muted) / <alpha-value>)',
                    foreground: 'oklch(var(--muted-foreground) / <alpha-value>)'
                },
                accent: {
                    DEFAULT: 'oklch(var(--accent) / <alpha-value>)',
                    foreground: 'oklch(var(--accent-foreground))'
                },
                popover: {
                    DEFAULT: 'oklch(var(--popover))',
                    foreground: 'oklch(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'oklch(var(--card))',
                    foreground: 'oklch(var(--card-foreground))'
                },
                chart: {
                    1: 'oklch(var(--chart-1))',
                    2: 'oklch(var(--chart-2))',
                    3: 'oklch(var(--chart-3))',
                    4: 'oklch(var(--chart-4))',
                    5: 'oklch(var(--chart-5))'
                }
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)'
            },
            boxShadow: {
                xs: '0 1px 2px 0 rgba(0,0,0,0.05)'
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' }
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' }
                },
                'float-up': {
                    '0%': { 
                        transform: 'translateY(100vh) scale(0)',
                        opacity: '0'
                    },
                    '10%': { opacity: '0.8' },
                    '90%': { opacity: '0.8' },
                    '100%': { 
                        transform: 'translateY(-100vh) scale(1)',
                        opacity: '0'
                    }
                },
                'sparkle-twinkle': {
                    '0%, 100%': { 
                        opacity: '0',
                        transform: 'scale(0)'
                    },
                    '50%': { 
                        opacity: '1',
                        transform: 'scale(1)'
                    }
                },
                'name-pulse': {
                    '0%, 100%': { filter: 'brightness(1)' },
                    '50%': { filter: 'brightness(1.3)' }
                },
                'name-zoom': {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.05)' }
                },
                'shimmer-pass': {
                    '0%': { left: '-100%' },
                    '50%, 100%': { left: '100%' }
                }
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'float-up': 'float-up linear infinite',
                'sparkle-twinkle': 'sparkle-twinkle 2s ease-in-out infinite',
                'name-pulse': 'name-pulse 2s ease-in-out infinite',
                'name-zoom': 'name-zoom 3s ease-in-out infinite',
                'shimmer-pass': 'shimmer-pass 3s ease-in-out infinite'
            }
        }
    },
    plugins: [typography, containerQueries, animate]
};
