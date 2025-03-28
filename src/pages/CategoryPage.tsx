import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import ProductGrid from '../components/product/ProductGrid';
import Footer from '../components/footer/Footer';
import { products, Product } from '../data/products';

const CategoryPage: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const parsedCategoryId = categoryId ? parseInt(categoryId, 10) : undefined;

    // Move useEffect to the top, before any early returns
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
                {/* Removed the heading <h1>Категория: {parsedCategoryId}</h1> */}
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
