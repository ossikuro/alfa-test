import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'export',
    //trailingSlash: true,
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    assetPrefix: process.env.NODE_ENV === 'production' ? '/alfa-test/' : '',
    skipTrailingSlashRedirect: true,

    //basePath: '/alfa-test',
    //assetPrefix: '/alfa-test/',

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/, // обрабатываем все .svg файлы
            use: ['@svgr/webpack'], // используем SVGR loader
        })
        return config
    },
}

export default nextConfig
