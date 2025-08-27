import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setFilter } from '@/lib/store'
import { RootState } from '@/lib/store'
import { Button } from '@/components/ui/Button/Button'
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
            <Button
                variant={currentFilter === 'all' ? 'liked' : 'init'}
                mode="text"
                className={styles.filterButton}
                onClick={() => dispatch(setFilter('all'))}
            >
                Все товары
            </Button>

            <Button
                variant={currentFilter === 'favorites' ? 'liked' : 'init'}
                mode="text"
                onClick={() => dispatch(setFilter('favorites'))}
                className={styles.filterButton}
            >
                Избранное ({favoritesCount})
            </Button>
        </div>
    )
}
