// src/pages/HomePage.tsx
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import ProductGrid from '../components/product/ProductGrid';
import ContactForm from '../components/contact/ContactForm';
import Footer from '../components/footer/Footer';
import SwiperCategories from '../components/SwiperCategories';
import './HomePage.css';

const MOBILE_BREAKPOINT = 480;
const TABLET_BREAKPOINT = 780;

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);

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

  const handleCategoryClick = useCallback((categoryId: number) => {
    console.log('Navigating to category:', categoryId);
    setActiveCategory(categoryId);
    navigate(`/category/${categoryId}`);
  }, [navigate]);

  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    setIsMobile(width <= MOBILE_BREAKPOINT);
    setIsTablet(width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT);
    console.log('Window width:', width, 'isMobile:', width <= MOBILE_BREAKPOINT, 'isTablet:', width > MOBILE_BREAKPOINT && width <= TABLET_BREAKPOINT);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  useEffect(() => {
    console.log('Categories in HomePage before passing:', categories);
    console.log('Number of categories in HomePage:', categories.length);
    console.log('Active category:', activeCategory);
  }, [categories, activeCategory]);

  return (
      <div className="home-page">
        <AdminHeader />
        <main className="main-content">
          <SwiperCategories
              categories={categories}
              activeCategory={activeCategory}
              onCategoryClick={handleCategoryClick}
          />
          <ProductGrid categoryId={activeCategory} />
          <ContactForm />
        </main>
        <Footer />
      </div>
  );
};

export default HomePage;