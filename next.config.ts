import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const repoBase = 'alfa-test'

const nextConfig: NextConfig = {
    output: 'export',
    trailingSlash: true,
    images: {
        unoptimized: true,
    },
    eslint: {
        ignoreDuringBuilds: true,
    },

    // Чтобы ссылки работали в подпути /repoBase
    basePath: isProd ? `/${repoBase}` : '',

    // Чтобы пути к /_next/*, CSS/JS указывались с префиксом repoBase
    assetPrefix: isProd ? `/${repoBase}/` : undefined,

    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/, // обрабатываем все .svg файлы
            use: ['@svgr/webpack'], // используем SVGR loader
        })
        return config
    },
}

export default nextConfig
