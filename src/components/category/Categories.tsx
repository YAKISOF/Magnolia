import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../../data/categories';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Swiper as SwiperCore } from 'swiper';
import 'swiper/css';
import 'swiper/css/scrollbar';
import './Categories.css';

interface CategoriesProps {
    activeCategory?: number;
    setActiveCategory: (id: number) => void;
}

const Categories: React.FC<CategoriesProps> = ({ activeCategory, setActiveCategory }) => {
    const swiperRef = useRef<SwiperCore | null>(null);

    useEffect(() => {
        const swiper = swiperRef.current;
        if (swiper) {
            // Настройки для свободной прокрутки
            swiper.params.scrollbar = {
                draggable: true,
                snapOnRelease: false, // Отключаем привязку при отпускании
                dragSize: 100,
                hide: false
            };
            swiper.scrollbar?.init();
            swiper.scrollbar?.updateSize();

            // Разрешаем свободную прокрутку
            swiper.params.freeMode = {
                enabled: true,
                momentum: true,
                momentumRatio: 1,
                momentumBounce: true,
                momentumBounceRatio: 1
            };
            swiper.update();
        }
    }, []);

    return (
        <div className="categories-container">
            <Swiper
                slidesPerView="auto"
                spaceBetween={20}
                initialSlide={0}
                freeMode={{
                    enabled: true,
                    momentum: true,
                    sticky: false
                }}
                scrollbar={{
                    draggable: true,
                    snapOnRelease: false,
                    dragSize: 100,
                    hide: false
                }}
                onSwiper={(swiper: SwiperCore) => {
                    swiperRef.current = swiper;
                    // Добавляем пространство для свободной прокрутки
                    swiper.wrapperEl.style.padding = '0 40px';
                    swiper.wrapperEl.style.margin = '0 -40px';
                }}
                className="categories-swiper"
            >
                {categories.map((cat) => (
                    <SwiperSlide key={cat.id} className="category-slide">
                        <Link
                            to={`/category/${cat.id}`}
                            className={`category-tab ${activeCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(cat.id)}
                        >
                            <div className="category-image-container">
                                <img
                                    src={cat.image}
                                    alt={cat.name}
                                    className="category-image"
                                    loading="lazy"
                                />
                            </div>
                            <span className={`category-text ${cat.name.split(' ').length === 2 ? 'two-words' : ''}`}>
                {cat.name}
              </span>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Categories;