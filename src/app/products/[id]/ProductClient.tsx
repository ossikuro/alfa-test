'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, toggleLike, deleteProduct } from '@/lib/store'
import { Button } from '@/components/ui/Button/Button'
import styles from './productPage.module.css'
import BackIcon from '@/assets/arrow_back.svg'
import LikeIcon from '@/assets/favorites.svg'
import DeleteIcon from '@/assets/delete.svg'

export default function ProductClient({ id }: { id: number }) {
    const router = useRouter()
    const dispatch = useDispatch()

    const product = useSelector((state: RootState) =>
        state.products.items.find((item) => item.id === id)
    )

    const handleLikeClick = () => {
        if (product) {
            dispatch(toggleLike(product.id))
        }
    }

    const handleDeleteClick = () => {
        if (product) {
            dispatch(deleteProduct(product.id))
            router.push('/products')
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
