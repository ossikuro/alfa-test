import { Product } from './store'

const API_URL = 'https://fakestoreapi.com'

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await fetch(`${API_URL}/products`)
        if (!response.ok) {
            throw new Error('Failed to fetch products')
        }
        const products = await response.json()
        return products.map((product: any) => ({
            ...product,
            isLiked: false, // добавляем поле для лайков
        }))
    } catch (error) {
        console.error('Error fetching products:', error)
        return []
    }
}
