/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export',
    i18n: { locales: ['en'], defaultLocale: 'en' },
    images: {
        domains: ['www.cesar.school'],
        formats: ['image/avif']
    }
}

module.exports = nextConfig
