// src/components/product/ProductGrid.tsx
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import cartIcon from '../../assets/icon-white.svg';
import { products as allProducts, Product } from '../../data/products';
import useViewport from '../../useViewport';
import './ProductGrid.css';

interface ProductGridProps {
    categoryId?: number;
    products?: Product[];
    isSmallCard?: boolean;
}

const ProductGrid: React.FC<ProductGridProps> = ({ categoryId, products: propProducts, isSmallCard = false }) => {
    const { isMobile, isTablet, isDesktop } = useViewport();

    const handleAddToCart = (productId: number) => {
        console.log(`Добавлен в корзину: ${productId}`);
    };

    const allProductsArray = Object.values(allProducts) as Product[][];
    const flattenedProducts = allProductsArray.flat();
    const displayProducts = propProducts || flattenedProducts.filter(
        (product: Product) => categoryId === undefined || product.categoryId === categoryId
    );

    const uniqueDisplayProducts = Array.from(
        new Map(displayProducts.map((product) => [product.id, product])).values()
    );

    const firstRowProducts = isDesktop
        ? uniqueDisplayProducts.slice(0, 4)
        : isTablet
            ? uniqueDisplayProducts.slice(0, 3)
            : uniqueDisplayProducts.slice(0, 6);

    const secondRowProducts = isDesktop
        ? uniqueDisplayProducts.slice(4, 7)
        : isTablet
            ? uniqueDisplayProducts.slice(3, 5)
            : [];

    useEffect(() => {
        console.log('ProductGrid rendered with categoryId:', categoryId);
        console.log('First row cards rendered:', firstRowProducts.length);
        console.log('Second row cards rendered:', secondRowProducts.length);
    }, [categoryId, firstRowProducts, secondRowProducts]);

    const FirstRowProductCard = ({ product }: { product: Product }) => (
        <Link to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card first-row-card">
                <div className="product-image-container">
                    <img src="/magnolia.png" alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                    <div className="product-price">{product.price} ₽</div>
                    <div className="product-name">{product.name}</div>
                    <button
                        className="add-to-cart-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product.id);
                        }}
                        aria-label={`Добавить ${product.name} в корзину`}
                    >
                        <img src={cartIcon} alt="" className="cart-icon" aria-hidden="true" />
                        В корзину
                    </button>
                </div>
            </div>
        </Link>
    );

    const SecondRowProductCard = ({ product }: { product: Product }) => (
        <Link to={`/product/${product.id}`} className="product-card-link">
            <div className="product-card second-row-card">
                <div className="product-image-container">
                    <img src="/magnolia.png" alt={product.name} className="product-image" />
                </div>
                <div className="product-info">
                    <div className="product-price">{product.price} ₽</div>
                    <div className="product-name">{product.name}</div>
                    <button
                        className="add-to-cart-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleAddToCart(product.id);
                        }}
                        aria-label={`Добавить ${product.name} в корзину`}
                    >
                        <img src={cartIcon} alt="" className="cart-icon" aria-hidden="true" />
                        В корзину
                    </button>
                </div>
            </div>
        </Link>
    );

    return (
        <div className="product-grid-container">
            <div className="product-grid first-row">
                {firstRowProducts.map((product) => (
                    <FirstRowProductCard key={product.id} product={product} />
                ))}
            </div>
            {!isSmallCard && (
                <div className="product-grid second-row">
                    {secondRowProducts.map((product) => (
                        <SecondRowProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProductGrid;