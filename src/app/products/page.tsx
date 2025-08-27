'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setProducts, Product } from '@/lib/store'
import { fetchProducts } from '@/lib/api'
import { ProductFilter } from '@/components/products/ProductFilter/ProductFilter'
import { ProductCard } from '@/components/products/ProductCard/ProductCard'
import styles from './products.module.css'

export default function ProductsPage() {
    const dispatch = useDispatch()
    const products = useSelector((state: any) => state.products.items)
    const filter = useSelector((state: any) => state.products.filter)
    const favorites = useSelector((state: any) => state.products.favorites)
    const router = useRouter()

    useEffect(() => {
        const loadProducts = async () => {
            const productsData = await fetchProducts()
            dispatch(setProducts(productsData))
        }

        loadProducts()
    }, [dispatch])

    const filteredProducts =
        filter === 'favorites'
            ? products.filter((product: Product) =>
                  favorites.includes(product.id)
              )
            : products

    const handleCardClick = (id: number) => {
        router.push(`/products/${id}`)
    }

    if (products.length === 0) {
        return (
            <div className={styles.page}>
                <h1 className={styles.title}>Товары</h1>
                <p className={styles.loading}>Загружаем товары...</p>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Товары</h1>
            <ProductFilter />

            <div className={styles.productsGrid} key={filter}>
                {filteredProducts.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>

            {filter === 'favorites' && filteredProducts.length === 0 && (
                <p className={styles.emptyMessage}>Нет избранных товаров</p>
            )}
        </div>
    )
}
