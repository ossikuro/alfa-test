'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { RootState } from '@/lib/store'
import { Button } from '@/components/ui/Button/Button'
import styles from './productPage.module.css'
import BackIcon from '@/assets/arrow_back.svg'

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const productId = Number(params.id)

    const product = useSelector((state: RootState) =>
        state.products.items.find((item) => item.id === productId)
    )

    if (!product) {
        return (
            <div className={styles.page}>
                <h1>Товар не найден</h1>
                <Button
                    variant="init"
                    mode="both"
                    onClick={() => router.push('/products')}
                >
                    <BackIcon />
                    Вернуться к товарам
                </Button>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.navigation}>
                    <Button
                        variant="init"
                        mode="both"
                        onClick={() => router.push('/products')}
                    >
                        <BackIcon />
                        Назад
                    </Button>
                </div>

                <div className={styles.productContent}>
                    <div className={styles.imageSection}>
                        <img
                            src={product.image}
                            alt={product.title}
                            className={styles.image}
                        />
                    </div>

                    <div className={styles.infoSection}>
                        <div className={styles.titleBlock}>
                            <h1 className={styles.title}>{product.title}</h1>
                            <p className={styles.category}>
                                {product.category}
                            </p>
                        </div>

                        <div className={styles.description}>
                            <p>{product.description}</p>
                        </div>

                        <div className={styles.rating}>
                            <span>Rate {product.rating?.rate || 'Н/Д'}</span>
                            <span>
                                Testimonials {product.rating?.count || 'Н/Д'}
                            </span>
                        </div>

                        <p className={styles.price}>${product.price}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
