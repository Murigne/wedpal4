import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'sans': ['Quicksand', 'sans-serif'],
				'display': ['Quicksand', 'sans-serif'],
				'satisfy': ['Satisfy', 'cursive'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// Wedding theme colors
				wedding: {
					pink: {
						light: '#FDE2E4',
						DEFAULT: '#FAD2E1',
						dark: '#F8BBD0',
					},
					lavender: {
						light: '#E2D1F9',
						DEFAULT: '#D5C6E0',
						dark: '#B39DDB',
					},
					cream: {
						light: '#FFF1E6',
						DEFAULT: '#FEEAF3',
						dark: '#F8EDD6',
					},
					gold: {
						light: '#FFECB3',
						DEFAULT: '#FFD700',
						dark: '#FFC107',
					},
				},
				navbar: {
					active: '#FB6C3E',
					hover: '#f0f0f0',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'fade-in': {
					from: { opacity: '0', transform: 'translateY(10px)' },
					to: { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-in': {
					from: { transform: 'scale(0.95)', opacity: '0' },
					to: { transform: 'scale(1)', opacity: '1' }
				},
				'draw-heart': {
					'0%': { 'stroke-dashoffset': '1000', 'fill-opacity': '0' },
					'70%': { 'stroke-dashoffset': '0', 'fill-opacity': '0' },
					'100%': { 'stroke-dashoffset': '0', 'fill-opacity': '1' }
				},
				'sparkle': {
					'0%': { transform: 'scale(0) rotate(0deg)', opacity: '0' },
					'50%': { transform: 'scale(1) rotate(180deg)', opacity: '1' },
					'100%': { transform: 'scale(0) rotate(360deg)', opacity: '0' }
				},
				'nav-hover': {
					'0%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-2px)' },
					'100%': { transform: 'translateY(0px)' }
				},
				"sidebar-expand": {
					"0%": { 
						transform: "translate(-100%, -50%)", 
						opacity: "0.5",
						backgroundSize: "100% 100%"
					},
					"100%": { 
						transform: "translate(0, -50%)",
						opacity: "1",
						backgroundSize: "100% 100%"
					}
				},
				"sidebar-collapse": {
					"0%": { 
						transform: "translate(0, -50%)",
						opacity: "1"
					},
					"100%": { 
						transform: "translate(-10%, -50%)",
						opacity: "1"
					}
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" }
				},
				"rotate-180": {
					"0%": { transform: "rotate(0deg)" },
					"100%": { transform: "rotate(180deg)" }
				},
				"rotate-in": {
					"0%": { transform: "rotate(180deg)" },
					"100%": { transform: "rotate(0deg)" }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'fade-in': 'fade-in 0.6s ease-out',
				'scale-in': 'scale-in 0.4s ease-out',
				'draw-heart': 'draw-heart 3s ease-out forwards',
				'sparkle': 'sparkle 2s ease-in-out infinite',
				'nav-hover': 'nav-hover 0.3s ease-in-out',
				"sidebar-expand": "sidebar-expand 0.3s ease-out forwards",
				"sidebar-collapse": "sidebar-collapse 0.3s ease-in forwards",
				"fade-in": "fade-in 0.2s ease-out forwards",
				"rotate-180": "rotate-180 0.3s ease-out forwards",
				"rotate-in": "rotate-180 0.3s ease-in reverse forwards",
			},
			boxShadow: {
				'nav-active': '0 0 10px rgba(251, 108, 62, 0.5)',
				'nav-hover': '0 4px 10px -2px rgba(0, 0, 0, 0.05)',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
