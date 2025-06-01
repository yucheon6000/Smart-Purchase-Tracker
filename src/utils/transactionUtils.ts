import { Transaction } from '../mocks/transactions';

// 트랜잭션 배열을 날짜별로 그룹화
export function groupTransactionsByDate(transactions: Transaction[]) {
    return transactions.reduce((groups, transaction) => {
        const dateKey = transaction.date.toISOString().split('T')[0];
        if (!groups[dateKey]) groups[dateKey] = [];
        groups[dateKey].push(transaction);
        return groups;
    }, {} as Record<string, Transaction[]>);
}

// 그룹화된 트랜잭션의 날짜 key를 내림차순(최신순) 정렬
export function getSortedDateKeys(grouped: Record<string, Transaction[]>) {
    return Object.keys(grouped).sort((a, b) => b.localeCompare(a));
}

// 트랜잭션 배열에 등장하는 모든 연도를 내림차순 정렬
export function getAllYears(transactions: Transaction[]) {
    const years = transactions.length > 0 ? transactions.map(t => t.date.getFullYear()) : [];
    const minYear = years.length > 0 ? Math.min(...years) : new Date().getFullYear();
    const maxYear = Math.max(new Date().getFullYear(), ...(years.length > 0 ? years : [new Date().getFullYear()]));
    const arr = [];
    for (let y = maxYear; y >= minYear; y--) arr.push(y);
    return arr;
}
