export interface PurchaseItem {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    categoryId?: number;
}

export interface Transaction {
    id: string;
    date: Date;
    time: string;
    description: string;
    amount: number;
    type: 'income' | 'expense';
    items?: PurchaseItem[];
}

export const transactions: Transaction[] = [
    {
        id: '1',
        date: new Date('2025-05-20'),
        time: '09:00',
        description: '월급',
        amount: 3000000,
        type: 'income'
    },
    {
        id: '2',
        date: new Date('2025-05-21'),
        time: '12:30',
        description: '점심식사',
        amount: 12000,
        type: 'expense',
        items: [
            {
                id: 'item1',
                name: '비빔밥',
                quantity: 1,
                unitPrice: 12000,
                totalPrice: 12000,
                categoryId: 2
            }
        ]
    },
    {
        id: '3',
        date: new Date('2025-05-21'),
        time: '13:15',
        description: '교통비',
        amount: 1500,
        type: 'expense'
    },
    {
        id: '4',
        date: new Date('2025-05-22'),
        time: '10:30',
        description: '스타벅스',
        amount: 4500,
        type: 'expense',
        items: [
            {
                id: 'item1',
                name: '아메리카노',
                quantity: 1,
                unitPrice: 4500,
                totalPrice: 4500,
                categoryId: 4
            }
        ]
    },
    {
        id: '6',
        date: new Date('2025-05-23'),
        time: '15:30',
        description: '다이소',
        amount: 15000,
        type: 'expense',
        items: [
            {
                id: 'item1',
                name: '주방세제',
                quantity: 1,
                unitPrice: 2000,
                totalPrice: 2000,
                categoryId: 7
            },
            {
                id: 'item2',
                name: '휴지',
                quantity: 2,
                unitPrice: 3000,
                totalPrice: 6000,
                categoryId: 7
            },
            {
                id: 'item3',
                name: '쓰레기봉투',
                quantity: 1,
                unitPrice: 4000,
                totalPrice: 4000,
                categoryId: 7
            },
            {
                id: 'item4',
                name: '세탁망',
                quantity: 1,
                unitPrice: 3000,
                totalPrice: 3000,
                categoryId: 7
            }
        ]
    },
    {
        id: "7",
        date: new Date("2025-05-20"),
        time: "11:00",
        description: "이마트",
        amount: 35000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '우유',
                quantity: 2,
                unitPrice: 3000,
                totalPrice: 6000,
                categoryId: 3
            },
            {
                id: 'item2',
                name: '계란',
                quantity: 1,
                unitPrice: 8000,
                totalPrice: 8000,
                categoryId: 3
            },
            {
                id: 'item3',
                name: '과일',
                quantity: 1,
                unitPrice: 21000,
                totalPrice: 21000,
                categoryId: 3
            }
        ]
    },
    {
        id: "8",
        date: new Date("2025-05-19"),
        time: "12:00",
        description: "버거킹",
        amount: 9800,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '와퍼세트',
                quantity: 1,
                unitPrice: 9800,
                totalPrice: 9800,
                categoryId: 2
            }
        ]
    },
    {
        id: "9",
        date: new Date("2025-05-19"),
        time: "13:00",
        description: "GS25",
        amount: 4500,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '삼각김밥',
                quantity: 1,
                unitPrice: 2500,
                totalPrice: 2500,
                categoryId: 14
            },
            {
                id: 'item2',
                name: '음료수',
                quantity: 1,
                unitPrice: 2000,
                totalPrice: 2000,
                categoryId: 14
            }
        ]
    },
    {
        id: "10",
        date: new Date("2025-05-19"),
        time: "14:00",
        description: "CGV",
        amount: 15000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '영화티켓',
                quantity: 1,
                unitPrice: 15000,
                totalPrice: 15000,
                categoryId: 0
            }
        ]
    },
    {
        id: "11",
        date: new Date("2025-05-18"),
        time: "10:00",
        description: "교보문고",
        amount: 22000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '자기계발서',
                quantity: 1,
                unitPrice: 15000,
                totalPrice: 15000,
                categoryId: 9
            },
            {
                id: 'item2',
                name: '노트',
                quantity: 2,
                unitPrice: 3500,
                totalPrice: 7000,
                categoryId: 8
            }
        ]
    },
    {
        id: "12",
        date: new Date("2025-05-18"),
        time: "11:00",
        description: "올리브영",
        amount: 28000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '화장품',
                quantity: 1,
                unitPrice: 28000,
                totalPrice: 28000,
                categoryId: 7
            }
        ]
    },
    {
        id: "13",
        date: new Date("2025-05-18"),
        time: "12:00",
        description: "CU",
        amount: 3200,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '아이스크림',
                quantity: 1,
                unitPrice: 3200,
                totalPrice: 3200,
                categoryId: 14
            }
        ]
    },
    {
        id: "14",
        date: new Date("2025-05-17"),
        time: "10:00",
        description: "투썸플레이스",
        amount: 7000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '카페라떼',
                quantity: 1,
                unitPrice: 7000,
                totalPrice: 7000,
                categoryId: 4
            }
        ]
    },
    {
        id: "15",
        date: new Date("2025-05-17"),
        time: "11:00",
        description: "롯데마트",
        amount: 67000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '생필품',
                quantity: 1,
                unitPrice: 25000,
                totalPrice: 25000,
                categoryId: 7
            },
            {
                id: 'item2',
                name: '식료품',
                quantity: 1,
                unitPrice: 42000,
                totalPrice: 42000,
                categoryId: 3
            }
        ]
    },
    {
        id: "16",
        date: new Date("2025-05-17"),
        time: "12:00",
        description: "맥도날드",
        amount: 8900,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '빅맥세트',
                quantity: 1,
                unitPrice: 8900,
                totalPrice: 8900,
                categoryId: 2
            }
        ]
    },
    {
        id: "17",
        date: new Date("2025-05-16"),
        time: "10:00",
        description: "유니클로",
        amount: 49000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '티셔츠',
                quantity: 2,
                unitPrice: 15000,
                totalPrice: 30000,
                categoryId: 6
            },
            {
                id: 'item2',
                name: '양말',
                quantity: 3,
                unitPrice: 5000,
                totalPrice: 15000,
                categoryId: 6
            },
            {
                id: 'item3',
                name: '속옷',
                quantity: 1,
                unitPrice: 4000,
                totalPrice: 4000,
                categoryId: 6
            }
        ]
    },
    {
        id: "18",
        date: new Date("2025-05-16"),
        time: "11:00",
        description: "다이소",
        amount: 12000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '화장지',
                quantity: 2,
                unitPrice: 3000,
                totalPrice: 6000,
                categoryId: 7
            },
            {
                id: 'item2',
                name: '칫솔',
                quantity: 2,
                unitPrice: 3000,
                totalPrice: 6000,
                categoryId: 7
            }
        ]
    },
    {
        id: "19",
        date: new Date("2025-05-16"),
        time: "12:00",
        description: "스타벅스",
        amount: 5100,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '아메리카노',
                quantity: 1,
                unitPrice: 5100,
                totalPrice: 5100,
                categoryId: 4
            }
        ]
    },
    {
        id: "20",
        date: new Date("2025-05-15"),
        time: "10:00",
        description: "이디야커피",
        amount: 4500,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '카페라떼',
                quantity: 1,
                unitPrice: 4500,
                totalPrice: 4500,
                categoryId: 4
            }
        ]
    },
    {
        id: "21",
        date: new Date("2025-05-15"),
        time: "11:00",
        description: "홈플러스",
        amount: 45000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '식료품',
                quantity: 1,
                unitPrice: 30000,
                totalPrice: 30000,
                categoryId: 3
            },
            {
                id: 'item2',
                name: '생필품',
                quantity: 1,
                unitPrice: 15000,
                totalPrice: 15000,
                categoryId: 7
            }
        ]
    },
    {
        id: "22",
        date: new Date("2025-05-15"),
        time: "12:00",
        description: "GS25",
        amount: 6300,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '도시락',
                quantity: 1,
                unitPrice: 4500,
                totalPrice: 4500,
                categoryId: 14
            },
            {
                id: 'item2',
                name: '음료수',
                quantity: 1,
                unitPrice: 1800,
                totalPrice: 1800,
                categoryId: 14
            }
        ]
    },
    {
        id: "23",
        date: new Date("2025-05-14"),
        time: "10:00",
        description: "메가커피",
        amount: 3000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '아메리카노',
                quantity: 1,
                unitPrice: 3000,
                totalPrice: 3000,
                categoryId: 4
            }
        ]
    },
    {
        id: "24",
        date: new Date("2025-05-14"),
        time: "11:00",
        description: "CU",
        amount: 8400,
        type: "expense",
        items: [
        ]
    },
    {
        id: "25",
        date: new Date("2025-05-14"),
        time: "12:00",
        description: "버거킹",
        amount: 10200,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '와퍼세트',
                quantity: 1,
                unitPrice: 10200,
                totalPrice: 10200,
                categoryId: 2
            }
        ]
    },
    {
        id: "26",
        date: new Date("2025-05-13"),
        time: "10:00",
        description: "스타벅스",
        amount: 6800,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '카페라떼',
                quantity: 1,
                unitPrice: 6800,
                totalPrice: 6800,
                categoryId: 4
            }
        ]
    },
    {
        id: "27",
        date: new Date("2025-05-13"),
        time: "11:00",
        description: "이마트",
        amount: 28000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '식료품',
                quantity: 1,
                unitPrice: 28000,
                totalPrice: 28000,
                categoryId: 3
            }
        ]
    },
    {
        id: "28",
        date: new Date("2025-05-13"),
        time: "12:00",
        description: "CGV",
        amount: 15000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '영화티켓',
                quantity: 1,
                unitPrice: 15000,
                totalPrice: 15000,
                categoryId: 0
            }
        ]
    },
    {
        id: "29",
        date: new Date("2025-05-12"),
        time: "10:00",
        description: "올리브영",
        amount: 32000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '화장품',
                quantity: 1,
                unitPrice: 32000,
                totalPrice: 32000,
                categoryId: 7
            }
        ]
    },
    {
        id: "30",
        date: new Date("2025-05-12"),
        time: "11:00",
        description: "GS25",
        amount: 5600,
        type: "expense",
        items: [

        ]
    },
    {
        id: "31",
        date: new Date("2025-05-12"),
        time: "12:00",
        description: "투썸플레이스",
        amount: 6500,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '아메리카노',
                quantity: 1,
                unitPrice: 6500,
                totalPrice: 6500,
                categoryId: 4
            }
        ]
    },
    {
        id: "32",
        date: new Date("2025-05-11"),
        time: "10:00",
        description: "맥도날드",
        amount: 9800,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '빅맥세트',
                quantity: 1,
                unitPrice: 9800,
                totalPrice: 9800,
                categoryId: 2
            }
        ]
    },
    {
        id: "33",
        date: new Date("2025-05-11"),
        time: "11:00",
        description: "다이소",
        amount: 15000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '생활용품',
                quantity: 1,
                unitPrice: 15000,
                totalPrice: 15000,
                categoryId: 7
            }
        ]
    },
    {
        id: "34",
        date: new Date("2025-05-11"),
        time: "12:00",
        description: "스타벅스",
        amount: 7200,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '카페라떼',
                quantity: 1,
                unitPrice: 7200,
                totalPrice: 7200,
                categoryId: 4
            }
        ]
    },
    {
        id: "35",
        date: new Date("2025-05-10"),
        time: "10:00",
        description: "이마트",
        amount: 42000,
        type: "expense",
        items: [
            {
                id: 'item1',
                name: '식료품',
                quantity: 1,
                unitPrice: 42000,
                totalPrice: 42000,
                categoryId: 3
            }
        ]
    }
];