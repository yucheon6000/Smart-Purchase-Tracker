export interface Category {
    id: number;
    name: string;
    fullName: string;
    color: string;
}

export const categories: Category[] = [
    {
        id: 0,
        name: "문화취미",
        fullName: "여가문화/문화취미",
        color: "#FF6B6B"
    },
    {
        id: 1,
        name: "숙박",
        fullName: "여가문화/숙박",
        color: "#FF6B6B"
    },
    {
        id: 2,
        name: "식사",
        fullName: "식비/식사",
        color: "#ff982b"
    },
    {
        id: 3,
        name: "식료품",
        fullName: "식비/식료품",
        color: "#ff982b"
    },
    {
        id: 4,
        name: "카페",
        fullName: "식비/카페",
        color: "#ff982b"
    },
    {
        id: 6,
        name: "패션잡화",
        fullName: "쇼핑/패션잡화",
        color: "#1bbee4"
    },
    {
        id: 7,
        name: "생활용품",
        fullName: "쇼핑/생활용품",
        color: "#1bbee4"
    },
    {
        id: 8,
        name: "문구사무",
        fullName: "쇼핑/문구사무",
        color: "#1bbee4"
    },
    {
        id: 5,
        name: "쇼핑/기타",
        fullName: "쇼핑/기타",
        color: "#1bbee4"
    },
    {
        id: 9,
        name: "도서",
        fullName: "교육학업/도서",
        color: "#55b589"
    },
    {
        id: 10,
        name: "학원",
        fullName: "교육학업/학원",
        color: "#55b589"
    },
    {
        id: 11,
        name: "약국",
        fullName: "의료건강/약국",
        color: "#ffc826"
    },
    {
        id: 12,
        name: "병원",
        fullName: "의료건강/병원",
        color: "#ffc826"
    },
    {
        id: 13,
        name: "건강기능",
        fullName: "의료건강/건강기능제품",
        color: "#ffc826"
    },
    {
        id: 14,
        name: "편의점",
        fullName: "기타/편의점",
        color: "#D4A5A5"
    },
]