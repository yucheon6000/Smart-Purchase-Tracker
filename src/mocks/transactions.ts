export interface PurchaseItem {
    id: string;
    name: string;
    quantity: number;
    unitPrice: number;
    totalPrice: number;
    categoryId?: number; // 오타 수정 및 명확화
}

export interface Transaction {
    id: string;
    date: Date;
    time: string;
    description: string;
    amount: number;
    categoryId: number;
    type: 'income' | 'expense';
    items?: PurchaseItem[];
}

export const transactions: Transaction[] = [
    {
        id: '1',
        date: new Date('2025-04-20'),
        time: '09:00',
        description: '월급',
        amount: 3000000,
        categoryId: 1,
        type: 'income'
    },
    {
        id: '2',
        date: new Date('2025-04-21'),
        time: '12:30',
        description: '점심식사',
        amount: 12000,
        categoryId: 2,
        type: 'expense'
    },
    {
        id: '3',
        date: new Date('2025-04-21'),
        time: '13:15',
        description: '교통비',
        amount: 1500,
        categoryId: 3,
        type: 'expense'
    },
    {
        id: '4',
        date: new Date('2025-04-22'),
        time: '10:30',
        description: '커피',
        amount: 4500,
        categoryId: 4,
        type: 'expense'
    },
    {
        id: '5',
        date: new Date('2025-04-22'),
        time: '11:00',
        description: '저축',
        amount: 500000,
        categoryId: 5,
        type: 'expense'
    },
    {
        id: '6',
        date: new Date('2025-04-23'),
        time: '15:30',
        description: '다이소',
        amount: 15000,
        categoryId: 6,
        type: 'expense',
        items: [
            {
                id: 'item1',
                name: '주방세제',
                quantity: 1,
                unitPrice: 2000,
                totalPrice: 2000,
                categoryId: 4 // 다이소(오락)로 지정
            },
            {
                id: 'item2',
                name: '휴지',
                quantity: 2,
                unitPrice: 3000,
                totalPrice: 6000,
                categoryId: 6
            },
            {
                id: 'item3',
                name: '쓰레기봉투',
                quantity: 1,
                unitPrice: 4000,
                totalPrice: 4000,
                categoryId: 6
            },
            {
                id: 'item4',
                name: '세탁망',
                quantity: 1,
                unitPrice: 3000,
                totalPrice: 3000,
                categoryId: 6
            }
        ]
    },
    {
        id: "7",
        date: new Date("2025-04-20"),
        time: "11:00",
        description: "이마트",
        amount: 35000,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "8",
        date: new Date("2025-04-19"),
        time: "12:00",
        description: "버거킹",
        amount: 9800,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "9",
        date: new Date("2025-04-19"),
        time: "13:00",
        description: "GS25",
        amount: 4500,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "10",
        date: new Date("2025-04-19"),
        time: "14:00",
        description: "CGV",
        amount: 15000,
        categoryId: 6,
        type: "expense"
    },
    {
        id: "11",
        date: new Date("2025-04-18"),
        time: "10:00",
        description: "교보문고",
        amount: 22000,
        categoryId: 7,
        type: "expense"
    },
    {
        id: "12",
        date: new Date("2025-04-18"),
        time: "11:00",
        description: "올리브영",
        amount: 28000,
        categoryId: 8,
        type: "expense"
    },
    {
        id: "13",
        date: new Date("2025-04-18"),
        time: "12:00",
        description: "CU",
        amount: 3200,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "14",
        date: new Date("2025-04-17"),
        time: "10:00",
        description: "투썸플레이스",
        amount: 7000,
        categoryId: 4,
        type: "expense"
    },
    {
        id: "15",
        date: new Date("2025-04-17"),
        time: "11:00",
        description: "롯데마트",
        amount: 67000,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "16",
        date: new Date("2025-04-17"),
        time: "12:00",
        description: "맥도날드",
        amount: 8900,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "17",
        date: new Date("2025-04-16"),
        time: "10:00",
        description: "유니클로",
        amount: 49000,
        categoryId: 8,
        type: "expense"
    },
    {
        id: "18",
        date: new Date("2025-04-16"),
        time: "11:00",
        description: "다이소",
        amount: 12000,
        categoryId: 9,
        type: "expense"
    },
    {
        id: "19",
        date: new Date("2025-04-16"),
        time: "12:00",
        description: "스타벅스",
        amount: 5100,
        categoryId: 4,
        type: "expense"
    },
    {
        id: "20",
        date: new Date("2025-04-15"),
        time: "10:00",
        description: "이디야커피",
        amount: 4500,
        categoryId: 4,
        type: "expense"
    },
    {
        id: "21",
        date: new Date("2025-04-15"),
        time: "11:00",
        description: "홈플러스",
        amount: 45000,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "22",
        date: new Date("2025-04-15"),
        time: "12:00",
        description: "GS25",
        amount: 6300,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "23",
        date: new Date("2025-04-14"),
        time: "10:00",
        description: "메가커피",
        amount: 3000,
        categoryId: 4,
        type: "expense"
    },
    {
        id: "24",
        date: new Date("2025-04-14"),
        time: "11:00",
        description: "CU",
        amount: 8400,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "25",
        date: new Date("2025-04-14"),
        time: "12:00",
        description: "버거킹",
        amount: 10200,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "26",
        date: new Date("2025-04-13"),
        time: "10:00",
        description: "스타벅스",
        amount: 6800,
        categoryId: 4,
        type: "expense"
    },
    {
        id: "27",
        date: new Date("2025-04-13"),
        time: "11:00",
        description: "이마트",
        amount: 28000,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "28",
        date: new Date("2025-04-13"),
        time: "12:00",
        description: "CGV",
        amount: 15000,
        categoryId: 6,
        type: "expense"
    },
    {
        id: "29",
        date: new Date("2025-04-12"),
        time: "10:00",
        description: "올리브영",
        amount: 32000,
        categoryId: 8,
        type: "expense"
    },
    {
        id: "30",
        date: new Date("2025-04-12"),
        time: "11:00",
        description: "GS25",
        amount: 5600,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "31",
        date: new Date("2025-04-12"),
        time: "12:00",
        description: "투썸플레이스",
        amount: 6500,
        categoryId: 4,
        type: "expense"
    },
    {
        id: "32",
        date: new Date("2025-04-11"),
        time: "10:00",
        description: "맥도날드",
        amount: 9800,
        categoryId: 2,
        type: "expense"
    },
    {
        id: "33",
        date: new Date("2025-04-11"),
        time: "11:00",
        description: "다이소",
        amount: 15000,
        categoryId: 9,
        type: "expense"
    },
    {
        id: "34",
        date: new Date("2025-04-11"),
        time: "12:00",
        description: "스타벅스",
        amount: 7200,
        categoryId: 4,
        type: "expense"
    },
    {
        id: "35",
        date: new Date("2025-04-10"),
        time: "10:00",
        description: "이마트",
        amount: 42000,
        categoryId: 2,
        type: "expense"
    }
];