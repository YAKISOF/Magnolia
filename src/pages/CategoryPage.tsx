import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import ProductGrid from '../components/product/ProductGrid';
import Footer from '../components/footer/Footer';
import SwiperCategories from '../components/SwiperCategories';
import { products, Product } from '../data/products';

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const navigate = useNavigate();
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : undefined;

    // Define categories (same as in HomePage)
    const categories = [
        { id: 1, name: 'Все', image: '/magnolia.png' },
        { id: 2, name: 'Популярное', image: '/magnolia.png' },
        { id: 3, name: 'Витрина онлайн', image: '/magnolia.png' },
        { id: 4, name: 'Авторские букеты', image: '/magnolia.png' },
        { id: 5, name: 'Монобукеты', image: '/magnolia.png' },
        { id: 6, name: 'Композиции', image: '/magnolia.png' },
        { id: 7, name: 'Сезонные', image: '/magnolia.png' },
        { id: 8, name: 'Сухоцветы', image: '/magnolia.png' },
        { id: 9, name: 'Свадебный букет', image: '/magnolia.png' },
    ];

    // Handle category click
    const handleCategoryClick = (categoryId: number) => {
        console.log('Navigating to category:', categoryId);
        navigate(`/category/${categoryId}`);
    };

    // Log filtered products
    useEffect(() => {
        if (parsedCategoryId && !isNaN(parsedCategoryId)) {
            const filteredProducts = Object.values(products)
                .flat()
                .filter((product: Product) => product.categoryId === parsedCategoryId);
            console.log('CategoryPage rendered with categoryId:', parsedCategoryId);
            console.log('filteredProducts:', filteredProducts.map(p => ({ id: p.id, name: p.name, categoryId: p.categoryId })));
            console.log('filteredProducts length:', filteredProducts.length);
        }
    }, [parsedCategoryId]);

    if (!parsedCategoryId || isNaN(parsedCategoryId)) {
        return <div>Некорректный ID категории</div>;
    }

    const filteredProducts = Object.values(products)
        .flat()
        .filter((product: Product) => product.categoryId === parsedCategoryId);

    return (
        <div className="category-page">
            <AdminHeader />
            <main className="main-content">
                <SwiperCategories
                    categories={categories}
                    activeCategory={parsedCategoryId}
                    onCategoryClick={handleCategoryClick}
                />
                {filteredProducts.length > 0 ? (
                    <ProductGrid products={filteredProducts} key={`category-${parsedCategoryId}`} />
                ) : (
                    <p>В этой категории нет продуктов.</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CategoryPage;