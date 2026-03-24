module.exports = {
	darkMode: ["class"],
	content: [
		"./src/app/**/*.{ts,tsx,js,jsx}",
		"./src/components/**/*.{ts,tsx,js,jsx}",
		"./src/hooks/**/*.{ts,tsx,js,jsx}",
		"./src/lib/**/*.{ts,tsx,js,jsx}",
	],
	theme: {
		extend: {
			colors: {
				sidebar: "#000000",
				bg: "#f6f7f8",
				panel: "#ffffff",
				border: "hsl(var(--border))",
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				chart: {
					1: "hsl(var(--chart-1))",
					2: "hsl(var(--chart-2))",
					3: "hsl(var(--chart-3))",
					4: "hsl(var(--chart-4))",
					5: "hsl(var(--chart-5))",
				},
			},
			screens: {
				xs: "480px",
			},
			fontFamily: {
				sans: ["Sora", "sans-serif"],
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
