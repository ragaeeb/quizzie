import { heroui } from '@heroui/theme';
import type { Config } from 'tailwindcss';

/** @type {import('tailwindcss').Config} */
const config: Config = {
    content: [
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: 'class',
    plugins: [heroui()],
    theme: { extend: { fontFamily: { mono: ['var(--font-mono)'], sans: ['var(--font-sans)'] } } },
};

export default config;
