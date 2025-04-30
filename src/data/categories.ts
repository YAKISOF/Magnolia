export interface Category {
    id: number;
    name: string;
    image: string; // URL или путь к изображению
}

export const categories = [
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