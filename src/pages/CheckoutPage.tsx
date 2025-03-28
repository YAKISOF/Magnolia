import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from '../components/admin/AdminHeader';
import Footer from '../components/footer/Footer';
import backIcon from '../assets/back.svg';
import trashIcon from '../assets/trash.svg';
import './CheckoutPage.css';

const CheckoutPage: React.FC = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [deliveryMethod, setDeliveryMethod] = useState<'pickup' | 'delivery'>('pickup');

    const progress = step === 1 ? 33 : step === 2 ? 66 : 100;

    const [cartItem, setCartItem] = useState({
        id: 1,
        image: '/magnolia.png',
        name: 'Фалузская роза',
        price: 3490,
        quantity: 1,
        total: 3490,
    });

    const handleBack = () => {
        if (step > 1) {
            setStep(step - 1);
        } else {
            navigate('/cart');
        }
    };

    const handleContinue = () => {
        if (step < 3) {
            setStep(step + 1);
        } else {
            navigate('/confirmation');
        }
    };

    const handlePayWithSBP = () => {
        // Логика для оплаты по СБП
        navigate('/confirmation'); // Теперь перенаправляем на страницу подтверждения
    };

    const handleSubmitWithoutPayment = () => {
        // Логика для заявки без оплаты
        navigate('/confirmation'); // Уже перенаправляет на страницу подтверждения
    };

    const handleQuantityChange = (delta: number) => {
        const newQuantity = cartItem.quantity + delta;
        if (newQuantity > 0) {
            setCartItem({
                ...cartItem,
                quantity: newQuantity,
                total: cartItem.price * newQuantity,
            });
        }
    };

    const handleRemoveItem = () => {
        navigate('/cart');
    };

    return (
        <div className="checkout-page">
            <AdminHeader />
            <main className="checkout-content">
                <div className="checkout-header">
                    <button className="back-button" onClick={handleBack}>
                        <img src={backIcon} alt="Назад" className="back-icon" />
                    </button>
                    <h2 className="checkout-header-title">Оформление заказа</h2>
                    <div className="progress-bar">
                        <div className="progress-bar-fill" style={{ width: `${progress}%` }}></div>
                    </div>
                </div>
                <div className="contact-section">
                    {step === 1 && (
                        <div className="contact-form-section">
                            <h3 className="contact-section-title">Как с вами связаться</h3>
                            <form className="checkout-contact-form">
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="ФИО"
                                        className="checkout-form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        placeholder="Телефон"
                                        className="checkout-form-input"
                                        required
                                    />
                                </div>
                                <div className="form-group form-group-toggle">
                                    <label className="toggle-label">
                                        <input type="checkbox" className="toggle-input" />
                                        <span className="toggle-switch"></span>
                                        Получит другой человек
                                    </label>
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        placeholder="Имя получателя"
                                        className="checkout-form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        placeholder="Телефон получателя"
                                        className="checkout-form-input"
                                    />
                                </div>
                            </form>
                        </div>
                    )}

                    {step === 2 && (
                        <>
                            <div className="delivery-method-toggle">
                                <button
                                    className={`toggle-button ${deliveryMethod === 'pickup' ? 'active' : ''}`}
                                    onClick={() => setDeliveryMethod('pickup')}
                                >
                                    Самовывоз
                                </button>
                                <button
                                    className={`toggle-button ${deliveryMethod === 'delivery' ? 'active' : ''}`}
                                    onClick={() => setDeliveryMethod('delivery')}
                                >
                                    Доставка
                                </button>
                            </div>

                            {deliveryMethod === 'pickup' ? (
                                <div className="pickup-section">
                                    <h3 className="contact-section-title">Адрес доставки</h3>
                                    <div className="address-options">
                                        <label className="address-option">
                                            <input
                                                type="radio"
                                                name="pickup-address"
                                                value="spb-moskovsky"
                                                defaultChecked
                                            />
                                            <span className="address-text">
                                                г.Санкт-Петербург, ул.Московский проспект, д.73
                                            </span>
                                        </label>
                                        <label className="address-option">
                                            <input
                                                type="radio"
                                                name="pickup-address"
                                                value="spb-lenina"
                                            />
                                            <span className="address-text">
                                                г.Санкт-Петербург, ул.Ленина, д.45
                                            </span>
                                        </label>
                                    </div>
                                    <div className="form-group">
                                        <textarea
                                            placeholder="Пожелания к заказу"
                                            className="checkout-form-textarea"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="delivery-section">
                                    <h3 className="contact-section-title">Адрес доставки</h3>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Город"
                                            className="checkout-form-input"
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <input
                                            type="text"
                                            placeholder="Улица"
                                            className="checkout-form-input"
                                            required
                                        />
                                    </div>
                                    <div className="address-details">
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Дом"
                                                className="checkout-form-input"
                                                required
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Корпус"
                                                className="checkout-form-input"
                                            />
                                        </div>
                                        <div className="form-group">
                                            <input
                                                type="text"
                                                placeholder="Квартира"
                                                className="checkout-form-input"
                                            />
                                        </div>
                                    </div>

                                    <h3 className="contact-section-title">Желаемое время доставки</h3>
                                    <div className="form-group date-input-wrapper">
                                        <input
                                            type="date"
                                            placeholder="Дата"
                                            className="checkout-form-input date-input"
                                            defaultValue="2025-02-06"
                                            required
                                        />
                                    </div>
                                    <div className="form-group time-select-wrapper">
                                        <select className="checkout-form-input time-select" required>
                                            <option value="11:00-13:00">Ближайшее: 11:00-13:00</option>
                                            <option value="13:00-15:00">Ближайшее: 13:00-15:00</option>
                                            <option value="15:00-17:00">Ближайшее: 15:00-17:00</option>
                                        </select>
                                    </div>

                                    <div className="form-group">
                                        <textarea
                                            placeholder="Пожелания к заказу"
                                            className="checkout-form-textarea"
                                        />
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    {step === 3 && (
                        <div className="confirmation-section">
                            <div className="confirmation-cart-item">
                                <div className="confirmation-cart-item-left">
                                    <img src={cartItem.image} alt={cartItem.name} className="confirmation-cart-item-image" />
                                </div>
                                <div className="confirmation-cart-item-details">
                                    <div className="confirmation-cart-item-text">
                                        <p className="confirmation-cart-item-total-price">{cartItem.total} ₽</p>
                                        <h3 className="confirmation-cart-item-title">{cartItem.name}</h3>
                                        <p className="confirmation-cart-item-price">{cartItem.price} ₽ / шт</p>
                                    </div>
                                    <div className="confirmation-cart-item-controls">
                                        <div className="confirmation-quantity-controls">
                                            <button
                                                className="confirmation-quantity-button confirmation-quantity-button-minus"
                                                onClick={() => handleQuantityChange(-1)}
                                                disabled={cartItem.quantity <= 1}
                                            >
                                                -
                                            </button>
                                            <span className="confirmation-quantity-value">{cartItem.quantity}</span>
                                            <button
                                                className="confirmation-quantity-button confirmation-quantity-button-plus"
                                                onClick={() => handleQuantityChange(1)}
                                            >
                                                +
                                            </button>
                                        </div>
                                        <button
                                            className="confirmation-remove-from-cart-button"
                                            onClick={handleRemoveItem}
                                            aria-label={`Удалить ${cartItem.name} из корзины`}
                                        >
                                            <img src={trashIcon} alt="Удалить" className="confirmation-remove-icon" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="confirmation-order-total">
                                <div className="confirmation-order-total-row">
                                    <h4>Товары:</h4>
                                    <p>{cartItem.total} ₽</p>
                                </div>
                                <div className="confirmation-order-total-row">
                                    <h4>Доставка:</h4>
                                    <p>—</p>
                                </div>
                                <div className="confirmation-order-total-row">
                                    <h4>Итоговая сумма заказа:</h4>
                                    <p>{cartItem.total} ₽</p>
                                </div>
                            </div>

                            <button
                                className="confirmation-pay-button confirmation-pay-with-sbp"
                                onClick={handlePayWithSBP}
                            >
                                Оплатить по СБП
                            </button>
                            <button
                                className="confirmation-pay-button confirmation-submit-without-payment"
                                onClick={handleSubmitWithoutPayment}
                            >
                                Оставить заявку без оплаты
                            </button>

                            <p className="confirmation-privacy-text">
                                Нажимая кнопку «Перейти к оплате» или «Оставить заявку»,
                                вы даете согласие на{' '}
                                <a href="/privacy-policy" className="confirmation-privacy-link">
                                    обработку персональных данных
                                </a>
                            </p>
                        </div>
                    )}

                    {step !== 3 && (
                        <button
                            type="submit"
                            className="continue-button"
                            onClick={handleContinue}
                        >
                            Продолжить
                        </button>
                    )}
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default CheckoutPage;