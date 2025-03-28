import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NotFoundPage.css';
import AdminHeader from '../components/admin/AdminHeader';
import Footer from '../components/footer/Footer';
import NotFoundIcon from '../assets/404.svg';

const NotFoundPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="not-found-page">
            <AdminHeader />
            <div className="not-found-content">
                <img src={NotFoundIcon} alt="404 Icon" className="not-found-icon" />
                <h1 className="not-found-title">Магазин не работает</h1>
                <p className="not-found-text">
                    Онлайн-витрина временно отключена или больше не используется
                </p>
                <Link to="/" className="back-to-home-button">
                    Вернуться на главную
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default NotFoundPage;