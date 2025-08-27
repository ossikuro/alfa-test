import React from 'react'
import { useDispatch } from 'react-redux'
import { toggleLike, deleteProduct } from '@/lib/store'
import { Product } from '@/lib/store'
import { Button } from '@/components/ui/Button/Button'
import styles from '@/components/products/ProductCard/ProductCard.module.css'
import DeleteIcon from '@/assets/delete.svg'
import LikeIcon from '@/assets/favorites.svg'

interface ProductCardProps {
    product: Product
    onCardClick: (id: number) => void
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onCardClick,
}) => {
    const dispatch = useDispatch()

    const handleLikeClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent click on the card
        dispatch(toggleLike(product.id))
    }

    const handleDeleteClick = (e: React.MouseEvent) => {
        e.stopPropagation() // Prevent click on the card
        dispatch(deleteProduct(product.id))
    }

    return (
        <div className={styles.card} onClick={() => onCardClick(product.id)}>
            <div className={styles.actions}>
                <Button
                    variant={product.isLiked ? 'liked' : 'init'}
                    mode="icon"
                    onClick={handleLikeClick}
                >
                    <LikeIcon />
                </Button>

                <Button variant="init" mode="icon" onClick={handleDeleteClick}>
                    <DeleteIcon />
                </Button>
            </div>

            <div className={styles.imageContainer}>
                <img
                    src={product.image}
                    alt={product.title}
                    className={styles.image}
                />
            </div>

            <div className="product-content">
                <h3 className={styles.price}>${product.price}</h3>
                <p className={styles.title}>{product.title}</p>
                <p className={styles.description}>
                    {product.description.length > 74
                        ? `${product.description.substring(0, 74)}...`
                        : product.description}
                </p>
            </div>
        </div>
    )
}
