function minimumCardPickup(cards: number[]): number {
    const lastSeen = new Map<number, number>();
    let minDistance = Infinity;
    
    for (let i = 0; i < cards.length; i++) {
        if (lastSeen.has(cards[i])) {
            minDistance = Math.min(minDistance, i - lastSeen.get(cards[i])! + 1);
        }
        lastSeen.set(cards[i], i);
    }
    
    return minDistance === Infinity ? -1 : minDistance;
} 