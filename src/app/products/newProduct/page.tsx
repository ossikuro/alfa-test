'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { addProduct } from '@/lib/store'
import { RootState } from '@/lib/store'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { Select } from '@/components/ui/Select/Select'
import styles from './createProduct.module.css'

interface ProductForm {
    title: string
    description: string
    price: string
    category: string
    image: File | null
    imagePreview: string
}

export default function CreateProductPage() {
    const dispatch = useDispatch()
    const router = useRouter()

    // Берем категории из Redux store
    const categories = useSelector(
        (state: RootState) => state.products.categories
    )

    const [formData, setFormData] = useState<ProductForm>({
        title: '',
        description: '',
        price: '',
        category: '',
        image: null,
        imagePreview: '',
    })

    const [errors, setErrors] = useState<
        Partial<Omit<ProductForm, 'image'>> & { image?: string }
    >({})

    // Преобразуем категории в options для Select
    const categoryOptions = [
        { value: '', label: 'Выберите категорию' },
        ...categories.map((category) => ({
            value: category,
            label: category.charAt(0).toUpperCase() + category.slice(1),
        })),
    ]

    // Загрузка изображения
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }))

            // Убираем ошибку изображения если была
            if (errors.image) {
                setErrors((prev) => ({ ...prev, image: undefined }))
            }
        }
    }

    // Обновление текстовых полей
    const handleInputChange = (
        field: keyof Omit<ProductForm, 'image'>,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // Убираем ошибку при изменении поля
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    // Обновление категории
    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }))

        // Убираем ошибку категории если была
        if (errors.category) {
            setErrors((prev) => ({ ...prev, category: undefined }))
        }
    }

    // Валидация формы
    const validateForm = (): boolean => {
        const newErrors: Partial<Omit<ProductForm, 'image'>> & {
            image?: string
        } = {}

        if (!formData.title.trim()) {
            newErrors.title = 'Product Name is required'
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required'
        }

        if (
            !formData.price.trim() ||
            isNaN(Number(formData.price)) ||
            Number(formData.price) <= 0
        ) {
            newErrors.price = 'Enter valid price'
        }

        if (!formData.category) {
            newErrors.category = 'Category is required'
        }

        if (!formData.image) {
            newErrors.image = 'Image is required'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    // Обработчик отправки формы
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && formData.image) {
            // Создаем временный URL для загруженного файла
            const imageUrl = URL.createObjectURL(formData.image)

            const newProduct = {
                id: Date.now(),
                title: formData.title,
                description: formData.description,
                price: Number(formData.price),
                category: formData.category,
                image: imageUrl,
                rating: { rate: 0, count: 0 },
                isLiked: false,
            }

            dispatch(addProduct(newProduct))
            router.push('/products')
        }
    }

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Button
                        variant="init"
                        mode="text"
                        onClick={() => router.push('/products')}
                    >
                        ← Назад к товарам
                    </Button>
                    <h1 className={styles.title}>Создать новый товар</h1>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                        <div className={styles.imageSection}>
                            <label className={styles.imagePlaceholder}>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    className={styles.fileInput}
                                />
                                {formData.imagePreview ? (
                                    <img
                                        src={formData.imagePreview}
                                        alt="Preview"
                                        className={styles.imagePreview}
                                    />
                                ) : (
                                    <div className={styles.imageUpload}>
                                        <span>+ Add Image</span>
                                        <p>Click to upload product image</p>
                                    </div>
                                )}
                            </label>
                            {errors.image && (
                                <p className={styles.errorText}>
                                    {errors.image}
                                </p>
                            )}
                        </div>

                        <div className={styles.infoSection}>
                            <Input
                                value={formData.title}
                                onChange={(value) =>
                                    handleInputChange('title', value)
                                }
                                placeholder="Название товара"
                                label="Название"
                                required={true}
                                error={errors.title}
                            />

                            <Input
                                value={formData.description}
                                onChange={(value) =>
                                    handleInputChange('description', value)
                                }
                                placeholder="Описание товара"
                                label="Описание"
                                multiline={true}
                                rows={4}
                                required={true}
                                error={errors.description}
                            />

                            <div className={styles.row}>
                                <div className={styles.col}>
                                    <Input
                                        value={formData.price}
                                        onChange={(value) =>
                                            handleInputChange('price', value)
                                        }
                                        placeholder="0.00"
                                        label="Цена ($)"
                                        type="number"
                                        required={true}
                                        error={errors.price}
                                    />
                                </div>
                                <div className={styles.col}>
                                    <Select
                                        value={formData.category}
                                        onChange={handleCategoryChange}
                                        options={categoryOptions}
                                        placeholder="Выберите категорию"
                                    />
                                    {errors.category && (
                                        <p className={styles.errorText}>
                                            {errors.category}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <Button
                                type="submit"
                                variant="liked"
                                mode="text"
                                className={styles.submitButton}
                            >
                                Создать товар
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
