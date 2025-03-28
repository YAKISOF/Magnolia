// src/pages/ProductDetailPage.tsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import Footer from '../components/footer/Footer';
import ProductGrid from '../components/product/ProductGrid';
import cartIcon from '../assets/icon-white.svg';
import { products, Product } from '../data/products';
import { useCart } from '../context/CartContext';
import './ProductDetailPage.css';

const ProductDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const navigate = useNavigate();
    const { addToCart } = useCart();

    const productId = id ? parseInt(id, 10) : NaN;

    if (isNaN(productId)) {
        return <div>Некорректный ID продукта</div>;
    }

    const product = Object.values(products)
        .flat()
        .find((p: Product) => p.id === productId);

    if (!product) {
        return <div>Продукт не найден</div>;
    }

    const description =
        'Необычная, двухцветная окраска розы как будто создана для романтичных поздравлений и возвышенных подарков.';
    const composition = [
        { name: 'Роза', quantity: 15 },
        { name: 'Кексы', quantity: 2 },
    ];

    // Миниатюры — всегда magnolia.png
    const thumbnails = ['/magnolia.png', '/magnolia.png', '/magnolia.png', '/magnolia.png'];
    // Основное изображение — берём из product.images или используем заглушку
    const mainImages = product.images || ['/magnolia.png', '/magnolia.png', '/magnolia.png', '/magnolia.png'];

    const relatedProducts = Object.values(products)
        .flat()
        .filter((p: Product) => p.categoryId === product.categoryId && p.id !== productId)
        .slice(0, 4);

    const handleThumbnailClick = (index: number) => {
        setCurrentImageIndex(index);
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart({ id: product.id, name: product.name, price: product.price });
            navigate('/cart');
        }
    };

    return (
        <div className="product-detail-page">
            <AdminHeader />
            <main className="main-content">
                <div className="product-detail-container">
                    <div className="product-detail-gallery">
                        <div className="product-detail-gallery-thumbnails">
                            {thumbnails.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt={`${product.name} thumbnail ${index + 1}`}
                                    className={`product-detail-thumbnail ${index === currentImageIndex ? 'active' : ''}`}
                                    onClick={() => handleThumbnailClick(index)}
                                />
                            ))}
                        </div>
                        <div className="product-detail-main-image">
                            <img src={mainImages[currentImageIndex]} alt={product.name} />
                        </div>
                    </div>
                    <div className="product-detail-info">
                        <p className="product-detail-price">
                            {product.price} ₽ <span className="product-detail-price-note">• по заказу</span>
                        </p>
                        <h1>{product.name}</h1>
                        <div className="product-detail-description-section">
                            <h2>Описание</h2>
                            <p className="product-detail-description">{description}</p>
                        </div>
                        <div className="product-detail-composition">
                            <h2>Состав</h2>
                            <ul>
                                {composition.map((item, index) => (
                                    <li key={index}>
                                        {item.name} — {item.quantity} шт
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <button className="product-detail-add-to-cart-button" onClick={handleAddToCart}>
                            <img src={cartIcon} alt="" className="product-detail-cart-icon" aria-hidden="true" />
                            В корзину
                        </button>
                    </div>
                </div>
                <section className="product-detail-related-products">
                    <h2>Похожие товары</h2>
                    {relatedProducts.length > 0 ? (
                        <ProductGrid products={relatedProducts} isSmallCard={true} />
                    ) : (
                        <p>Похожие товары отсутствуют.</p>
                    )}
                </section>
            </main>
            <Footer />
        </div>
    );
};

export default ProductDetailPage;