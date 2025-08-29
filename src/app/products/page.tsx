'use client'

import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { setProducts, Product } from '@/lib/store'
import { fetchProducts } from '@/lib/api'
import { ProductFilter } from '@/components/products/ProductFilter/ProductFilter'
import { ProductCategorySelect } from '@/components/products/ProductFilter/ProductCategorieFilter'
import { ProductCard } from '@/components/products/ProductCard/ProductCard'
import styles from './products.module.css'

export default function ProductsPage() {
    const dispatch = useDispatch()
    const products = useSelector((state: any) => state.products.items)
    const filter = useSelector((state: any) => state.products.filter)
    const favorites = useSelector((state: any) => state.products.favorites)
    const categoryFilter = useSelector(
        (state: any) => state.products.categoryFilter
    )
    const router = useRouter()

    useEffect(() => {
        if (products.length === 0) {
            const loadProducts = async () => {
                const productsData = await fetchProducts()
                dispatch(setProducts(productsData))
            }
            loadProducts()
        }
    }, [dispatch, products.length])

    const filteredProducts = products.filter((product: Product) => {
        const matchesFavorites =
            filter === 'favorites' ? favorites.includes(product.id) : true

        const matchesCategory =
            categoryFilter === 'all'
                ? true
                : product.category === categoryFilter

        return matchesFavorites && matchesCategory
    })

    const handleCardClick = (id: number) => {
        router.push(`/products/${id}`)
    }

    if (products.length === 0) {
        return (
            <div className={styles.page}>
                <h1 className={styles.title}>Goodies</h1>
                <p className={styles.loading}>Uploading catalogue...</p>
            </div>
        )
    }

    return (
        <div className={styles.page}>
            <h1 className={styles.title}>Goodies</h1>
            <div className={styles.filters}>
                <ProductFilter />
                <ProductCategorySelect />
            </div>

            <div
                className={styles.productsGrid}
                key={`${filter}-${categoryFilter}`}
            >
                {filteredProducts.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onCardClick={handleCardClick}
                    />
                ))}
            </div>

            {filter === 'favorites' && filteredProducts.length === 0 && (
                <p className={styles.emptyMessage}>There is no favorites</p>
            )}
        </div>
    )
}
