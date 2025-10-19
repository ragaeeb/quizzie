import '@/styles/globals.css';
import { Link } from '@heroui/link';
import clsx from 'clsx';
import type { Metadata, Viewport } from 'next';
import { Footer } from '@/components/footer';
import { Navbar } from '@/components/navbar';
import { fontSans } from '@/config/fonts';
import { siteConfig } from '@/config/site';
import { Providers } from './providers';

export const metadata: Metadata = {
    description: siteConfig.description,
    icons: { icon: '/icon.svg' },
    title: { default: siteConfig.name, template: `%s - ${siteConfig.name}` },
};

export const viewport: Viewport = {
    themeColor: [
        { color: 'white', media: '(prefers-color-scheme: light)' },
        { color: 'black', media: '(prefers-color-scheme: dark)' },
    ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html suppressHydrationWarning lang="en">
            <head />
            <body
                className={clsx('min-h-screen bg-background font-sans text-foreground antialiased', fontSans.variable)}
            >
                <Providers themeProps={{ attribute: 'class', defaultTheme: 'dark' }}>
                    <div className="relative flex h-screen flex-col">
                        <Navbar />
                        <main className="container mx-auto max-w-7xl flex-grow px-6 pt-16">{children}</main>
                        <Footer />
                    </div>
                </Providers>
            </body>
        </html>
    );
}
