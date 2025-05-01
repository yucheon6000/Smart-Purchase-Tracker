// 거래 내역 그룹화/정렬 등 유틸 함수 모음
import { Transaction } from '../mocks/transactions';

// 트랜잭션 배열을 날짜별로 그룹화합니다. (YYYY-MM-DD 형식의 key)
export function groupTransactionsByDate(transactions: Transaction[]) {
    return transactions.reduce((groups, transaction) => {
        const dateKey = transaction.date.toISOString().split('T')[0];
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(transaction);
        return groups;
    }, {} as Record<string, Transaction[]>);
}

// 그룹화된 트랜잭션의 날짜 key를 내림차순(최신순)으로 정렬하여 반환합니다.
export function getSortedDateKeys(grouped: Record<string, Transaction[]>) {
    return Object.keys(grouped).sort((a, b) => b.localeCompare(a));
}

// 트랜잭션 배열에서 등장하는 모든 연도를 내림차순 배열로 반환합니다.
export function getAllYears(transactions: Transaction[]) {
    const years = transactions.length > 0 ? transactions.map(t => t.date.getFullYear()) : [];
    const minYear = years.length > 0 ? Math.min(...years) : new Date().getFullYear();
    const maxYear = Math.max(new Date().getFullYear(), ...(years.length > 0 ? years : [new Date().getFullYear()]));
    const arr = [];
    for (let y = maxYear; y >= minYear; y--) arr.push(y);
    return arr;
}
