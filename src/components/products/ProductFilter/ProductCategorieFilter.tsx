import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCategoryFilter, setCategories } from '@/lib/store'
import { RootState } from '@/lib/store'
import { Select } from '@/components/ui/Select/Select'
import { fetchCategories } from '@/lib/api'
import styles from './ProductCategorieFilter.module.css'

export const ProductCategorySelect: React.FC = () => {
    const dispatch = useDispatch()
    const currentCategory = useSelector(
        (state: RootState) => state.products.categoryFilter
    )
    const categories = useSelector(
        (state: RootState) => state.products.categories
    )

    useEffect(() => {
        const loadCategories = async () => {
            const categoriesData = await fetchCategories()
            dispatch(setCategories(categoriesData))
        }
        loadCategories()
    }, [dispatch])

    const options = [
        { value: 'all', label: 'all godies' },
        ...categories.map((category) => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1),
        })),
    ]

    const handleCategoryChange = (value: string) => {
        dispatch(setCategoryFilter(value))
    }

    return (
        <div className={styles.filterCategorie}>
            <Select
                value={currentCategory}
                onChange={handleCategoryChange}
                options={options}
                placeholder="All goodies"
            />
        </div>
    )
}
