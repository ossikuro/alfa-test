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
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
                rate: product.rating?.rate || 0,
                count: product.rating?.count || 0,
            },
            isLiked: false,
        }))
    } catch (error) {
        console.error('Error fetching products:', error)

        // mock data
        return [
            {
                id: 1,
                title: 'Пример товара 1',
                price: 99.99,
                description: 'Описание товара для тестирования',
                category: 'electronics',
                image: 'https://via.placeholder.com/300',
                rating: {
                    rate: 4.5,
                    count: 120,
                },
                isLiked: false,
            },
            {
                id: 2,
                title: 'Пример товара 2',
                price: 149.99,
                description: 'Еще одно описание товара',
                category: "men's clothing",
                image: 'https://via.placeholder.com/300',
                rating: {
                    rate: 4.2,
                    count: 89,
                },
                isLiked: false,
            },
        ]
    }
}

// get 1 product
export const fetchProduct = async (id: number): Promise<Product | null> => {
    try {
        const response = await fetch(`${API_URL}/products/${id}`)
        if (!response.ok) {
            throw new Error('Failed to fetch product')
        }
        const product = await response.json()

        return {
            id: product.id,
            title: product.title,
            price: product.price,
            description: product.description,
            category: product.category,
            image: product.image,
            rating: {
                rate: product.rating?.rate || 0,
                count: product.rating?.count || 0,
            },
            isLiked: false,
        }
    } catch (error) {
        console.error('Error fetching product:', error)
        return null
    }
}
