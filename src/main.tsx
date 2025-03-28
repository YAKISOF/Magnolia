import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/global.css";
import "./index.css";
import App from './App';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Находим корневой элемент
const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error('Failed to find the root element');
}

// Создаём корневой элемент один раз
const root = createRoot(rootElement);

try {
    root.render(
        <StrictMode>
            <App />
        </StrictMode>
    );
} catch (error) {
    console.error('Failed to render the application:', error);
    rootElement.innerHTML = '<div style="padding: 20px; text-align: center;">Произошла ошибка при загрузке приложения. Пожалуйста, обновите страницу.</div>';
}
