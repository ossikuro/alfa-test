import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    webpack(config) {
        config.module.rules.push({
            test: /\.svg$/, // обрабатываем все .svg файлы
            use: ['@svgr/webpack'], // используем SVGR loader
        })
        return config
    },
}

export default nextConfig
