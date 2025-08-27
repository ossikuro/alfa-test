import '@/styles/reset.css'
import '@/styles/normalize.css'
import './globals.css'
import { Providers } from './providers'

export const metadata = {
    title: 'Alfa Test App',
    description: 'Тестовое задание',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="ru">
            <body>
                <Providers>
                    <div className="container">{children}</div>
                </Providers>
            </body>
        </html>
    )
}
