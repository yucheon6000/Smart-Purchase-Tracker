export interface Category {
    id: number;
    name: string;
    fullName: string;
    color: string;
}

export const categories: Category[] = [
    {
        id: 0,
        name: "문화",
        fullName: "여가문화/문화생활",
        color: "#FF6B6B"
    },
    {
        id: 1,
        name: "취미",
        fullName: "여가문화/취미",
        color: "#FF6B6B"
    },
    {
        id: 2,
        name: "숙박",
        fullName: "여가문화/숙박",
        color: "#FF6B6B"
    },
    {
        id: 3,
        name: "식사",
        fullName: "식비/식사",
        color: "#4ECDC4"
    },
    {
        id: 4,
        name: "식료품",
        fullName: "식비/식료품",
        color: "#4ECDC4"
    },
    {
        id: 5,
        name: "카페",
        fullName: "식비/카페",
        color: "#4ECDC4"
    },
    {
        id: 6,
        name: "가전",
        fullName: "쇼핑/가전",
        color: "#45B7D1"
    },
    {
        id: 7,
        name: "기타",
        fullName: "쇼핑/기타",
        color: "#45B7D1"
    },
    {
        id: 8,
        name: "패션",
        fullName: "쇼핑/패션잡화",
        color: "#45B7D1"
    },
    {
        id: 9,
        name: "생활",
        fullName: "쇼핑/생활용품",
        color: "#45B7D1"
    },
    {
        id: 10,
        name: "문구",
        fullName: "쇼핑/문구사무",
        color: "#45B7D1"
    },
    {
        id: 11,
        name: "도서",
        fullName: "교육학업/도서",
        color: "#96CEB4"
    },
    {
        id: 12,
        name: "학원",
        fullName: "교육학업/학원",
        color: "#96CEB4"
    },
    {
        id: 13,
        name: "약국",
        fullName: "의료건강/약국",
        color: "#FFEEAD"
    },
    {
        id: 14,
        name: "병원",
        fullName: "의료건강/병원",
        color: "#FFEEAD"
    },
    {
        id: 15,
        name: "건강",
        fullName: "의료건강/건강기능제품",
        color: "#FFEEAD"
    },
    {
        id: 16,
        name: "편의점",
        fullName: "기타/편의점",
        color: "#D4A5A5"
    },
    {
        id: -1,
        name: "기타",
        fullName: "기타",
        color: "#D4A5A5"
    }
]
