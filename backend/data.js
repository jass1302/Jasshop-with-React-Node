import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Jassiel',
            email: 'admin@jasshop.com',
            pass: bcrypt.hashSync('rootpass', 8),
            isAdmin: true,
        },
        {
            name: 'Ernesto',
            email: 'test@jasshop.com',
            pass: bcrypt.hashSync('rootpass', 8),
            isAdmin: false,
        },

    ],
    products: [
        {
            //_id: '1',
            name: 'Playera de Pikáchu',
            category: 'Shirts',
            image: '/images/p1.jpg',
            price: 149,
            brand: 'JassBrand',
            rating: 4.5,
            numReviews: 57,
            stock: 10,
            desc: 'Diseñada por el mismísimo Satoshi Tajiri',
        },
        {
            //_id: '2',
            name: 'Playera de Pichu',
            category: 'Shirts',
            image: '/images/p2.jpg',
            price: 99,
            brand: 'JassBrand',
            rating: 4.5,
            numReviews: 25,
            stock: 5,
            desc: 'Diseñada por el mismísimo Satoshi Tajiri'
        },
        {
            //_id: '3',
            name: 'Playera de Raichu',
            category: 'Shirts',
            image: '/images/p3.jpg',
            price: 99,
            brand: 'JassBrand',
            rating: 4.5,
            numReviews: 7,
            stock: 0,
            desc: 'Diseñada por el mismísimo Satoshi Tajiri'
        },
        {
            //_id: '4',
            name: 'Playera de Charizard',
            category: 'Shirts',
            image: '/images/p4.jpg',
            price: 399,
            brand: 'JassBrand',
            rating: 4.5,
            numReviews: 14,
            stock: 15,
            desc: 'Diseñada por el mismísimo Satoshi Tajiri'
        },
        {
            //_id: '5',
            name: 'Playera de Gengar',
            category: 'Shirts',
            image: '/images/p5.jpg',
            price: 190,
            brand: 'JassBrand',
            rating: 4.5,
            numReviews: 23,
            stock: 1,
            desc: 'Diseñada por el mismísimo Satoshi Tajiri'
        },
        {
            //_id: '6',
            name: 'Tazita de uWu',
            category: 'Mugs',
            image: '/images/p6.jpg',
            price: 100,
            brand: 'JassBrand',
            rating: 4.5,
            numReviews: 10,
            stock: 0,
            desc: 'Diseñada por el mismísimo Satoshi Tajiri'
        },
    ]
};

export default data;