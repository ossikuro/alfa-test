import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Templates
export interface Product {
    id: number
    title: string
    price: number
    description: string
    image: string
    isLiked?: boolean
}

export interface ProductsState {
    items: Product[]
    favorites: number[]
    filter: 'all' | 'favorites'
}

// Initial state of the storage
const initialState: ProductsState = {
    items: [],
    favorites: [],
    filter: 'all',
}

// Slice of the Products (no need to create separate file, we have just one slice)
const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: PayloadAction<Product[]>) => {
            state.items = action.payload
        },
        toggleLike: (state, action: PayloadAction<number>) => {
            const productId = action.payload
            const product = state.items.find(
                (item) => item.id === action.payload
            )
            if (product) {
                product.isLiked = !product.isLiked
            }

            const index = state.favorites.indexOf(productId)

            if (index === -1) {
                // add to favorites
                state.favorites.push(productId)
            } else {
                // exclude
                state.favorites.splice(index, 1)
            }
        },
        deleteProduct: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            )
        },
        setFilter: (state, action: PayloadAction<'all' | 'favorites'>) => {
            state.filter = action.payload
        },
    },
})

export const { setProducts, toggleLike, deleteProduct, setFilter } =
    productsSlice.actions

export const store = configureStore({
    reducer: {
        products: productsSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
