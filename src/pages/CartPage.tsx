import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import Footer from '../components/footer/Footer';
import ProductGrid from '../components/product/ProductGrid';
import { useCart } from '../context/CartContext';
import trashIcon from '../assets/trash.svg';
import plusIcon from '../assets/plus.svg';
import minusIcon from '../assets/minus.svg';
import './CartPage.css';

const CartPage: React.FC = () => {
    const { cart, addToCart, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

    const suggestedProducts = [
        {
            id: 1,
            categoryId: 1,
            name: 'Французская роза',
            price: 3490,
            images: [
                '/assets/french-rose-1.jpg',
                '/assets/french-rose-2.jpg',
                '/assets/french-rose-3.jpg',
                '/assets/french-rose-4.jpg',
            ],
        },
        {
            id: 2,
            categoryId: 1,
            name: 'Красная роза',
            price: 3490,
            images: [
                '/assets/red-rose-1.jpg',
                '/assets/red-rose-2.jpg',
                '/assets/red-rose-3.jpg',
                '/assets/red-rose-4.jpg',
            ],
        },
        {
            id: 3,
            categoryId: 1,
            name: 'Белая роза',
            price: 3490,
            images: [
                '/assets/white-rose-1.jpg',
                '/assets/white-rose-2.jpg',
                '/assets/white-rose-3.jpg',
                '/assets/white-rose-4.jpg',
            ],
        },
        {
            id: 4,
            categoryId: 1,
            name: 'Розовая роза',
            price: 3490,
            images: [
                '/assets/pink-rose-1.jpg',
                '/assets/pink-rose-2.jpg',
                '/assets/pink-rose-3.jpg',
                '/assets/pink-rose-4.jpg',
            ],
        },
    ];

    const handleQuantityChange = (id: number, delta: number) => {
        const item = cart.find((item) => item.id === id);
        if (item) {
            const newQuantity = item.quantity + delta;
            if (newQuantity <= 0) {
                removeFromCart(id);
            } else {
                updateQuantity(id, newQuantity);
            }
        }
    };

    const handleCheckout = () => {
        navigate('/checkout');
    };

    return (
        <div className="cart-page">
            <AdminHeader />
            <main className="cart-content">
                {cart.length === 0 ? (
                    <div className="empty-cart">
                        <h2 className="empty-cart-title">Корзина пуста</h2>
                        <p className="empty-cart-text">Начните покупки на главной странице</p>
                        <Link to="/" className="back-to-home-button">
                            Начать покупки
                        </Link>
                    </div>
                ) : (
                    <div className="filled-cart">
                        <div className="cart-header">
                            <h2 className="cart-header-title">Корзина</h2>
                        </div>
                        <div className="cart-items">
                            {cart.map((item) => (
                                <div key={item.id} className="cart-item">
                                    <div className="cart-item-left">
                                        <img src="/magnolia.png" alt={item.name} className="cart-item-image" />
                                    </div>
                                    <div className="cart-item-details">
                                        <div className="cart-item-text">
                                            <p className="cart-item-total-price">{item.price * item.quantity} ₽</p>
                                            <h3 className="cart-item-title">{item.name}</h3>
                                            <p className="cart-item-price">{item.price} ₽ / шт</p>
                                        </div>
                                        <div className="cart-item-controls">
                                            <button
                                                className="remove-from-cart-button"
                                                onClick={() => removeFromCart(item.id)}
                                                aria-label={`Удалить ${item.name} из корзины`}
                                            >
                                                <img src={trashIcon} alt="Удалить" className="remove-icon" />
                                            </button>
                                            <div className="quantity-controls">
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, -1)}
                                                    disabled={item.quantity <= 1}
                                                    className="quantity-button quantity-button-minus"
                                                >
                                                    <img src={minusIcon} alt="Уменьшить" className="quantity-icon" />
                                                </button>
                                                <span className="quantity-value">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item.id, 1)}
                                                    className="quantity-button quantity-button-plus"
                                                >
                                                    <img src={plusIcon} alt="Увеличить" className="quantity-icon" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="suggested-products">
                            <h2 className="suggested-products-title">Ничего не забыли?</h2>
                            <ProductGrid products={suggestedProducts} isSmallCard={true} />
                        </div>
                        <div className="cart-summary">
                            <h3 className="cart-summary-total">{totalPrice} ₽</h3>
                            <button className="checkout-button" onClick={handleCheckout}>
                                Перейти к оформлению
                            </button>
                        </div>
                    </div>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default CartPage;