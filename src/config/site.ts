import pkg from '@/../package.json';

const { version, homepage, author, name } = pkg;

export const siteConfig = {
    author,
    description: 'Make beautiful websites regardless of your design experience.',
    links: {
        discord: 'https://discord.gg/9b6yyZKmH4',
        docs: 'https://heroui.com',
        github: homepage,
        sponsor: 'https://patreon.com/jrgarciadev',
        twitter: 'https://twitter.com/hero_ui',
    },
    name,
    navItems: [
        { href: '/', label: 'Home' },
        { href: '/docs', label: 'Docs' },
        { href: '/pricing', label: 'Pricing' },
        { href: '/blog', label: 'Blog' },
        { href: '/about', label: 'About' },
    ],
    navMenuItems: [
        { href: '/profile', label: 'Profile' },
        { href: '/dashboard', label: 'Dashboard' },
        { href: '/projects', label: 'Projects' },
        { href: '/team', label: 'Team' },
        { href: '/calendar', label: 'Calendar' },
        { href: '/settings', label: 'Settings' },
        { href: '/help-feedback', label: 'Help & Feedback' },
        { href: '/logout', label: 'Logout' },
    ],
    version,
} as const;

export type SiteConfig = typeof siteConfig;
