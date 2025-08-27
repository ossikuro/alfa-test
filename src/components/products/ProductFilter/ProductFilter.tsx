import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@/lib/store'
import { RootState } from '@/lib/store'
import styles from './ProductFilter.module.css'

export const ProductFilter: React.FC = () => {
    const dispatch = useDispatch()
    const currentFilter = useSelector(
        (state: RootState) => state.products.filter
    )
    const favoritesCount = useSelector(
        (state: RootState) => state.products.favorites.length
    )

    return (
        <div className={styles.filter}>
            <button
                className={`${styles.filterButton} ${
                    currentFilter === 'all' ? styles.active : ''
                }`}
                onClick={() => dispatch(setFilter('all'))}
            >
                Все товары
            </button>

            <button
                className={`${styles.filterButton} ${
                    currentFilter === 'favorites' ? styles.active : ''
                }`}
                onClick={() => dispatch(setFilter('favorites'))}
            >
                Избранное ({favoritesCount})
            </button>
        </div>
    )
}
