// src/pages/HomePage.tsx
import React, { useState } from 'react';
import AdminHeader from '../components/admin/AdminHeader';
import Categories from '../components/category/Categories';
import ProductGrid from '../components/product/ProductGrid';
import ContactForm from '../components/contact/ContactForm';
import Footer from '../components/footer/Footer';
import './HomePage.css';

const HomePage: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState<number | undefined>(undefined);

    return (
        <div className="home-page">
            <AdminHeader />
            <Categories activeCategory={activeCategory} setActiveCategory={setActiveCategory} />
            <main className="main-content">
                <ProductGrid categoryId={activeCategory} />
                <ContactForm />
            </main>
            <Footer />
        </div>
    );
};

export default HomePage;
