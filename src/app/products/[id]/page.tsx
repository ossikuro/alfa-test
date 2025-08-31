import ProductClient from './ProductClient'
import { fetchProducts } from '@/lib/api'

export async function generateStaticParams() {
    const products = await fetchProducts()
    return products.map((product) => ({
        id: product.id.toString(),
    }))
}

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    return <ProductClient id={Number(id)} />
}
