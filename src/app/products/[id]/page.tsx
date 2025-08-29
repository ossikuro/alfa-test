'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux' // Добавляем useDispatch
import { RootState } from '@/lib/store'
import { toggleLike, deleteProduct } from '@/lib/store' // Добавляем actions
import { Button } from '@/components/ui/Button/Button'
import styles from './productPage.module.css'
import BackIcon from '@/assets/arrow_back.svg'
import LikeIcon from '@/assets/favorites.svg' // Иконка лайка
import DeleteIcon from '@/assets/delete.svg' // Иконка удаления

export default function ProductPage() {
    const params = useParams()
    const router = useRouter()
    const dispatch = useDispatch() // Добавляем dispatch
    const productId = Number(params.id)

    const product = useSelector((state: RootState) =>
        state.products.items.find((item) => item.id === productId)
    )

    const handleLikeClick = () => {
        if (product) {
            dispatch(toggleLike(product.id))
        }
    }

    const handleDeleteClick = () => {
        if (product) {
            dispatch(deleteProduct(product.id))
            router.push('/products') // Перенаправляем после удаления
        }
    }

    if (!product) {
        return (
            <div className={styles.page}>
                <div className={styles.container}>
                    <Button
                        variant="init"
                        mode="both"
                        onClick={() => router.push('/products')}
                    >
                        <BackIcon />
                        Back
                    </Button>
                    <h1 className={styles.title}>Товар не найден</h1>
                </div>
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
                        Back
                    </Button>

                    <div className={styles.actions}>
                        <Button
                            variant={product.isLiked ? 'liked' : 'init'}
                            mode="icon"
                            onClick={handleLikeClick}
                        >
                            <LikeIcon />
                        </Button>

                        <Button
                            variant="init"
                            mode="icon"
                            onClick={handleDeleteClick}
                        >
                            <DeleteIcon />
                        </Button>
                    </div>
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
