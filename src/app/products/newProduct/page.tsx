'use client'

import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { addProduct } from '@/lib/store'
import { Button } from '@/components/ui/Button/Button'
import { Input } from '@/components/ui/Input/Input'
import { Select } from '@/components/ui/Select/Select'
import styles from './newProduct.module.css'
import BackIcon from '@/assets/arrow_back.svg'

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

    // Image upload
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file,
                imagePreview: URL.createObjectURL(file),
            }))

            // Clean error
            if (errors.image) {
                setErrors((prev) => ({ ...prev, image: undefined }))
            }
        }
    }

    // Refresh text fields
    const handleInputChange = (
        field: keyof Omit<ProductForm, 'image'>,
        value: string
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }))

        // УClean up error if the field has changed
        if (errors[field]) {
            setErrors((prev) => ({ ...prev, [field]: undefined }))
        }
    }

    // Categories
    const categoryOptions = [
        { value: '', label: '' },
        { value: 'electronics', label: 'Electronics' },
        { value: 'jewelery', label: 'Jewelery' },
        { value: "men's clothing", label: "Men's Clothing" },
        { value: "women's clothing", label: "Women's Clothing" },
    ]

    // Refresh category
    const handleCategoryChange = (value: string) => {
        setFormData((prev) => ({ ...prev, category: value }))

        // Clean up error if category has been refreshed
        if (errors.category) {
            setErrors((prev) => ({ ...prev, category: undefined }))
        }
    }

    // Form validation
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

    // Send form
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (validateForm() && formData.image) {
            // tempoparry URL
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
                <div className={styles.navigation}>
                    <Button
                        variant="init"
                        mode="both"
                        onClick={() => router.push('/products')}
                    >
                        <BackIcon />
                        Back
                    </Button>
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
                            <h1 className={styles.title}>Add new item</h1>
                            <Input
                                value={formData.title}
                                onChange={(value) =>
                                    handleInputChange('title', value)
                                }
                                placeholder="Add a name"
                                label="Name"
                                required={true}
                                error={errors.title}
                            />

                            <div className={styles.formElementContainer}>
                                <p className={styles.labelSelect}>Category</p>
                                <Select
                                    value={formData.category}
                                    onChange={handleCategoryChange}
                                    options={categoryOptions}
                                    placeholder="--"
                                />
                                {errors.category && (
                                    <p className={styles.errorText}>
                                        {errors.category}
                                    </p>
                                )}
                            </div>

                            <Input
                                value={formData.description}
                                onChange={(value) =>
                                    handleInputChange('description', value)
                                }
                                placeholder="Add description"
                                label="Description"
                                multiline={true}
                                rows={4}
                                required={true}
                                error={errors.description}
                            />

                            <Input
                                value={formData.price}
                                onChange={(value) =>
                                    handleInputChange('price', value)
                                }
                                placeholder="0.00"
                                label="Price"
                                type="number"
                                required={true}
                                error={errors.price}
                            />

                            <Button
                                type="submit"
                                variant="liked"
                                mode="text"
                                className={styles.submitButton}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}
