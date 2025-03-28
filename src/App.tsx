import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import NotFoundPage from './pages/NotFoundPage'; // Добавляем импорт NotFoundPage

const App: React.FC = () => {
    return (
        <CartProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/category/:id" element={<HomePage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/product/:id" element={<ProductDetailPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/confirmation" element={<ConfirmationPage />} />
                    <Route path="*" element={<NotFoundPage />} /> {/* Добавляем маршрут для 404 */}
                </Routes>
            </Router>
        </CartProvider>
    );
};

export default App;